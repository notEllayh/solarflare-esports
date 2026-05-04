import SEO from '../components/SEO'
import { api } from '../lib/api'
import { useState } from 'react'
import { contactDepartments } from '../data/siteData'
import PageHero from '../components/PageHero'

type FormState = {
  name:       string
  email:      string
  department: string
  subject:    string
  message:    string
}

type FormErrors = Partial<FormState> & {
  apiError?: string
}

const initialForm: FormState = {
  name:       '',
  email:      '',
  department: '',
  subject:    '',
  message:    '',
}

export default function ContactPage() {
  const [form,      setForm]      = useState<FormState>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [errors,    setErrors]    = useState<FormErrors>({})

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!form.name.trim())    next.name       = 'Name is required'
    if (!form.email.trim())   next.email      = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                              next.email      = 'Enter a valid email'
    if (!form.department)     next.department = 'Please select a department'
    if (!form.subject.trim()) next.subject    = 'Subject is required'
    if (!form.message.trim()) next.message    = 'Message is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    setErrors({})

    try {
      await api.post('/api/contact', {
        name:       form.name,
        email:      form.email,
        department: form.department,
        subject:    form.subject,
        message:    form.message,
      })
      setSubmitted(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setErrors((prev) => ({ ...prev, apiError: message }))
    } finally {
      setLoading(false)
    }
  }

  const inputBase =
    'w-full bg-sf-surface border text-sf-text text-[14px] px-4 py-3 outline-none transition-colors duration-200 placeholder:text-sf-muted/50 focus:border-sf-orange'

  const fieldError = (key: keyof FormState) =>
    errors[key] ? (
      <p className="text-[11px] text-red-400 mt-1.5 tracking-wide">{errors[key]}</p>
    ) : null

  return (
    <>
      <SEO
        url="/contact"
        title="Contact Us"
        description="Get in touch with Solar Flare Esports for business inquiries, press, or general questions."
      />
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        subtitle="Whether it's business, press, or just a question — we're here."
      />

      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-16">

          {/* Left — departments */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-6">
              Departments
            </p>
            <div className="flex flex-col gap-0.5">
              {contactDepartments.map((dept) => (
                <div
                  key={dept.id}
                  className="bg-sf-surface p-6 cursor-pointer group hover:bg-[#222226] transition-colors duration-200"
                  onClick={() => setForm((prev) => ({ ...prev, department: dept.id }))}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-[28px] shrink-0">{dept.icon}</span>
                    <div className="min-w-0">
                      <h3 className="font-condensed font-bold text-[18px] uppercase text-sf-text leading-tight mb-1">
                        {dept.title}
                      </h3>
                      <p className="text-[12px] text-sf-muted leading-relaxed mb-3">
                        {dept.description}
                      </p>
                      <a 
                        href={`mailto:${dept.email}`}
                        className="text-[11px] font-semibold tracking-[0.08em] text-sf-orange hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {dept.email}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="mt-10">
              <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-muted mb-5">
                Find Us Online
              </p>
              <div className="flex gap-3">
                {[
                  { label: 'X',         symbol: '𝕏' },
                  { label: 'Discord',   symbol: '◈' },
                  { label: 'YouTube',   symbol: '▶' },
                  { label: 'Instagram', symbol: '📷' },
                ].map((s) => (
                  <button
                    key={s.label}
                    aria-label={s.label}
                    className="w-10 h-10 border border-white/10 flex items-center justify-center text-[13px] text-sf-muted hover:bg-sf-orange hover:border-sf-orange hover:text-white transition-all duration-200"
                  >
                    {s.symbol}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-6">
              Send a Message
            </p>

            {submitted ? (
              <div className="bg-sf-surface p-12 flex flex-col items-center text-center">
                <div
                  className="w-16 h-16 flex items-center justify-center text-[28px] mb-6"
                  style={{
                    background: 'linear-gradient(135deg, #FF6A00, #FFB800)',
                    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                  }}
                >
                  ✓
                </div>
                <h3 className="font-condensed font-black text-[28px] uppercase text-sf-text mb-3">
                  Message Sent
                </h3>
                <p className="text-sf-muted text-[14px] leading-relaxed max-w-sm mb-8">
                  Thanks for reaching out. We'll get back to you within 2 business days.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(initialForm) }}
                  className="text-[11px] font-bold tracking-[0.12em] uppercase text-white bg-sf-orange px-8 py-3 hover:bg-orange-500 transition-colors duration-200"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-semibold tracking-widest uppercase text-sf-muted mb-2">
                      Full Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Liam Carter"
                      className={`${inputBase} ${errors.name ? 'border-red-500/60' : 'border-white/10'}`}
                    />
                    {fieldError('name')}
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold tracking-widest uppercase text-sf-muted mb-2">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`${inputBase} ${errors.email ? 'border-red-500/60' : 'border-white/10'}`}
                    />
                    {fieldError('email')}
                  </div>
                </div>

                {/* Department */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-sf-muted mb-2">
                    Department
                  </label>
                  <select
                    name="department"
                    value={form.department}
                    onChange={handleChange}
                    className={`${inputBase} ${errors.department ? 'border-red-500/60' : 'border-white/10'}`}
                  >
                    <option value="" disabled>Select a department...</option>
                    {contactDepartments.map((d) => (
                      <option key={d.id} value={d.id}>{d.title}</option>
                    ))}
                  </select>
                  {fieldError('department')}
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-sf-muted mb-2">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    className={`${inputBase} ${errors.subject ? 'border-red-500/60' : 'border-white/10'}`}
                  />
                  {fieldError('subject')}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-semibold tracking-widest uppercase text-sf-muted mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={6}
                    placeholder="Tell us what's on your mind..."
                    className={`${inputBase} resize-none ${errors.message ? 'border-red-500/60' : 'border-white/10'}`}
                  />
                  {fieldError('message')}
                </div>

                {/* API error */}
                {errors.apiError && (
                  <div className="bg-red-500/10 border border-red-500/20 px-4 py-3">
                    <p className="text-[13px] text-red-400">{errors.apiError}</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="self-start px-10 py-3.5 bg-sf-orange text-white text-[12px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-3"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message →'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}