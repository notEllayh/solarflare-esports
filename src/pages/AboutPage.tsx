import SEO from '../components/SEO'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { teamValues, milestones, staffMembers, type StaffMember } from '../data/siteData'
import PageHero from '../components/PageHero'

function StaffCard({ member }: { member: StaffMember }) {
  const [imgError, setImgError] = useState(false)
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className="bg-sf-surface group cursor-pointer hover:bg-[#222226] transition-colors duration-200"
      onClick={() => setExpanded((prev) => !prev)}
    >
      {/* Image */}
      <div className="relative w-full overflow-hidden bg-sf-mid" style={{ aspectRatio: '1/1' }}>
        {!imgError ? (
          <img
            src={member.image}
            alt={member.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="font-condensed font-black text-[56px] text-white/10 select-none">
              {member.name.charAt(0)}
            </span>
          </div>
        )}

        {/* Department badge */}
        <div className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase bg-sf-darker/80 text-sf-orange px-2.5 py-1 backdrop-blur-sm">
          {member.department}
        </div>

        {/* Bottom fade */}
        <div 
          className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #1C1C1F 0%, transparent 100%)' }}
        />
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-condensed font-black text-[20px] uppercase leading-tight text-sf-text mb-0.5">
          {member.name}
        </h3>
        <p className="text-[11px] font-semibold tracking-[0.08em] uppercase text-sf-orange mb-3">
          {member.role}
        </p>

        {/* Bio — expands on click */}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <p className="text-[13px] text-sf-muted leading-relaxed border-t border-sf-border pt-3">
            {member.bio}
          </p>
        </div>

        <p className="text-[11px] text-sf-muted/50 mt-2">
          {expanded ? 'Click to collapse ↑' : 'Click to read bio ↓'}
        </p>
      </div>

      {/* Bottom accent */}
      <div
        className="h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
      />
    </div>
  )
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="About Solar Flare"
        subtitle="We started with a roster and a dream. Now we're building something that lasts."
      />

      <SEO
        url="/about"
        title="About Us"
        description="Learn about Solar Flare Esports, our mission, values, and the team behind the organization."
      />

      {/* Mission statement */}
      <section className="border-b border-sf-border">
        <div className="max-w-275 mx-auto px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[11px] font-bold tracking-widest uppercase text-sf-orange mb-4">
                Our Mission
              </p>
              <h2
                className="font-condensed font-black uppercase leading-none text-sf-text mb-6"
                style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
              >
                Compete.<br />Inspire.<br />Dominate.
              </h2>
              <p className="text-sf-muted text-[15px] leading-relaxed mb-4">
                Solar Flare Esports was founded in 2026 with one belief — that esports deserved an organisation that treated its players like elite athletes, its fans like family, and its craft like a religion.
              </p>
              <p className="text-sf-muted text-[15px] leading-relaxed">
                We're not just here to compete. We're here to change what people expect from an esports organisation — on the server, in the community, and in the culture.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-0.5">
              {[
                { value: '2026', label: 'Founded' },
                { value: '4',    label: 'Divisions' },
                { value: '10',   label: 'Athletes' },
                { value: '5K+', label: 'Flame Society Members' },
              ].map((stat) => (
                <div key={stat.label} className="bg-sf-surface p-8 flex flex-col gap-2">
                  <span
                    className="font-condensed font-black text-[44px] leading-none"
                    style={{
                      background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-semibold tracking-widest uppercase text-sf-muted">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-sf-border">
        <div className="max-w-275 mx-auto px-6 md:px-12 py-20">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
            What We Stand For
          </p>
          <h2
            className="font-condensed font-black uppercase leading-none text-sf-text mb-12"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5">
            {teamValues.map((value) => (
              <div
                key={value.title}
                className="bg-sf-surface p-8 group hover:bg-[#222226] transition-colors duration-200"
              >
                <div className="text-[36px] mb-5">{value.icon}</div>
                <h3 className="font-condensed font-bold text-[20px] uppercase text-sf-text mb-3">
                  {value.title}
                </h3>
                <p className="text-[13px] text-sf-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-sf-border">
        <div className="max-w-275 mx-auto px-6 md:px-12 py-20">
          <p className="text-[11px] font-bold tracking-widest uppercase text-sf-orange mb-3">
            How We Got Here
          </p>
          <h2
            className="font-condensed font-black uppercase leading-none text-sf-text mb-16"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Our Journey
          </h2>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-1.75 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, #FF6A00, rgba(255,106,0,0.1))' }}
            />

            <div className="flex flex-col gap-12">
              {milestones.map((milestone, i) => (
                <div
                  key={`${milestone.year}-${i}`}
                  className={`relative flex items-start gap-8 md:gap-0 ${
                    i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Dot */}
                  <div
                    className="absolute left-0 md:left-1/2 w-3.75 h-3.75 -translate-x-1.75 md:-translate-x-1.75 mt-1.5 shrink-0 z-10"
                    style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
                  />

                  {/* Content */}
                  <div
                    className={`ml-8 md:ml-0 md:w-[calc(50%-32px)] bg-sf-surface p-7 ${
                      i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                    }`}
                  >
                    <span
                      className="inline-block font-condensed font-black text-[13px] tracking-widest mb-3 px-3 py-1"
                      style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)', color: '#fff' }}
                    >
                      {milestone.year}
                    </span>
                    <h3 className="font-condensed font-bold text-[22px] uppercase text-sf-text leading-tight mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-[13px] text-sf-muted leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-[calc(50%-32px)]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Staff */}
      <section className="border-b border-sf-border">
        <div className="max-w-275 mx-auto px-6 md:px-12 py-20">
          <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
            The People Behind It
          </p>
          <h2
            className="font-condensed font-black uppercase leading-none text-sf-text mb-12"
            style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}
          >
            Leadership &<br />Staff
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-0.5">
            {staffMembers.map((member) => (
              <StaffCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section>
        <div className="max-w-275 mx-auto px-6 md:px-12 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
            <div className="bg-sf-surface p-8 flex flex-col gap-4 group hover:bg-[#222226] transition-colors duration-200">
              <span className="text-[32px]">🎮</span>
              <h3 className="font-condensed font-bold text-[20px] uppercase text-sf-text">
                Follow Our Teams
              </h3>
              <p className="text-[13px] text-sf-muted leading-relaxed flex-1">
                Four divisions competing across the biggest titles. Watch us play.
              </p>
              <Link
                to="/teams"
                className="text-[11px] font-bold tracking-[0.12em] uppercase text-sf-orange hover:underline"
              >
                View All Teams →
              </Link>
            </div>

            <div className="bg-sf-surface p-8 flex flex-col gap-4 group hover:bg-[#222226] transition-colors duration-200">
              <span className="text-[32px]">🔥</span>
              <h3 className="font-condensed font-bold text-[20px] uppercase text-sf-text">
                Join Flame Society
              </h3>
              <p className="text-[13px] text-sf-muted leading-relaxed flex-1">
                Become a member and get exclusive access to content, perks, and the community.
              </p>
              <Link
                to="/flame-society"
                className="text-[11px] font-bold tracking-[0.12em] uppercase text-sf-orange hover:underline"
              >
                View Memberships →
              </Link>
            </div>

            <div className="bg-sf-surface p-8 flex flex-col gap-4 group hover:bg-[#222226] transition-colors duration-200">
              <span className="text-[32px]">🚀</span>
              <h3 className="font-condensed font-bold text-[20px] uppercase text-sf-text">
                Work With Us
              </h3>
              <p className="text-[13px] text-sf-muted leading-relaxed flex-1">
                We're always looking for exceptional people to join the Solar Flare family.
              </p>
              <Link
                to="/careers"
                className="text-[11px] font-bold tracking-[0.12em] uppercase text-sf-orange hover:underline"
              >
                See Open Roles →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}