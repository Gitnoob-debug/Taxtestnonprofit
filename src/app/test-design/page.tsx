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
  FileText,
  ArrowUpRight,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function TestDesignPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-emerald-50 via-teal-50/50 to-transparent rounded-full blur-3xl opacity-60" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-blue-50 via-cyan-50/30 to-transparent rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-purple-50/50 via-pink-50/30 to-transparent rounded-full blur-3xl opacity-40" />
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Navigation */}
      <nav className="relative z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <span className="text-white font-bold text-sm">YM</span>
                </div>
                <span className="font-semibold text-xl text-slate-900">TaxAssist</span>
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
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" className="text-slate-600 hover:text-slate-900">
                Sign in
              </Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/10">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-medium text-emerald-700">AI-Powered Tax Assistance</span>
            </motion.div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="text-slate-900">Simplify Your</span>
              <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Canadian Taxes
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Get instant, accurate answers to your tax questions. Our AI is trained on official CRA documents to provide personalized guidance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white text-lg font-semibold shadow-xl shadow-slate-900/10"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Free Chat
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-12 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>Free to use</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>CRA-aligned advice</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span>No signup required</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Visual - Chat Preview */}
          <motion.div
            className="mt-20 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative max-w-4xl mx-auto">
              {/* Shadow/Glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-3xl blur-2xl" />

              {/* Chat Window */}
              <div className="relative bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
                {/* Window Header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <div className="w-3 h-3 rounded-full bg-amber-400" />
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                    </div>
                    <span className="ml-3 text-sm font-medium text-slate-600">Tax Assistant</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <div className="h-2 w-2 rounded-full bg-emerald-400" />
                    Online
                  </div>
                </div>

                {/* Chat Content */}
                <div className="p-6 space-y-4 bg-gradient-to-b from-slate-50/50 to-white">
                  {/* User Message */}
                  <div className="flex justify-end">
                    <div className="max-w-sm bg-slate-900 text-white rounded-2xl rounded-br-md px-4 py-3 shadow-lg">
                      <p>How much can I contribute to my RRSP this year?</p>
                    </div>
                  </div>

                  {/* AI Response */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="max-w-md bg-white rounded-2xl rounded-bl-md px-4 py-3 border border-slate-100 shadow-sm">
                      <p className="text-slate-700 leading-relaxed">
                        For 2024, your RRSP contribution limit is <span className="text-emerald-600 font-semibold">18% of your earned income</span> from the previous year, up to a maximum of <span className="text-emerald-600 font-semibold">$31,560</span>. Plus any unused contribution room from previous years!
                      </p>
                      <div className="mt-3 flex gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
                          RRSP
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                          2024 Tax Year
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
              Everything you need to{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                optimize your taxes
              </span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              From instant answers to detailed calculators, we've got your Canadian tax needs covered.
            </p>
          </motion.div>

          {/* Feature Cards - Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: MessageSquare,
                title: 'AI Tax Chat',
                description: 'Get instant answers to your tax questions from our AI trained on official CRA documents.',
                color: 'emerald',
                href: '/',
                featured: true
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
                description: 'Learn about the First Home Savings Account and its tax benefits.',
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
                className={cn(feature.featured && 'md:col-span-2 lg:col-span-1')}
              >
                <Link href={feature.href}>
                  <div className="group relative h-full p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100 transition-all duration-300">
                    {/* Icon */}
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110",
                      feature.color === 'emerald' && 'bg-emerald-50 text-emerald-600',
                      feature.color === 'blue' && 'bg-blue-50 text-blue-600',
                      feature.color === 'purple' && 'bg-purple-50 text-purple-600',
                      feature.color === 'pink' && 'bg-pink-50 text-pink-600',
                      feature.color === 'orange' && 'bg-orange-50 text-orange-600',
                      feature.color === 'cyan' && 'bg-cyan-50 text-cyan-600',
                    )}>
                      <feature.icon className="h-6 w-6" />
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors flex items-center gap-2">
                      {feature.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-12 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-teal-500/20 to-transparent rounded-full blur-3xl" />

            <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
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
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-emerald-400" />
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-slate-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-sm font-medium mb-4">
              How It Works
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-slate-900">
              Get tax help in seconds
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              No appointments, no waiting. Just ask your question and get accurate answers.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Ask Your Question',
                description: 'Type your tax question in plain English. No jargon needed.',
                icon: MessageSquare
              },
              {
                step: '02',
                title: 'Get AI Analysis',
                description: 'Our AI searches CRA documents to find the most relevant answer.',
                icon: Sparkles
              },
              {
                step: '03',
                title: 'Take Action',
                description: 'Use our calculators to crunch the numbers and optimize your taxes.',
                icon: Calculator
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-slate-100 mb-4">{item.step}</div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
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
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-slate-900">
              Ready to simplify your{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Canadian taxes?
              </span>
            </h2>
            <p className="text-slate-600 text-xl mb-10 max-w-2xl mx-auto">
              Start chatting with our AI assistant or explore our calculators. It's free, no signup required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="h-14 px-8 bg-slate-900 hover:bg-slate-800 text-white text-lg font-semibold shadow-xl shadow-slate-900/10"
              >
                Start Free Chat
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-lg font-semibold border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Browse Academy
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-100 py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">YM</span>
              </div>
              <span className="text-slate-600">Canadian Tax Assistant</span>
            </div>

            <div className="flex items-center gap-6 text-sm text-slate-500">
              <Link href="/" className="hover:text-slate-900 transition-colors">Chat</Link>
              <Link href="/tools" className="hover:text-slate-900 transition-colors">Tools</Link>
              <Link href="/academy" className="hover:text-slate-900 transition-colors">Academy</Link>
            </div>

            <p className="text-sm text-slate-500">
              Not financial advice. Consult a professional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
