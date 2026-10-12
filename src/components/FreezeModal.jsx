import React, { useState } from 'react';
import { useClubStore } from '../store/useClubStore';
import { X, Snowflake, CheckCircle, AlertTriangle, PlayCircle } from 'lucide-react';

export const FreezeModal = ({ subscription, onClose }) => {
  const { freezeSubscription, unfreezeSubscription } = useClubStore();
  const [days, setDays] = useState(14);
  const [reason, setReason] = useState("Ta'til / Sayohat");

  const isCurrentlyFrozen = subscription.status === 'frozen';

  const handleFreeze = () => {
    freezeSubscription(subscription.id, days);
    onClose();
  };

  const handleUnfreeze = () => {
    unfreezeSubscription(subscription.id);
    onClose();
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
          maxWidth: '480px',
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border-medium)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--color-bg-tertiary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isCurrentlyFrozen ? 'var(--color-success-bg)' : 'rgba(56, 189, 248, 0.15)',
                color: isCurrentlyFrozen ? 'var(--color-success)' : '#38BDF8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {isCurrentlyFrozen ? <PlayCircle size={20} /> : <Snowflake size={20} />}
            </div>
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {isCurrentlyFrozen ? 'Obunani qayta faollashtirish' : 'Obunani vaqtincha muzlatish'}
              </h3>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                {subscription.planName} tarifi
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {isCurrentlyFrozen ? (
            <div>
              <div
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'rgba(56, 189, 248, 0.1)',
                  border: '1px solid rgba(56, 189, 248, 0.3)',
                  marginBottom: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38BDF8', fontWeight: 600, marginBottom: '6px' }}>
                  <Snowflake size={18} />
                  <span>Obuna hozir muzlatilgan holatda</span>
                </div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  Muzlatilgan vaqt hisobga olinib, obunangizning amal qilish muddati avtomatik ravishda uzaytiriladi. Mashg'ulotlarga qaytishga tayyormisiz?
                </p>
              </div>

              <button
                onClick={handleUnfreeze}
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-success)',
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                }}
              >
                <CheckCircle size={18} />
                Obunani darhol ochish va faollashtirish
              </button>
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '16px',
                  fontSize: '0.875rem',
                }}
              >
                <span style={{ color: 'var(--color-text-secondary)' }}>Mavjud muzlatish limiti:</span>
                <span style={{ fontWeight: 700, color: 'var(--color-accent)' }}>
                  {subscription.remainingFreezeDays} kun qoldi
                </span>
              </div>

              {subscription.remainingFreezeDays <= 0 ? (
                <div style={{ textAlign: 'center', padding: '20px 0', color: 'var(--color-error)' }}>
                  <AlertTriangle size={32} style={{ margin: '0 auto 8px auto' }} />
                  <p style={{ fontWeight: 600 }}>Siz bu yilgi barcha muzlatish kunlaringizdan foydalanib bo'ldingiz.</p>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px', display: 'block' }}>
                      Muzlatish muddati: <strong style={{ color: 'var(--color-accent)' }}>{days} kun</strong>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={subscription.remainingFreezeDays}
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                      style={{
                        width: '100%',
                        accentColor: 'var(--color-accent)',
                        cursor: 'pointer',
                      }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                      <span>1 kun</span>
                      <span>{Math.floor(subscription.remainingFreezeDays / 2)} kun</span>
                      <span>{subscription.remainingFreezeDays} kun</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '8px', display: 'block' }}>
                      Sabab (ixtiyoriy):
                    </label>
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      <option value="Ta'til / Sayohat">Ta'til / Sayohat</option>
                      <option value="Xizmat safari">Xizmat safari</option>
                      <option value="Sog'liq / Vaqtinchalik dam olish">Sog'liq / Vaqtinchalik dam olish</option>
                      <option value="Boshqa sabab">Boshqa sabab</option>
                    </select>
                  </div>

                  <button
                    onClick={handleFreeze}
                    style={{
                      width: '100%',
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: '#38BDF8',
                      color: '#0A0D12',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    <Snowflake size={18} />
                    {days} kunga muzlatishni tasdiqlash
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
