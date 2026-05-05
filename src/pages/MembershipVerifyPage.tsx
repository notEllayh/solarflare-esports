import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { api } from '../lib/api'
import { useAuth } from '../context/useAuth'
import SEO from '../components/SEO'

type Status = 'verifying' | 'success' | 'error'

export default function MembershipVerifyPage() {
  const [status,  setStatus]  = useState<Status>('verifying')
  const [tier,    setTier]    = useState('')
  const [message, setMessage] = useState('')
  const [searchParams]        = useSearchParams()
  const { session }           = useAuth()
  const navigate              = useNavigate()

  useEffect(() => {
    const reference = searchParams.get('reference') || searchParams.get('trxref')

    const verify = async () => {
      if (!reference) {
        setStatus('error')
        setMessage('No payment reference found.')
        return
      }

      if (!session?.access_token) {
        setStatus('error')
        setMessage('You must be logged in to verify payment.')
        return
      }

      try {
        const res = await api.post<{ success: boolean; tier: string; message: string }>(
          '/api/membership/verify',
          { reference },
          { Authorization: `Bearer ${session.access_token}` }
        )
        setTier(res.tier)
        setStatus('success')
      } catch (err) {
        setStatus('error')
        setMessage(err instanceof Error ? err.message : 'Verification failed')
      }
    }

    verify()
  }, [searchParams, session])

  return (
    <>
      <SEO url="/membership/verify" title="Verifying Payment" noIndex />

      <div className="min-h-screen bg-sf-darker flex items-center justify-center px-6 pt-17">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(255,106,0,0.08) 0%, transparent 70%)',
          }}
        />

        <div className="relative text-center max-w-md">
          {status === 'verifying' && (
            <>
              <div className="flex justify-center mb-6">
                <span className="w-12 h-12 border-2 border-sf-orange/30 border-t-sf-orange rounded-full animate-spin block" />
              </div>
              <h2 className="font-condensed font-black text-[28px] uppercase text-sf-text mb-3">
                Verifying Payment
              </h2>
              <p className="text-sf-muted text-[14px]">
                Please wait while we confirm your payment...
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="text-[64px] mb-6">🔥</div>
              <h2 className="font-condensed font-black text-[36px] uppercase text-sf-text mb-3">
                Welcome to Flame Society!
              </h2>
              <p
                className="font-condensed font-black text-[24px] uppercase mb-6"
                style={{
                  background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {tier} Member
              </p>
              <p className="text-sf-muted text-[14px] leading-relaxed mb-8">
                Your membership is now active. Enjoy all your exclusive perks and benefits.
              </p>
              <button
                onClick={() => navigate('/flame-society')}
                className="px-8 py-3.5 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200"
              >
                Go to Flame Society →
              </button>
            </>
          )}

          {status === 'error' && (
            <>
              <div className="text-[64px] mb-6">❌</div>
              <h2 className="font-condensed font-black text-[28px] uppercase text-sf-text mb-3">
                Verification Failed
              </h2>
              <p className="text-sf-muted text-[14px] leading-relaxed mb-8">
                {message}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => navigate('/flame-society')}
                  className="px-8 py-3.5 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200"
                >
                  Try Again
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-8 py-3.5 border border-white/20 text-sf-text text-[12px] font-bold tracking-[0.14em] uppercase hover:border-white/50 transition-colors duration-200"
                >
                  Contact Support
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
} 