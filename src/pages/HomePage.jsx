import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { clubInfo } from '../content/club';
import { membershipPlans } from '../content/plans';
import { clubTrainers } from '../content/trainers';
import { clubReviews, clubFAQs } from '../content/reviews';
import { useClubStore } from '../store/useClubStore';
import { CheckoutModal } from '../components/CheckoutModal';
import { BookClassModal } from '../components/BookClassModal';
import {
  Dumbbell,
  Check,
  Star,
  Users,
  Clock,
  Sparkles,
  ShieldCheck,
  Heart,
  ChevronDown,
  ArrowRight,
  Zap,
} from 'lucide-react';

export const HomePage = () => {
  const { classes } = useClubStore();
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState(null);
  const [selectedSessionForBooking, setSelectedSessionForBooking] = useState(null);
  const [activeFaqId, setActiveFaqId] = useState(clubFAQs[0].id);
  const [billingCycle, setBillingCycle] = useState('quarterly');

  const todayClasses = classes.slice(0, 4);

  const formatPrice = (val) => {
    return new Intl.NumberFormat('uz-UZ').format(val) + " so'm";
  };

  return (
    <div>
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section
        style={{
          position: 'relative',
          paddingTop: '64px',
          paddingBottom: '80px',
          overflow: 'hidden',
          background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(204, 255, 0, 0.15), rgba(10, 13, 18, 0))',
        }}
      >
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-medium)',
              marginBottom: '24px',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-accent)',
                boxShadow: '0 0 8px var(--color-accent)',
              }}
            />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Toshkentdagi eng zamonaviy fitnes markazi
            </span>
          </div>

          <div style={{ maxWidth: '880px' }}>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
                fontWeight: 800,
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '24px',
              }}
            >
              O'Z POTENTSIALINGNI OCH VA{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, var(--color-accent) 0%, #00F0FF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                YANGI DARAJAGA
              </span>{' '}
              KO'TARIL
            </h1>

            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: 1.6,
                color: 'var(--color-text-secondary)',
                marginBottom: '36px',
                maxWidth: '680px',
              }}
            >
              2 500 m² maydon, Technogym uskunalari, 24+ xalqaro chempion murabbiylar,
              krossfit, yoga, boks va tiklanish saunalari. Birinchi qadamni hoziroq qo'ying!
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
              <Link
                to="/tariflar"
                style={{
                  padding: '16px 32px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-contrast)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: 'var(--shadow-glow)',
                }}
              >
                A'zolik tariflari
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/jadval"
                style={{
                  padding: '16px 28px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-medium)',
                  color: 'var(--color-text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                Darslar jadvali
              </Link>
            </div>
          </div>

          {/* Stat Badges Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px',
              marginTop: '64px',
            }}
          >
            {clubInfo.stats.map((stat, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '2rem',
                    fontWeight: 800,
                    color: 'var(--color-accent)',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          NEGA AYNAN APEX SECTION
          ========================================================================= */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 56px auto' }}>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-accent)',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Afzalliklarimiz
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
              Nega Toshkentdagi minglab insonlar APEX klubini tanlaydi?
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              {
                icon: <Zap size={24} />,
                title: 'Italiyaning Technogym uskunalari',
                desc: "Eng so'nggi avlod biometrik trenajyorlar mashg'ulot davomida mushaklar zo'riqishi va xavfsizligini ta'minlaydi.",
              },
              {
                icon: <Users size={24} />,
                title: 'Xalqaro toifadagi murabbiylar',
                desc: 'IFBB, CrossFit L2 va Yoga Alliance sertifikatiga ega, chempionlik unvonlariga ega 24 nafardan ortiq instruktorlar.',
              },
              {
                icon: <Clock size={24} />,
                title: 'Moslashuvchan va qulay vaqt',
                desc: 'Haftaning har kuni ertalab 06:00 dan tuni 23:00 gacha ochiq. VIP a\'zolar uchun 24/7 erkin kirish imkoni.',
              },
              {
                icon: <Heart size={24} />,
                title: 'Tiklanish va SPA kompleksi',
                desc: "Mashg'ulotdan so'ng mushaklarni dam oldirish va toksinlarni chiqarish uchun Fin saunasi va gidromassaj.",
              },
            ].map((feat, i) => (
              <div
                key={i}
                className="glass-panel"
                style={{
                  padding: '32px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-accent-muted)',
                    color: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {feat.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  {feat.title}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MASHG'ULOT ZONALARI (FACILITIES)
          ========================================================================= */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ maxWidth: '580px' }}>
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-accent)',
                  marginBottom: '8px',
                  display: 'block',
                }}
              >
                Klub Maydonlari
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800 }}>
                Har bir maqsad uchun maxsus ixtisoslashgan zonalar
              </h2>
            </div>
            <Link
              to="/jadval"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-accent)',
                fontWeight: 700,
                fontSize: '0.9375rem',
              }}
            >
              Barcha darslar jadvalini ko'rish <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {clubInfo.facilities.map((fac) => (
              <div
                key={fac.id}
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                  <img
                    src={fac.image}
                    alt={fac.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10, 13, 18, 0.8) 0%, transparent 60%)',
                    }}
                  />
                </div>

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                    {fac.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, flex: 1 }}>
                    {fac.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          TODAY'S CLASSES PREVIEW
          ========================================================================= */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-accent)',
                  marginBottom: '8px',
                  display: 'block',
                }}
              >
                Jonli Mashg'ulotlar
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800 }}>
                Bugungi guruh darslariga qo'shiling
              </h2>
            </div>
            <Link
              to="/jadval"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-subtle)',
                color: 'var(--color-text-primary)',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              To'liq haftalik jadval <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '20px',
            }}
          >
            {todayClasses.map((cls) => (
              <div
                key={cls.id}
                className="glass-panel"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-accent-muted)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {cls.categoryLabel}
                  </span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
                    {cls.startTime} – {cls.endTime}
                  </span>
                </div>

                <div>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '6px' }}>
                    {cls.title}
                  </h4>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                    {cls.room} • {cls.level}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <img
                    src={cls.trainerAvatar}
                    alt={cls.trainerName}
                    style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {cls.trainerName}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSessionForBooking(cls)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-accent-contrast)',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Yozilish
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          PRICING & MEMBERSHIP PLANS
          ========================================================================= */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-accent)',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              A'zolik Tariflari
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '20px' }}>
              O'zingizga mos a'zolik paketini tanlang
            </h2>

            {/* Billing Cycle Pill Toggle */}
            <div
              style={{
                display: 'inline-flex',
                padding: '4px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border-subtle)',
                gap: '4px',
              }}
            >
              <button
                onClick={() => setBillingCycle('monthly')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: billingCycle === 'monthly' ? 700 : 500,
                  backgroundColor: billingCycle === 'monthly' ? 'var(--color-accent)' : 'transparent',
                  color: billingCycle === 'monthly' ? 'var(--color-accent-contrast)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                }}
              >
                1 Oylik
              </button>

              <button
                onClick={() => setBillingCycle('quarterly')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: billingCycle === 'quarterly' ? 700 : 500,
                  backgroundColor: billingCycle === 'quarterly' ? 'var(--color-accent)' : 'transparent',
                  color: billingCycle === 'quarterly' ? 'var(--color-accent-contrast)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                  position: 'relative',
                }}
              >
                3 Oylik (-15%)
              </button>

              <button
                onClick={() => setBillingCycle('annual')}
                style={{
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: billingCycle === 'annual' ? 700 : 500,
                  backgroundColor: billingCycle === 'annual' ? 'var(--color-accent)' : 'transparent',
                  color: billingCycle === 'annual' ? 'var(--color-accent-contrast)' : 'var(--color-text-secondary)',
                  cursor: 'pointer',
                }}
              >
                Yillik (-25%)
              </button>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
              gap: '24px',
              alignItems: 'stretch',
            }}
          >
            {membershipPlans.map((plan) => {
              let displayPrice = plan.priceMonthly;
              let suffix = '/ oy';
              if (billingCycle === 'quarterly') {
                displayPrice = Math.round(plan.priceQuarterly / 3);
                suffix = "/ oy (3 oylik to'lovda)";
              } else if (billingCycle === 'annual') {
                displayPrice = Math.round(plan.priceYearly / 12);
                suffix = "/ oy (yillik to'lovda)";
              }

              return (
                <div
                  key={plan.id}
                  style={{
                    backgroundColor: 'var(--color-bg-primary)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '36px 30px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    border: plan.isPopular
                      ? '2px solid var(--color-accent)'
                      : '1px solid var(--color-border-subtle)',
                    boxShadow: plan.isPopular ? 'var(--shadow-glow)' : 'var(--shadow-md)',
                  }}
                >
                  {plan.isPopular && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '-14px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: 'var(--color-accent)',
                        color: 'var(--color-accent-contrast)',
                        padding: '4px 16px',
                        borderRadius: 'var(--radius-full)',
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      ENG OMMABOP TANLOV
                    </div>
                  )}

                  <div style={{ marginBottom: '20px' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: 'var(--color-text-primary)',
                        marginBottom: '6px',
                      }}
                    >
                      {plan.name}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', minHeight: '38px' }}>
                      {plan.tagline}
                    </p>
                  </div>

                  <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.25rem',
                        fontWeight: 800,
                        color: 'var(--color-text-primary)',
                        lineHeight: 1,
                      }}
                    >
                      {formatPrice(displayPrice)}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                      {suffix}
                    </div>
                  </div>

                  {/* Feature list */}
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      marginBottom: '32px',
                      flex: 1,
                    }}
                  >
                    {plan.features.map((feat, i) => (
                      <li
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '0.875rem',
                          color: feat.included ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
                          opacity: feat.included ? 1 : 0.45,
                        }}
                      >
                        <div
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            backgroundColor: feat.included
                              ? feat.highlight
                                ? 'var(--color-accent)'
                                : 'var(--color-accent-muted)'
                              : 'transparent',
                            color: feat.included
                              ? feat.highlight
                                ? 'var(--color-accent-contrast)'
                                : 'var(--color-accent)'
                              : 'var(--color-text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        >
                          <Check size={12} strokeWidth={3} />
                        </div>
                        <span style={{ fontWeight: feat.highlight ? 600 : 400 }}>{feat.text}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setSelectedPlanForCheckout(plan)}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: plan.isPopular ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                      color: plan.isPopular ? 'var(--color-accent-contrast)' : 'var(--color-text-primary)',
                      border: plan.isPopular ? 'none' : '1px solid var(--color-border-medium)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '0.9375rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: plan.isPopular ? 'var(--shadow-glow)' : 'none',
                    }}
                  >
                    Ushbu tarifni tanlash
                    <ArrowRight size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          COACHES SECTION
          ========================================================================= */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ maxWidth: '600px' }}>
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: 'var(--color-accent)',
                  marginBottom: '8px',
                  display: 'block',
                }}
              >
                Professional Jamoa
              </span>
              <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800 }}>
                Chempionlar murabbiyligida mashg'ulot qiling
              </h2>
            </div>
            <Link
              to="/murabbiylar"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--color-accent)',
                fontWeight: 700,
                fontSize: '0.9375rem',
              }}
            >
              Barcha murabbiylar bilan tanishish <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px',
            }}
          >
            {clubTrainers.slice(0, 4).map((trainer) => (
              <div
                key={trainer.id}
                className="glass-panel"
                style={{
                  borderRadius: 'var(--radius-xl)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div style={{ height: '280px', position: 'relative' }}>
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      backgroundColor: 'rgba(10, 13, 18, 0.8)',
                      backdropFilter: 'blur(8px)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#F59E0B',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    <Star size={12} fill="#F59E0B" />
                    <span>{trainer.rating.toFixed(1)} ({trainer.reviewCount} sharh)</span>
                  </div>
                </div>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
                    {trainer.name}
                  </h4>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '12px' }}>
                    {trainer.role}
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: '16px', flex: 1 }}>
                    {trainer.bio.slice(0, 100)}...
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {trainer.specialties.slice(0, 2).map((sp, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.6875rem',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--color-bg-tertiary)',
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {sp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          REVIEWS & TRANSFORMATIONS
          ========================================================================= */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-accent)',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Mijozlarimiz Natijalari
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)', fontWeight: 800 }}>
              Haqiqiy insonlar. Haqiqiy o'zgarishlar.
            </h2>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {clubReviews.map((rev) => (
              <div
                key={rev.id}
                className="glass-panel"
                style={{
                  padding: '28px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                {rev.resultBadge && (
                  <div
                    style={{
                      alignSelf: 'flex-start',
                      backgroundColor: 'var(--color-accent-muted)',
                      color: 'var(--color-accent)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                    }}
                  >
                    ★ {rev.resultBadge}
                  </div>
                )}

                <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: 'var(--color-text-secondary)', flex: 1, fontStyle: 'italic' }}>
                  "{rev.comment}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <img
                    src={rev.avatar}
                    alt={rev.authorName}
                    style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {rev.authorName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {rev.authorRole}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ ACCORDION
          ========================================================================= */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '840px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-accent)',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              Ko'p beriladigan savollar
            </span>
            <h2 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', fontWeight: 800 }}>
              Sizni qiziqtirgan savollarga javoblar
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {clubFAQs.map((faq) => {
              const isOpen = activeFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    backgroundColor: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border-subtle)',
                    overflow: 'hidden',
                  }}
                >
                  <button
                    onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      cursor: 'pointer',
                      gap: '16px',
                    }}
                  >
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.2s',
                        color: isOpen ? 'var(--color-accent)' : 'var(--color-text-muted)',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 20px 24px', color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          MODALS
          ========================================================================= */}
      {selectedPlanForCheckout && (
        <CheckoutModal
          plan={selectedPlanForCheckout}
          initialCycle={billingCycle}
          onClose={() => setSelectedPlanForCheckout(null)}
        />
      )}

      {selectedSessionForBooking && (
        <BookClassModal
          session={selectedSessionForBooking}
          onClose={() => setSelectedSessionForBooking(null)}
        />
      )}
    </div>
  );
};
