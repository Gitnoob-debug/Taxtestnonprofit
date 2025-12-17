'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Calculator,
  BookOpen,
  MessageSquare,
  Sparkles,
  ChevronRight,
  Check,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  PiggyBank,
  Receipt,
  FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function TestDesignPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden">
      {/* Gradient Orbs Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent blur-3xl" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent blur-3xl" />
        <div className="absolute -bottom-40 right-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl blur-sm opacity-50" />
                  <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">YM</span>
                  </div>
                </div>
                <span className="font-semibold text-xl text-white">TaxAssist</span>
              </Link>

              <div className="hidden md:flex items-center gap-1">
                {[
                  { href: '/', label: 'Chat', icon: MessageSquare },
                  { href: '/tools', label: 'Tools', icon: Calculator },
                  { href: '/academy', label: 'Academy', icon: BookOpen },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-white/5">
                Sign in
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 shadow-lg shadow-emerald-500/25">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <span className="text-sm text-gray-300">AI-Powered Tax Assistance for Canadians</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-white">Master Your</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
                Canadian Taxes
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get instant, accurate answers to your tax questions. Our AI assistant is trained on official CRA documents and provides personalized guidance for your situation.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-lg font-semibold shadow-2xl shadow-emerald-500/30 border-0"
              >
                Start Free Chat
                <MessageSquare className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-white/20 text-white hover:bg-white/5 hover:border-white/30"
              >
                Explore Tools
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>CRA-aligned advice</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>No signup required</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            className="mt-20 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative max-w-5xl mx-auto">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent rounded-3xl blur-2xl" />

              {/* Mock Chat Window */}
              <div className="relative bg-gradient-to-b from-white/[0.08] to-white/[0.02] rounded-2xl border border-white/10 overflow-hidden backdrop-blur-xl">
                {/* Window Header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="ml-4 text-sm text-gray-400">Tax Assistant Chat</span>
                </div>

                {/* Chat Content */}
                <div className="p-6 space-y-4">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-md bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl rounded-br-md px-4 py-3">
                      <p className="text-white">How much can I contribute to my RRSP this year?</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="max-w-lg bg-white/5 rounded-2xl rounded-bl-md px-4 py-3 border border-white/5">
                      <p className="text-gray-200 leading-relaxed">
                        For 2024, your RRSP contribution limit is <span className="text-emerald-400 font-semibold">18% of your earned income</span> from the previous year, up to a maximum of <span className="text-emerald-400 font-semibold">$31,560</span>. Plus any unused contribution room from previous years!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                optimize your taxes
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From instant answers to detailed calculators, we've got you covered.
            </p>
          </motion.div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: MessageSquare,
                title: 'AI Tax Chat',
                description: 'Get instant answers to your tax questions from our AI trained on CRA documents.',
                color: 'emerald',
                href: '/'
              },
              {
                icon: Calculator,
                title: 'Tax Calculators',
                description: 'Calculate income tax, RRSP room, TFSA limits, capital gains, and more.',
                color: 'blue',
                href: '/tools'
              },
              {
                icon: BookOpen,
                title: 'Tax Academy',
                description: 'Learn Canadian tax concepts with 80+ in-depth articles and guides.',
                color: 'purple',
                href: '/academy'
              },
              {
                icon: PiggyBank,
                title: 'RRSP Optimizer',
                description: 'Find the optimal RRSP contribution to maximize your tax refund.',
                color: 'pink',
                href: '/tools/rrsp-calculator'
              },
              {
                icon: TrendingUp,
                title: 'Investment Tax',
                description: 'Understand capital gains, dividend tax credits, and investment income.',
                color: 'orange',
                href: '/tools/capital-gains-calculator'
              },
              {
                icon: FileText,
                title: 'FHSA Guide',
                description: 'Learn about the new First Home Savings Account and its benefits.',
                color: 'cyan',
                href: '/tools/fhsa-calculator'
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link href={feature.href}>
                  <div className="group relative h-full p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300">
                    {/* Icon */}
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                      feature.color === 'emerald' && 'bg-emerald-500/10 text-emerald-400',
                      feature.color === 'blue' && 'bg-blue-500/10 text-blue-400',
                      feature.color === 'purple' && 'bg-purple-500/10 text-purple-400',
                      feature.color === 'pink' && 'bg-pink-500/10 text-pink-400',
                      feature.color === 'orange' && 'bg-orange-500/10 text-orange-400',
                      feature.color === 'cyan' && 'bg-cyan-500/10 text-cyan-400',
                    )}>
                      <feature.icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="mt-4 flex items-center text-sm text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent border border-white/5 p-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

            <div className="relative grid md:grid-cols-4 gap-8 text-center">
              {[
                { value: '80+', label: 'Academy Articles', icon: BookOpen },
                { value: '6', label: 'Tax Calculators', icon: Calculator },
                { value: '24/7', label: 'AI Availability', icon: Clock },
                { value: '100%', label: 'Free to Use', icon: DollarSign },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="flex justify-center mb-3">
                    <stat.icon className="h-8 w-8 text-emerald-400" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to take control of your{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Canadian taxes?
              </span>
            </h2>
            <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
              Start chatting with our AI assistant or explore our calculators. No signup required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white text-lg font-semibold shadow-2xl shadow-emerald-500/30 border-0"
              >
                Start Free Chat
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-white/20 text-white hover:bg-white/5"
              >
                Browse Academy
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">YM</span>
              </div>
              <span className="text-gray-400">Canadian Tax Assistant</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/" className="hover:text-white transition-colors">Chat</Link>
              <Link href="/tools" className="hover:text-white transition-colors">Tools</Link>
              <Link href="/academy" className="hover:text-white transition-colors">Academy</Link>
            </div>

            <p className="text-sm text-gray-500">
              Not financial advice. Consult a professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
