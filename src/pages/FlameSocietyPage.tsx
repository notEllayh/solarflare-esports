//import SlfLogo from '../assets/Logos/RedLogo.png';

import { useState } from 'react'
import { membershipTiers, fanPerks, type MembershipTier } from '../data/siteData'

function TierCard({ tier, billing }: { tier: MembershipTier; billing: 'month' | 'year' }) {
   const rawPrice = billing === 'year' ? tier.price * 12 * 0.8 : tier.price
   const formattedPrice = new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: 0,
  }).format(rawPrice)
  const period = billing === 'year' ? 'year' : 'month'

  return (
    <div
      className={`relative flex flex-col p-8 transition-all duration-200 ${
        tier.featured
          ? 'bg-sf-surface ring-2 ring-sf-orange'
          : 'bg-sf-surface hover:bg-[#222226]'
      }`}
    >
      {/* Featured label */}
      {tier.featured && (
        <div
          className="absolute -top-px left-0 right-0 h-0.75"
          style={{ background: 'linear-gradient(90deg, #FF6A00, #FFB800)' }}
        />
      )}
      {tier.featured && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-sf-orange text-white text-[10px] font-black tracking-[0.12em] uppercase px-4 py-1 whitespace-nowrap">
          Most Popular
        </div>
      )}

      {/* Badge + name */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-[32px]">{tier.badge}</span>
        <h3 className="font-condensed font-black text-[28px] uppercase tracking-wide text-sf-text">
          {tier.name}
        </h3>
      </div>

      {/* Price */}
      <div className="mb-2">
        <span
          className="font-condensed font-black text-[48px] leading-none"
          style={{
            background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          ₦{formattedPrice}
        </span>
        <span className="text-sf-muted text-[13px] ml-1">/ {period}</span>
      </div>

      {billing === 'year' && (
        <p className="text-[11px] text-green-400 font-semibold tracking-wide mb-4">
          Save 20% vs monthly
        </p>
      )}

      <p className="text-[13px] text-sf-muted leading-relaxed mb-6 min-h-10">
        {tier.description}
      </p>

      {/* Divider */}
      <div className="w-full h-px bg-white/8 mb-6" />

      {/* Perks */}
      <ul className="flex flex-col gap-3 mb-8 flex-1">
        {tier.perks.map((perk) => (
          <li key={perk} className="flex items-start gap-3 text-[13px] text-sf-text">
            <span
              className="shrink-0 w-4 h-4 flex items-center justify-center text-[10px] font-black text-white mt-0.5"
              style={{ background: 'linear-gradient(135deg, #FF6A00, #FFB800)' }}
            >
              ✓
            </span>
            {perk}
          </li>
        ))}
      </ul>

      <button
        className={`w-full py-3.5 text-[12px] font-bold tracking-[0.14em] uppercase transition-colors duration-200 ${
          tier.featured
            ? 'bg-sf-orange text-white hover:bg-orange-500'
            : 'border border-white/20 text-sf-text hover:border-white/50'
        }`}
      >
        Join {tier.name} →
      </button>
    </div>
  )
}

export default function FlameSocietyPage() {
  const [billing, setBilling] = useState<'month' | 'year'>('month')

  return (
    <div className="bg-sf-darker">
      {/* Hero — custom, not PageHero */}
      <div className="relative min-h-[55vh] flex flex-col items-center justify-center text-center overflow-hidden pt-17 px-6">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,106,0,0.14) 0%, transparent 70%),
              radial-gradient(ellipse 50% 40% at 20% 80%, rgba(255,184,0,0.07) 0%, transparent 60%)
            `,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,106,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,106,0,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%)',
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          {/* Flame icon */}
          <div className="flex justify-center mb-6">
            <div className="text-[56px]">🔥</div>
          </div>
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-sf-orange mb-4">
            Fan Membership
          </p>
          <h1
            className="font-condensed font-black uppercase leading-none mb-5"
            style={{ fontSize: 'clamp(56px, 10vw, 100px)' }}
          >
            <span className="block text-sf-text">Flame</span>
            <span
              className="block"
              style={{
                background: 'linear-gradient(90deg, #FF6A00, #FFB800)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Society
            </span>
          </h1>
          <p className="text-sf-muted text-[16px] font-light max-w-xl mx-auto leading-relaxed">
            The official Solar Flare fan membership. Exclusive access, member perks, and a community of thousands who burn as bright as we do.
          </p>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #060607, transparent)' }}
        />
      </div>

      {/* Perks strip */}
      <section className="max-w-275 mx-auto px-6 md:px-12 py-16">
        <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
          Member Benefits
        </p>
        <h2
          className="font-condensed font-black uppercase leading-none mb-12"
          style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
        >
          Why Join the Society
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5">
          {fanPerks.map((perk) => (
            <div key={perk.title} className="bg-sf-surface p-7 group hover:bg-[#222226] transition-colors duration-200">
              <div className="text-[32px] mb-4">{perk.icon}</div>
              <h3 className="font-condensed font-bold text-[18px] uppercase text-sf-text mb-2">
                {perk.title}
              </h3>
              <p className="text-[13px] text-sf-muted leading-relaxed">
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Membership tiers */}
      <section className="max-w-275 mx-auto px-6 md:px-12 pb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-bold tracking-[0.15em] uppercase text-sf-orange mb-3">
              Choose Your Tier
            </p>
            <h2
              className="font-condensed font-black uppercase leading-none"
              style={{ fontSize: 'clamp(32px, 5vw, 52px)' }}
            >
              Membership Plans
            </h2>
          </div>

          {/* Billing toggle */}
          <div className="flex items-center bg-sf-surface p-1 self-start md:self-auto">
            <button
              onClick={() => setBilling('month')}
              className={`px-5 py-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 ${
                billing === 'month'
                  ? 'bg-sf-orange text-white'
                  : 'text-sf-muted hover:text-sf-text'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBilling('year')}
              className={`px-5 py-2 text-[11px] font-bold tracking-widest uppercase transition-all duration-200 flex items-center gap-2 ${
                billing === 'year'
                  ? 'bg-sf-orange text-white'
                  : 'text-sf-muted hover:text-sf-text'
              }`}
            >
              Annual
              <span className="text-[9px] bg-green-500/20 text-green-400 px-1.5 py-0.5 font-black tracking-wider">
                -20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {membershipTiers.map((tier) => (
            <TierCard key={tier.id} tier={tier} billing={billing} />
          ))}
        </div>

        {/* Reassurance strip */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-[12px] text-sf-muted">
          {[
            '✓ Cancel anytime',
            '✓ No hidden fees',
            '✓ Instant access on signup',
            '✓ Secure payment',
          ].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>

      {/* Community CTA banner */}
      <div className="border-t border-sf-border">
        <div className="max-w-275 mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3
              className="font-condensed font-black uppercase leading-none text-sf-text mb-3"
              style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
            >
              Already a Member?
            </h3>
            <p className="text-sf-muted text-[14px] max-w-md leading-relaxed">
              Head to the Flame Society Discord and connect with the community. Your role and perks are waiting.
            </p>
          </div>
          <button
            className="shrink-0 px-10 py-4 text-[12px] font-bold tracking-[0.14em] uppercase border border-white/20 text-sf-text hover:border-sf-orange hover:text-sf-orange transition-all duration-200 whitespace-nowrap"
          >
            Open Discord →
          </button>
        </div>
      </div>
    </div>
  )
}