import React, { useState } from 'react';
import { membershipPlans } from '../content/plans';
import { CheckoutModal } from '../components/CheckoutModal';
import { useClubStore } from '../store/useClubStore';
import {
  Sparkles,
  Check,
  X,
  ShieldCheck,
  Zap,
  ArrowRight,
  Clock,
  HelpCircle,
} from 'lucide-react';

export const PlansPage = () => {
  const [billingCycle, setBillingCycle] = useState('quarterly');
  const [checkoutPlan, setCheckoutPlan] = useState(null);
  const { subscriptions, currentUser } = useClubStore();

  const activeSub = currentUser
    ? subscriptions.find((s) => s.userId === currentUser.id && s.status === 'active')
    : null;

  const formatPrice = (val) => {
    return new Intl.NumberFormat('uz-UZ').format(val) + " so'm";
  };

  return (
    <div style={{ padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px auto' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-subtle)',
              marginBottom: '16px',
            }}
          >
            <Sparkles size={14} style={{ color: 'var(--color-accent)' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Shaffof narxlar va maxsus imtiyozlar
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            A'zolik Tariflari
          </h1>

          <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: '32px' }}>
            O'zingizga qulay to'lov davri va mashg'ulot rejasini tanlang.
            Barcha tariflarimizda xalqaro standartdagi uskunalar va sifatli xizmat kafolatlanadi.
          </p>

          {/* Billing Cycle Switcher */}
          <div
            style={{
              display: 'inline-flex',
              padding: '4px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border-subtle)',
              gap: '4px',
            }}
          >
            <button
              onClick={() => setBillingCycle('monthly')}
              style={{
                padding: '10px 22px',
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
                padding: '10px 22px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: billingCycle === 'quarterly' ? 700 : 500,
                backgroundColor: billingCycle === 'quarterly' ? 'var(--color-accent)' : 'transparent',
                color: billingCycle === 'quarterly' ? 'var(--color-accent-contrast)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
              }}
            >
              3 Oylik (15% tejamkor)
            </button>

            <button
              onClick={() => setBillingCycle('annual')}
              style={{
                padding: '10px 22px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: billingCycle === 'annual' ? 700 : 500,
                backgroundColor: billingCycle === 'annual' ? 'var(--color-accent)' : 'transparent',
                color: billingCycle === 'annual' ? 'var(--color-accent-contrast)' : 'var(--color-text-secondary)',
                cursor: 'pointer',
              }}
            >
              1 Yillik (25% tejamkor)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '72px',
            alignItems: 'stretch',
          }}
        >
          {membershipPlans.map((plan) => {
            let totalPeriodPrice = plan.priceMonthly;
            let displayMonthlyEquivalent = plan.priceMonthly;

            if (billingCycle === 'quarterly') {
              totalPeriodPrice = plan.priceQuarterly;
              displayMonthlyEquivalent = Math.round(plan.priceQuarterly / 3);
            } else if (billingCycle === 'annual') {
              totalPeriodPrice = plan.priceYearly;
              displayMonthlyEquivalent = Math.round(plan.priceYearly / 12);
            }

            const isCurrentActive = activeSub?.planId === plan.id;

            return (
              <div
                key={plan.id}
                style={{
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-xl)',
                  padding: '38px 32px',
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
                      padding: '4px 18px',
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
                      fontSize: '1.625rem',
                      fontWeight: 800,
                      color: 'var(--color-text-primary)',
                      marginBottom: '6px',
                    }}
                  >
                    {plan.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', minHeight: '42px' }}>
                    {plan.tagline}
                  </p>
                </div>

                <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--color-border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: 'var(--color-text-primary)',
                        lineHeight: 1,
                      }}
                    >
                      {formatPrice(displayMonthlyEquivalent)}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>/ oy</span>
                  </div>
                  {billingCycle !== 'monthly' && (
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-accent)', marginTop: '6px', fontWeight: 600 }}>
                      Jami to'lov: {formatPrice(totalPeriodPrice)}
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    marginBottom: '36px',
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
                  onClick={() => setCheckoutPlan(plan)}
                  style={{
                    width: '100%',
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: plan.isPopular ? 'var(--color-accent)' : 'var(--color-bg-tertiary)',
                    color: plan.isPopular ? 'var(--color-accent-contrast)' : 'var(--color-text-primary)',
                    border: plan.isPopular ? 'none' : '1px solid var(--color-border-medium)',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: plan.isPopular ? 'var(--shadow-glow)' : 'none',
                  }}
                >
                  {isCurrentActive ? "Sizning joriy tarifingiz (Yangilash)" : "Ushbu tarifga a'zo bo'lish"}
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Comparison Matrix Table */}
        <div style={{ marginTop: '32px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.75rem',
              fontWeight: 800,
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            Tariflar taqqoslash jadvali
          </h2>

          <div
            style={{
              overflowX: 'auto',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: 'var(--color-bg-secondary)',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--color-border-subtle)', backgroundColor: 'var(--color-bg-tertiary)' }}>
                  <th style={{ padding: '18px 24px', fontWeight: 700, fontSize: '0.9375rem' }}>Xizmat & Imkoniyat</th>
                  <th style={{ padding: '18px 24px', fontWeight: 700, fontSize: '0.9375rem' }}>START</th>
                  <th style={{ padding: '18px 24px', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-accent)' }}>PRO FIT</th>
                  <th style={{ padding: '18px 24px', fontWeight: 700, fontSize: '0.9375rem', color: '#00F0FF' }}>VIP ELITE</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '0.875rem' }}>
                {[
                  { name: 'Klubga kirish vaqtlari', start: '07:00 – 17:00', pro: '06:00 – 23:00 (to\'liq)', vip: '24/7 Cheksiz' },
                  { name: 'Trenajyor va kardio zali', start: 'Cheksiz', pro: 'Cheksiz', vip: 'Cheksiz' },
                  { name: 'Haftalik guruh darslari', start: '3 tagacha', pro: '6 tagacha', vip: 'Cheksiz' },
                  { name: 'Fin saunasi va SPA', start: '—', pro: 'Mavjud', vip: 'Premium sauna + xamam' },
                  { name: 'Shaxsiy murabbiy mashg\'uloti', start: '—', pro: '1 ta kirish darsi', vip: 'Oyiga 4 ta bepul' },
                  { name: 'Obunani bepul muzlatish', start: '14 kun', pro: '30 kun', vip: '60 kun' },
                  { name: 'Sochiq va xalat xizmati', start: '—', pro: 'Toza sochiq', vip: 'VIP xalat & sochiq' },
                  { name: 'InBody tana tarkibi tahlili', start: 'Qo\'shimcha to\'lov', pro: '1 marta', vip: 'Har oyda muntazam' },
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{row.name}</td>
                    <td style={{ padding: '16px 24px', color: 'var(--color-text-secondary)' }}>{row.start}</td>
                    <td style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--color-text-primary)' }}>{row.pro}</td>
                    <td style={{ padding: '16px 24px', fontWeight: 700, color: 'var(--color-text-primary)' }}>{row.vip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {checkoutPlan && (
        <CheckoutModal
          plan={checkoutPlan}
          initialCycle={billingCycle}
          onClose={() => setCheckoutPlan(null)}
        />
      )}
    </div>
  );
};
