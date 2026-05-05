import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import SEO from '../components/SEO'

export default function ForgotPasswordPage() {
  const [email,   setEmail]   = useState('')
  const [sent,    setSent]    = useState(false)
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      if (error) throw new Error(error.message)
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const inputBase = 'w-full bg-sf-surface border border-white/10 text-sf-text text-[14px] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-sf-muted/50 focus:border-sf-orange'

  return (
    <>
      <SEO url="/forgot-password" title="Forgot Password" noIndex />

      <div className="min-h-screen bg-sf-darker flex items-center justify-center px-6 pt-17">
        <div className="relative w-full max-w-md">
          <div className="flex flex-col items-center mb-10">
            <div
              className="w-12 h-12 flex items-center justify-center text-white text-sm font-black mb-4"
              style={{
                background: 'linear-gradient(135deg, #FF6A00, #FFB800)',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
              }}
            >
              SF
            </div>
            <h1 className="font-condensed font-black text-[32px] uppercase text-sf-text">
              Reset Password
            </h1>
            <p className="text-sf-muted text-[14px] mt-1 text-center">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <div className="bg-sf-surface p-8">
            {sent ? (
              <div className="text-center py-4">
                <p className="text-sf-text font-semibold mb-2">Check your email</p>
                <p className="text-sf-muted text-[13px] mb-6">
                  We sent a password reset link to <span className="text-sf-text">{email}</span>
                </p>
                <Link to="/login" className="text-sf-orange hover:underline text-[13px]">
                  Back to login
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-sf-muted mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputBase}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 px-4 py-3">
                    <p className="text-[13px] text-red-400">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link →'
                  )}
                </button>

                <Link to="/login" className="text-center text-[12px] text-sf-muted hover:text-sf-text transition-colors">
                  ← Back to login
                </Link>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
} 