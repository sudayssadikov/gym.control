import React, { useState } from 'react';
import { useClubStore } from '../store/useClubStore';
import { X, Check, ShieldCheck, CreditCard, Sparkles, Smartphone } from 'lucide-react';

export const CheckoutModal = ({
  plan,
  initialCycle = 'quarterly',
  onClose,
  onSuccess,
}) => {
  const [cycle, setCycle] = useState(initialCycle);
  const [paymentMethod, setPaymentMethod] = useState('Payme');
  const [isProcessing, setIsProcessing] = useState(false);

  const { buySubscription, currentUser } = useClubStore();

  let price = plan.priceMonthly;
  let periodText = '1 oylik obuna';
  let savings = 0;

  if (cycle === 'quarterly') {
    price = plan.priceQuarterly;
    periodText = '3 oylik obuna';
    savings = plan.priceMonthly * 3 - plan.priceQuarterly;
  } else if (cycle === 'annual') {
    price = plan.priceYearly;
    periodText = "12 oylik to'liq yillik obuna";
    savings = plan.priceMonthly * 12 - plan.priceYearly;
  }

  const formatPrice = (val) => {
    return new Intl.NumberFormat('uz-UZ').format(val) + " so'm";
  };

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const ok = buySubscription(plan.id, cycle, paymentMethod);
      setIsProcessing(false);
      if (ok) {
        onSuccess?.();
        onClose();
      }
    }, 700);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        padding: '16px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border-medium)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '24px 28px',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-bg-tertiary)',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  color: 'var(--color-text-primary)',
                }}
              >
                {plan.name}
              </span>
              <span
                style={{
                  backgroundColor: 'var(--color-accent-muted)',
                  color: 'var(--color-accent)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                }}
              >
                A'zolik
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              {plan.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Cycle Selector */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px', display: 'block' }}>
              To'lov davrini tanlang:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setCycle('monthly')}
                style={{
                  padding: '10px 8px',
                  borderRadius: 'var(--radius-md)',
                  border: cycle === 'monthly' ? '2px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
                  backgroundColor: cycle === 'monthly' ? 'var(--color-accent-muted)' : 'var(--color-bg-tertiary)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>1 Oylik</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>Standart</div>
              </button>

              <button
                type="button"
                onClick={() => setCycle('quarterly')}
                style={{
                  padding: '10px 8px',
                  borderRadius: 'var(--radius-md)',
                  border: cycle === 'quarterly' ? '2px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
                  backgroundColor: cycle === 'quarterly' ? 'var(--color-accent-muted)' : 'var(--color-bg-tertiary)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>3 Oylik</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600, marginTop: '2px' }}>
                  15% tejamkor
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCycle('annual')}
                style={{
                  padding: '10px 8px',
                  borderRadius: 'var(--radius-md)',
                  border: cycle === 'annual' ? '2px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
                  backgroundColor: cycle === 'annual' ? 'var(--color-accent-muted)' : 'var(--color-bg-tertiary)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>1 Yillik</div>
                <div style={{ fontSize: '0.75rem', color: '#00F0FF', fontWeight: 600, marginTop: '2px' }}>
                  25% tejamkor
                </div>
              </button>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px', display: 'block' }}>
              To'lov usulini tanlang:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {['Payme', 'Click', 'Uzum Bank', 'Karta orqali'].map((method) => {
                const isSelected = paymentMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected ? '2px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
                      backgroundColor: isSelected ? 'var(--color-accent-muted)' : 'var(--color-bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <div
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-bg-elevated)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isSelected ? 'var(--color-accent)' : 'var(--color-text-muted)',
                      }}
                    >
                      {method === 'Karta orqali' ? <CreditCard size={16} /> : <Smartphone size={16} />}
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {method}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pricing Summary Card */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: 'var(--color-bg-tertiary)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Muddati:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{periodText}</span>
            </div>
            {savings > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--color-accent)' }}>Tejamkorlik bonusi:</span>
                <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>-{formatPrice(savings)}</span>
              </div>
            )}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingTop: '10px',
                borderTop: '1px dashed var(--color-border-medium)',
                alignItems: 'baseline',
              }}
            >
              <span style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>Jami to'lov:</span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--color-accent)',
                }}
              >
                {formatPrice(price)}
              </span>
            </div>
          </div>

          {/* Confirmation Notice */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            <ShieldCheck size={16} style={{ color: 'var(--color-success)', flexShrink: 0 }} />
            <span>Xavfsiz tranzaksiya. Obuna to'lov amalga oshishi bilan darhol faollashadi.</span>
          </div>

          {/* Action Button */}
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-accent-contrast)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: isProcessing ? 'wait' : 'pointer',
              opacity: isProcessing ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            {isProcessing ? "To'lov tekshirilmoqda..." : `${paymentMethod} orqali to'lash va faollashtirish`}
          </button>
        </div>
      </div>
    </div>
  );
};
