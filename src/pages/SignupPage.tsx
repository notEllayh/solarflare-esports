import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import SEO from '../components/SEO'
import logo from '../assets/Logos/RedLogo.png'

export default function SignupPage() {
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [success,  setSuccess]  = useState(false)
  const { signUp } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)
    try {
      await signUp(email, password, name)
      setSuccess(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const inputBase = 'w-full bg-sf-surface border border-white/10 text-sf-text text-[14px] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-sf-muted/50 focus:border-sf-orange'

  return (
    <>
      <SEO url="/signup" title="Sign Up" noIndex />

      <div className="min-h-screen bg-sf-darker flex items-center justify-center px-6 pt-17 pb-16">
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
              Join Solar Flare
            </h1>
            <p className="text-sf-muted text-[14px] mt-1">
              Create your account and join the community
            </p>
          </div>

          {success ? (
            <div className="bg-sf-surface p-10 flex flex-col items-center text-center">
              <div
                className="w-14 h-14 flex items-center justify-center text-white text-xl mb-5"
                style={{
                  background: 'linear-gradient(135deg, #FF6A00, #FFB800)',
                  clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                }}
              >
                ✓
              </div>
              <h3 className="font-condensed font-black text-[24px] uppercase text-sf-text mb-3">
                Check Your Email
              </h3>
              <p className="text-sf-muted text-[14px] leading-relaxed mb-6">
                We sent a confirmation link to <span className="text-sf-text">{email}</span>. Click it to activate your account.
              </p>
              <Link
                to="/login"
                className="text-[11px] font-bold tracking-[0.12em] uppercase text-white bg-sf-orange px-8 py-3 hover:bg-orange-500 transition-colors duration-200"
              >
                Go to Login
              </Link>
            </div>
          ) : (
            <div className="bg-sf-surface p-8">
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-sf-muted mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Liam Carter"
                    className={inputBase}
                    required
                  />
                </div>

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
                    placeholder="Min 8 characters"
                    className={inputBase}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-sf-muted mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
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
                  className="w-full py-3.5 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account →'
                  )}
                </button>
              </form>

              <p className="text-center text-[13px] text-sf-muted mt-6">
                Already have an account?{' '}
                <Link to="/login" className="text-sf-orange hover:underline font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
} 