import { pool } from '../db';

export class AdminService {
  async getDashboardOverview() {
    const [userStats, convStats, msgStats, errorStats] = await Promise.all([
      pool.query('SELECT * FROM v_user_stats'),
      pool.query('SELECT * FROM v_conversation_stats'),
      pool.query('SELECT * FROM v_message_stats'),
      pool.query('SELECT * FROM v_error_stats'),
    ]);

    return {
      users: {
        total: Number(userStats.rows[0]?.total_users || 0),
        today: Number(userStats.rows[0]?.users_today || 0),
        thisWeek: Number(userStats.rows[0]?.users_this_week || 0),
        thisMonth: Number(userStats.rows[0]?.users_this_month || 0),
      },
      conversations: {
        total: Number(convStats.rows[0]?.total_conversations || 0),
        today: Number(convStats.rows[0]?.conversations_today || 0),
        thisWeek: Number(convStats.rows[0]?.conversations_this_week || 0),
        thisMonth: Number(convStats.rows[0]?.conversations_this_month || 0),
      },
      messages: {
        total: Number(msgStats.rows[0]?.total_messages || 0),
        today: Number(msgStats.rows[0]?.messages_today || 0),
        thisWeek: Number(msgStats.rows[0]?.messages_this_week || 0),
        totalCost: Number(msgStats.rows[0]?.total_cost || 0),
        costToday: Number(msgStats.rows[0]?.cost_today || 0),
        costThisWeek: Number(msgStats.rows[0]?.cost_this_week || 0),
        avgResponseTime: Number(msgStats.rows[0]?.avg_response_time_ms || 0),
      },
      errors: {
        total: Number(errorStats.rows[0]?.total_errors || 0),
        today: Number(errorStats.rows[0]?.errors_today || 0),
        unresolved: Number(errorStats.rows[0]?.unresolved_errors || 0),
        criticalUnresolved: Number(errorStats.rows[0]?.critical_unresolved || 0),
      },
    };
  }

  async getChartData(period: '7d' | '30d' | '90d' = '30d') {
    const days = period === '7d' ? 7 : period === '30d' ? 30 : 90;
    
    const [hourly, daily] = await Promise.all([
      pool.query('SELECT * FROM v_hourly_activity'),
      pool.query(`
        SELECT 
          date_trunc('day', created_at)::date as day,
          COUNT(*) FILTER (WHERE role = 'user') as user_messages,
          COUNT(*) FILTER (WHERE role = 'assistant') as assistant_messages,
          COUNT(DISTINCT conversation_id) as conversations,
          COALESCE(SUM(cost_usd), 0) as cost
        FROM messages
        WHERE created_at >= NOW() - INTERVAL '${days} days'
        GROUP BY date_trunc('day', created_at)::date
        ORDER BY day
      `),
    ]);

    return {
      hourly: hourly.rows.map(r => ({
        hour: r.hour,
        userMessages: Number(r.user_messages),
        assistantMessages: Number(r.assistant_messages),
        cost: Number(r.cost),
      })),
      daily: daily.rows.map(r => ({
        day: r.day,
        userMessages: Number(r.user_messages),
        assistantMessages: Number(r.assistant_messages),
        conversations: Number(r.conversations),
        cost: Number(r.cost),
      })),
    };
  }

  async getUsers(options: { limit?: number; offset?: number; search?: string; sort?: string; order?: 'asc' | 'desc' }) {
    const { limit = 50, offset = 0, search = '', sort = 'created_at', order = 'desc' } = options;
    
    const validSorts = ['created_at', 'email', 'name', 'message_count', 'total_cost', 'last_active'];
    const sortColumn = validSorts.includes(sort) ? sort : 'user_created_at';
    const sortOrder = order === 'asc' ? 'ASC' : 'DESC';

    let whereClause = '';
    const params: any[] = [];
    
    if (search) {
      whereClause = `WHERE u.email ILIKE $1 OR u.name ILIKE $1`;
      params.push(`%${search}%`);
    }

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM users u ${whereClause}`,
      params
    );

    const result = await pool.query(`
      SELECT 
        u.id,
        u.email,
        u.name,
        u.avatar_url,
        u.created_at,
        p.province,
        COUNT(DISTINCT c.id) as conversation_count,
        COUNT(m.id) as message_count,
        COALESCE(SUM(m.cost_usd), 0) as total_cost,
        MAX(m.created_at) as last_active
      FROM users u
      LEFT JOIN user_profiles p ON p.user_id = u.id
      LEFT JOIN conversations c ON c.user_id = u.id
      LEFT JOIN messages m ON m.conversation_id = c.id
      ${whereClause}
      GROUP BY u.id, u.email, u.name, u.avatar_url, u.created_at, p.province
      ORDER BY ${sortColumn === 'created_at' ? 'u.created_at' : sortColumn} ${sortOrder}
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `, [...params, limit, offset]);

    return {
      users: result.rows.map(r => ({
        id: r.id,
        email: r.email,
        name: r.name,
        avatarUrl: r.avatar_url,
        createdAt: r.created_at,
        province: r.province,
        conversationCount: Number(r.conversation_count),
        messageCount: Number(r.message_count),
        totalCost: Number(r.total_cost),
        lastActive: r.last_active,
      })),
      total: Number(countResult.rows[0].count),
      limit,
      offset,
    };
  }

  async getUserDetail(userId: string) {
    const [userResult, profileResult, statsResult, conversationsResult] = await Promise.all([
      pool.query('SELECT * FROM users WHERE id = $1', [userId]),
      pool.query('SELECT * FROM user_profiles WHERE user_id = $1', [userId]),
      pool.query(`
        SELECT 
          COUNT(DISTINCT c.id) as conversation_count,
          COUNT(m.id) as message_count,
          COALESCE(SUM(m.cost_usd), 0) as total_cost,
          COALESCE(SUM(m.input_tokens), 0) as total_input_tokens,
          COALESCE(SUM(m.output_tokens), 0) as total_output_tokens,
          MIN(m.created_at) as first_message,
          MAX(m.created_at) as last_message
        FROM conversations c
        LEFT JOIN messages m ON m.conversation_id = c.id
        WHERE c.user_id = $1
      `, [userId]),
      pool.query(`
        SELECT 
          c.id,
          c.title,
          c.created_at,
          c.updated_at,
          COUNT(m.id) as message_count,
          COALESCE(SUM(m.cost_usd), 0) as total_cost
        FROM conversations c
        LEFT JOIN messages m ON m.conversation_id = c.id
        WHERE c.user_id = $1
        GROUP BY c.id
        ORDER BY c.updated_at DESC
        LIMIT 20
      `, [userId]),
    ]);

    if (userResult.rows.length === 0) {
      return null;
    }

    const user = userResult.rows[0];
    const profile = profileResult.rows[0] || null;
    const stats = statsResult.rows[0];

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatar_url,
        createdAt: user.created_at,
      },
      profile,
      stats: {
        conversationCount: Number(stats.conversation_count),
        messageCount: Number(stats.message_count),
        totalCost: Number(stats.total_cost),
        totalInputTokens: Number(stats.total_input_tokens),
        totalOutputTokens: Number(stats.total_output_tokens),
        firstMessage: stats.first_message,
        lastMessage: stats.last_message,
      },
      conversations: conversationsResult.rows.map(c => ({
        id: c.id,
        title: c.title,
        createdAt: c.created_at,
        updatedAt: c.updated_at,
        messageCount: Number(c.message_count),
        totalCost: Number(c.total_cost),
      })),
    };
  }

  async deleteUser(userId: string) {
    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
  }

  async getConversations(options: { limit?: number; offset?: number; userId?: string; search?: string }) {
    const { limit = 50, offset = 0, userId, search } = options;
    
    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (userId) {
      conditions.push(`c.user_id = $${paramIndex++}`);
      params.push(userId);
    }
    if (search) {
      conditions.push(`(c.title ILIKE $${paramIndex} OR u.email ILIKE $${paramIndex})`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM conversations c LEFT JOIN users u ON u.id = c.user_id ${whereClause}`,
      params
    );

    const result = await pool.query(`
      SELECT 
        c.id,
        c.title,
        c.user_id,
        u.email as user_email,
        c.created_at,
        c.updated_at,
        COUNT(m.id) as message_count,
        COALESCE(SUM(m.cost_usd), 0) as total_cost,
        (SELECT content FROM messages WHERE conversation_id = c.id ORDER BY created_at LIMIT 1) as first_message
      FROM conversations c
      LEFT JOIN users u ON u.id = c.user_id
      LEFT JOIN messages m ON m.conversation_id = c.id
      ${whereClause}
      GROUP BY c.id, c.title, c.user_id, u.email, c.created_at, c.updated_at
      ORDER BY c.updated_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `, [...params, limit, offset]);

    return {
      conversations: result.rows.map(r => ({
        id: r.id,
        title: r.title,
        userId: r.user_id,
        userEmail: r.user_email,
        createdAt: r.created_at,
        updatedAt: r.updated_at,
        messageCount: Number(r.message_count),
        totalCost: Number(r.total_cost),
        firstMessage: r.first_message?.substring(0, 100),
      })),
      total: Number(countResult.rows[0].count),
      limit,
      offset,
    };
  }

  async getConversationDetail(conversationId: string) {
    const [convResult, messagesResult] = await Promise.all([
      pool.query(`
        SELECT c.*, u.email as user_email, u.name as user_name
        FROM conversations c
        LEFT JOIN users u ON u.id = c.user_id
        WHERE c.id = $1
      `, [conversationId]),
      pool.query(`
        SELECT * FROM messages WHERE conversation_id = $1 ORDER BY created_at
      `, [conversationId]),
    ]);

    if (convResult.rows.length === 0) {
      return null;
    }

    const conv = convResult.rows[0];
    return {
      id: conv.id,
      title: conv.title,
      userId: conv.user_id,
      userEmail: conv.user_email,
      userName: conv.user_name,
      createdAt: conv.created_at,
      updatedAt: conv.updated_at,
      messages: messagesResult.rows.map(m => ({
        id: m.id,
        role: m.role,
        content: m.content,
        sources: m.sources,
        inputTokens: m.input_tokens,
        outputTokens: m.output_tokens,
        costUsd: Number(m.cost_usd || 0),
        responseTimeMs: m.response_time_ms,
        createdAt: m.created_at,
      })),
    };
  }

  async getCostAnalytics(period: '7d' | '30d' | '90d' | 'all' = '30d') {
    const days = period === 'all' ? 365 : period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const dateFilter = period === 'all' ? '' : `WHERE created_at >= NOW() - INTERVAL '${days} days'`;

    const [summary, daily, topUsers] = await Promise.all([
      pool.query(`
        SELECT 
          COALESCE(SUM(cost_usd), 0) as total_cost,
          COALESCE(SUM(input_tokens), 0) as total_input_tokens,
          COALESCE(SUM(output_tokens), 0) as total_output_tokens,
          COUNT(*) as total_messages
        FROM messages
        ${dateFilter}
      `),
      pool.query(`
        SELECT 
          date_trunc('day', created_at)::date as day,
          COALESCE(SUM(cost_usd), 0) as cost,
          COALESCE(SUM(input_tokens), 0) as input_tokens,
          COALESCE(SUM(output_tokens), 0) as output_tokens,
          COUNT(*) as messages
        FROM messages
        ${dateFilter}
        GROUP BY date_trunc('day', created_at)::date
        ORDER BY day
      `),
      pool.query(`
        SELECT 
          u.id,
          u.email,
          u.name,
          COALESCE(SUM(m.cost_usd), 0) as total_cost,
          COUNT(m.id) as message_count
        FROM users u
        JOIN conversations c ON c.user_id = u.id
        JOIN messages m ON m.conversation_id = c.id
        ${dateFilter.replace('WHERE', 'WHERE m.')}
        GROUP BY u.id, u.email, u.name
        ORDER BY total_cost DESC
        LIMIT 10
      `),
    ]);

    return {
      summary: {
        totalCost: Number(summary.rows[0].total_cost),
        totalInputTokens: Number(summary.rows[0].total_input_tokens),
        totalOutputTokens: Number(summary.rows[0].total_output_tokens),
        totalMessages: Number(summary.rows[0].total_messages),
      },
      daily: daily.rows.map(r => ({
        day: r.day,
        cost: Number(r.cost),
        inputTokens: Number(r.input_tokens),
        outputTokens: Number(r.output_tokens),
        messages: Number(r.messages),
      })),
      topUsers: topUsers.rows.map(r => ({
        id: r.id,
        email: r.email,
        name: r.name,
        totalCost: Number(r.total_cost),
        messageCount: Number(r.message_count),
      })),
    };
  }

  async getErrors(options: { limit?: number; offset?: number; severity?: string; resolved?: boolean; type?: string; search?: string }) {
    const { limit = 50, offset = 0, severity, resolved, type, search } = options;
    
    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (severity) {
      conditions.push(`e.severity = $${paramIndex++}`);
      params.push(severity);
    }
    if (resolved !== undefined) {
      conditions.push(`e.is_resolved = $${paramIndex++}`);
      params.push(resolved);
    }
    if (type) {
      conditions.push(`e.error_type = $${paramIndex++}`);
      params.push(type);
    }
    if (search) {
      conditions.push(`(e.error_message ILIKE $${paramIndex} OR e.error_type ILIKE $${paramIndex})`);
      params.push(`%${search}%`);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await pool.query(
      `SELECT COUNT(*) FROM error_logs e ${whereClause}`,
      params
    );

    const result = await pool.query(`
      SELECT 
        e.*,
        u.email as user_email,
        a.email as resolved_by_email
      FROM error_logs e
      LEFT JOIN users u ON u.id = e.user_id
      LEFT JOIN admin_users a ON a.id = e.resolved_by
      ${whereClause}
      ORDER BY e.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `, [...params, limit, offset]);

    return {
      errors: result.rows.map(r => ({
        id: r.id,
        errorType: r.error_type,
        errorMessage: r.error_message,
        errorStack: r.error_stack,
        severity: r.severity,
        userId: r.user_id,
        userEmail: r.user_email,
        conversationId: r.conversation_id,
        requestPath: r.request_path,
        requestMethod: r.request_method,
        isResolved: r.is_resolved,
        resolvedBy: r.resolved_by,
        resolvedByEmail: r.resolved_by_email,
        resolvedAt: r.resolved_at,
        resolutionNotes: r.resolution_notes,
        createdAt: r.created_at,
      })),
      total: Number(countResult.rows[0].count),
      limit,
      offset,
    };
  }

  async resolveError(errorId: string, adminId: string, notes: string) {
    await pool.query(`
      UPDATE error_logs 
      SET is_resolved = TRUE, resolved_by = $1, resolved_at = NOW(), resolution_notes = $2
      WHERE id = $3
    `, [adminId, notes, errorId]);
  }

  async getSystemHealth() {
    const startTime = Date.now();
    
    const [dbTest, tables, performance] = await Promise.all([
      pool.query('SELECT 1'),
      pool.query(`
        SELECT 
          relname as table_name,
          n_live_tup as row_count
        FROM pg_stat_user_tables
        ORDER BY n_live_tup DESC
      `),
      pool.query(`
        SELECT 
          AVG(response_time_ms) as avg,
          PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY response_time_ms) as p50,
          PERCENTILE_CONT(0.95) WITHIN GROUP (ORDER BY response_time_ms) as p95,
          PERCENTILE_CONT(0.99) WITHIN GROUP (ORDER BY response_time_ms) as p99
        FROM messages
        WHERE role = 'assistant' AND response_time_ms IS NOT NULL
        AND created_at >= NOW() - INTERVAL '24 hours'
      `),
    ]);

    const dbLatency = Date.now() - startTime;

    return {
      status: dbLatency < 1000 ? 'healthy' : 'unhealthy',
      database: {
        latencyMs: dbLatency,
        tables: tables.rows.map(t => ({
          name: t.table_name,
          rowCount: Number(t.row_count),
        })),
      },
      performance: {
        avgResponseTime: Number(performance.rows[0]?.avg || 0),
        p50: Number(performance.rows[0]?.p50 || 0),
        p95: Number(performance.rows[0]?.p95 || 0),
        p99: Number(performance.rows[0]?.p99 || 0),
      },
    };
  }

  async getTopUsers(limit: number = 10) {
    const result = await pool.query(`
      SELECT * FROM v_top_users LIMIT $1
    `, [limit]);

    return result.rows.map(r => ({
      id: r.id,
      email: r.email,
      name: r.name,
      conversationCount: Number(r.conversation_count),
      messageCount: Number(r.message_count),
      totalCost: Number(r.total_cost),
      lastActive: r.last_active,
    }));
  }

  async exportUsersCSV() {
    const result = await pool.query(`
      SELECT 
        u.id,
        u.email,
        u.name,
        u.created_at,
        p.province,
        p.employment_status,
        COUNT(DISTINCT c.id) as conversation_count,
        COUNT(m.id) as message_count,
        COALESCE(SUM(m.cost_usd), 0) as total_cost
      FROM users u
      LEFT JOIN user_profiles p ON p.user_id = u.id
      LEFT JOIN conversations c ON c.user_id = u.id
      LEFT JOIN messages m ON m.conversation_id = c.id
      GROUP BY u.id, u.email, u.name, u.created_at, p.province, p.employment_status
      ORDER BY u.created_at DESC
    `);

    const headers = ['ID', 'Email', 'Name', 'Created At', 'Province', 'Employment', 'Conversations', 'Messages', 'Total Cost'];
    const rows = result.rows.map(r => [
      r.id,
      r.email,
      r.name || '',
      r.created_at,
      r.province || '',
      r.employment_status || '',
      r.conversation_count,
      r.message_count,
      r.total_cost,
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  async exportCostsCSV(period: '7d' | '30d' | '90d' | 'all' = '30d') {
    const days = period === 'all' ? 365 : period === '7d' ? 7 : period === '30d' ? 30 : 90;
    const dateFilter = period === 'all' ? '' : `WHERE created_at >= NOW() - INTERVAL '${days} days'`;

    const result = await pool.query(`
      SELECT 
        date_trunc('day', created_at)::date as day,
        COALESCE(SUM(cost_usd), 0) as cost,
        COALESCE(SUM(input_tokens), 0) as input_tokens,
        COALESCE(SUM(output_tokens), 0) as output_tokens,
        COUNT(*) as messages
      FROM messages
      ${dateFilter}
      GROUP BY date_trunc('day', created_at)::date
      ORDER BY day
    `);

    const headers = ['Date', 'Cost (USD)', 'Input Tokens', 'Output Tokens', 'Messages'];
    const rows = result.rows.map(r => [
      r.day,
      r.cost,
      r.input_tokens,
      r.output_tokens,
      r.messages,
    ]);

    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }
}

export const adminService = new AdminService();
