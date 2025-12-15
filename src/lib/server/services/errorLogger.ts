import { pool } from '../db';

interface ErrorLogOptions {
  errorType: string;
  errorMessage: string;
  errorStack?: string;
  severity?: 'debug' | 'info' | 'warning' | 'error' | 'critical';
  userId?: string;
  conversationId?: string;
  requestPath?: string;
  requestMethod?: string;
  requestBody?: any;
  userAgent?: string;
  ipAddress?: string;
}

export class ErrorLogger {
  async log(options: ErrorLogOptions): Promise<string> {
    try {
      const result = await pool.query(`
        INSERT INTO error_logs (
          error_type, error_message, error_stack, severity,
          user_id, conversation_id, request_path, request_method,
          request_body, user_agent, ip_address
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING id
      `, [
        options.errorType,
        options.errorMessage,
        options.errorStack || null,
        options.severity || 'error',
        options.userId || null,
        options.conversationId || null,
        options.requestPath || null,
        options.requestMethod || null,
        options.requestBody ? JSON.stringify(options.requestBody) : null,
        options.userAgent || null,
        options.ipAddress || null,
      ]);
      return result.rows[0].id;
    } catch (error) {
      console.error('Failed to log error to database:', error);
      return '';
    }
  }

  async critical(message: string, context?: Partial<ErrorLogOptions>): Promise<string> {
    return this.log({
      errorType: 'system',
      errorMessage: message,
      severity: 'critical',
      ...context,
    });
  }

  async error(message: string, context?: Partial<ErrorLogOptions>): Promise<string> {
    return this.log({
      errorType: 'system',
      errorMessage: message,
      severity: 'error',
      ...context,
    });
  }

  async warning(message: string, context?: Partial<ErrorLogOptions>): Promise<string> {
    return this.log({
      errorType: 'system',
      errorMessage: message,
      severity: 'warning',
      ...context,
    });
  }

  async info(message: string, context?: Partial<ErrorLogOptions>): Promise<string> {
    return this.log({
      errorType: 'system',
      errorMessage: message,
      severity: 'info',
      ...context,
    });
  }

  async apiError(error: Error, req: any): Promise<string> {
    return this.log({
      errorType: 'api_error',
      errorMessage: error.message,
      errorStack: error.stack,
      severity: 'error',
      userId: req.userId,
      requestPath: req.path,
      requestMethod: req.method,
      requestBody: req.body,
      userAgent: req.headers?.['user-agent'],
      ipAddress: req.ip,
    });
  }

  async databaseError(error: Error, context?: Partial<ErrorLogOptions>): Promise<string> {
    return this.log({
      errorType: 'database_error',
      errorMessage: error.message,
      errorStack: error.stack,
      severity: 'error',
      ...context,
    });
  }

  async authError(message: string, context?: Partial<ErrorLogOptions>): Promise<string> {
    return this.log({
      errorType: 'auth_error',
      errorMessage: message,
      severity: 'warning',
      ...context,
    });
  }
}

export const errorLogger = new ErrorLogger();
