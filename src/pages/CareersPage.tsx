import { useState } from 'react'
import { jobRoles, departments, type JobRole } from '../data/siteData'
import PageHero from '../components/PageHero'

const deptColors: Record<string, string> = {
  Athletic:    'bg-orange-500/15 text-sf-orange',
  Media:       'bg-blue-500/15 text-blue-400',
  Commercial:  'bg-yellow-500/15 text-yellow-400',
  Performance: 'bg-green-500/15 text-green-400',
  Creative:    'bg-pink-500/15 text-pink-400',
}

function JobCard({ job }: { job: JobRole }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-sf-surface border-b border-sf-border group">
      {/* Row */}
      <button
        className="w-full text-left px-8 py-6 flex items-start md:items-center justify-between gap-6"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 flex-1 min-w-0">
          <div className="flex-1 min-w-0">
            <h3 className="font-condensed font-bold text-[22px] uppercase text-sf-text leading-tight">
              {job.title}
            </h3>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 ${deptColors[job.department] ?? 'bg-white/10 text-sf-muted'}`}>
                {job.department}
              </span>
              <span className="text-[12px] text-sf-muted">📍 {job.location}</span>
              <span className="text-[12px] text-sf-muted">⏱ {job.type}</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div
          className={`w-8 h-8 border border-white/15 flex items-center justify-center text-sf-muted shrink-0 transition-all duration-300 group-hover:border-sf-orange group-hover:text-sf-orange ${
            open ? 'rotate-45 border-sf-orange text-sf-orange' : ''
          }`}
        >
          +
        </div>
      </button>

      {/* Expanded */}
      {open && (
        <div className="px-8 pb-8">
          <div
            className="w-8 h-0.5 mb-5"
            style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
          />
          <p className="text-sf-muted text-[14px] leading-relaxed max-w-2xl mb-6">
            {job.description}
          </p>
          <button
            className="inline-block px-8 py-3 bg-sf-orange text-white text-[11px] font-bold tracking-[0.14em] uppercase hover:bg-orange-500 transition-colors duration-200"
          >
            Apply Now →
          </button>
        </div>
      )}
    </div>
  )
}

export default function CareersPage() {
  const [activeDept, setActiveDept] = useState('All')

  const filtered = activeDept === 'All'
    ? jobRoles
    : jobRoles.filter((j) => j.department === activeDept)

  return (
    <>
      <PageHero
        eyebrow="Join the Team"
        title="Careers"
        subtitle="We're building something special. Come be part of it."
      />

      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">
        {/* Values strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5 mb-16">
          {[
            { icon: '🔥', title: 'High Performance', desc: 'We operate like the athletes we support — with discipline, focus, and a relentless drive to be the best.' },
            { icon: '🌍', title: 'Global & Remote-First', desc: 'Our team spans continents. We hire the best regardless of timezone and build culture across borders.' },
            { icon: '🚀', title: 'Fast-Moving', desc: 'Esports moves at the speed of a flick shot. We make decisions fast, learn faster, and always push forward.' },
          ].map((v) => (
            <div key={v.title} className="bg-sf-surface p-8">
              <div className="text-[32px] mb-4">{v.icon}</div>
              <h3 className="font-condensed font-bold text-[20px] uppercase text-sf-text mb-2">
                {v.title}
              </h3>
              <p className="text-[13px] text-sf-muted leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Open roles */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
              Open Roles
            </p>
            <h2 className="font-condensed font-black text-[40px] uppercase leading-none text-sf-text">
              {filtered.length} Position{filtered.length !== 1 ? 's' : ''} Available
            </h2>
          </div>

          {/* Dept filter */}
          <div className="flex gap-2 flex-wrap">
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setActiveDept(dept)}
                className={`text-[11px] font-bold tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                  activeDept === dept
                    ? 'bg-sf-orange border-sf-orange text-white'
                    : 'bg-transparent border-white/15 text-sf-muted hover:border-white/40 hover:text-sf-text'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Job list */}
        <div className="border-t border-sf-border">
          {filtered.length > 0 ? (
            filtered.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="text-center py-20 text-sf-muted">
              <p className="font-condensed font-black text-[32px] uppercase">No roles in this department</p>
              <p className="text-[14px] mt-2">Check back soon or view all departments.</p>
            </div>
          )}
        </div>

        {/* Speculative applications CTA */}
        <div className="mt-16 border border-sf-border p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-2">
              Don't See Your Role?
            </p>
            <h3 className="font-condensed font-black text-[28px] uppercase text-sf-text leading-tight">
              Send a Speculative Application
            </h3>
            <p className="text-[13px] text-sf-muted mt-2 max-w-md leading-relaxed">
              If you're exceptional at what you do, we want to hear from you — even if there's no open role right now.
            </p>
          </div>
          <button className="shrink-0 px-8 py-3.5 bg-transparent border border-white/20 text-sf-text text-[11px] font-bold tracking-[0.14em] uppercase hover:border-white/50 transition-colors duration-200">
            Get in Touch →
          </button>
        </div>
      </section>
    </>
  )
}