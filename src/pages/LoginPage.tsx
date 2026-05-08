import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import SEO from '../components/SEO'
import logo from '../assets/Logos/RedLogo.png'

export default function LoginPage() {
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const { signIn } = useAuth()
  const navigate   = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const inputBase = 'w-full bg-sf-surface border border-white/10 text-sf-text text-[14px] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-sf-muted/50 focus:border-sf-orange'

  return (
    <>
      <SEO url="/login" title="Login" noIndex />

      <div className="min-h-screen bg-sf-darker flex items-center justify-center px-6 pt-17">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,106,0,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative w-full max-w-md">
          {/* Logo */}
          <div className="flex flex-col items-center mb-10">
            <img src={logo} alt="Solar Flare Logo" className="w-12 h-12 mb-4" />
            <h1 className="font-condensed font-black text-[32px] uppercase text-sf-text">
              Welcome Back
            </h1>
            <p className="text-sf-muted text-[14px] mt-1">
              Sign in to your Solar Flare account
            </p>
          </div>

          {/* Form */}
          <div className="bg-sf-surface p-8">
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

              <div>
                <label className="block text-[11px] font-semibold tracking-widest uppercase text-sf-muted mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputBase}
                  required
                />
              </div>

              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-[12px] text-sf-orange hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 px-4 py-3">
                  <p className="text-[13px] text-red-400">{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In →'
                )}
              </button>
            </form>

            <p className="text-center text-[13px] text-sf-muted mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-sf-orange hover:underline font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
} 