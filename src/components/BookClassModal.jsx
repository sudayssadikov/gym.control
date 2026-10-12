import React, { useState } from 'react';
import { useClubStore } from '../store/useClubStore';
import { X, Calendar, Clock, MapPin, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const BookClassModal = ({ session, onClose, onSuccess }) => {
  const { currentUser, subscriptions, bookClass } = useClubStore();
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [errorMsg, setErrorMsg] = useState(null);

  const activeSub = currentUser
    ? subscriptions.find((s) => s.userId === currentUser.id && s.status === 'active')
    : null;

  const isFull = session.bookedCount >= session.capacity;

  const handleBooking = () => {
    setErrorMsg(null);
    const res = bookClass(session.id, date);
    if (!res.success) {
      setErrorMsg(res.message);
    } else {
      onSuccess?.();
      onClose();
    }
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
          maxWidth: '460px',
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
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
              Mashg'ulotga yozilish
            </h3>
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--color-accent)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {session.categoryLabel}
            </span>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: 'var(--color-text-primary)',
                marginBottom: '8px',
              }}
            >
              {session.title}
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              {session.description}
            </p>
          </div>

          {/* Session Details Box */}
          <div
            style={{
              padding: '14px',
              backgroundColor: 'var(--color-bg-tertiary)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              fontSize: '0.875rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <User size={16} style={{ color: 'var(--color-accent)' }} />
              <span style={{ color: 'var(--color-text-secondary)' }}>Murabbiy:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{session.trainerName}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Clock size={16} style={{ color: 'var(--color-accent)' }} />
              <span style={{ color: 'var(--color-text-secondary)' }}>Vaqti:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                {session.dayName}, {session.startTime} – {session.endTime}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MapPin size={16} style={{ color: 'var(--color-accent)' }} />
              <span style={{ color: 'var(--color-text-secondary)' }}>Xona:</span>
              <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{session.room}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ color: 'var(--color-text-secondary)' }}>Mavjud o'rinlar:</span>
              <span
                style={{
                  fontWeight: 700,
                  color: isFull ? 'var(--color-error)' : 'var(--color-success)',
                }}
              >
                {session.capacity - session.bookedCount} ta bo'sh ({session.bookedCount}/{session.capacity})
              </span>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px', display: 'block' }}>
              Mashg'ulot sanasi:
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border-subtle)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'inherit',
                }}
              />
            </div>
          </div>

          {/* Error Message if any */}
          {errorMsg && (
            <div
              style={{
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-error-bg)',
                border: '1px solid var(--color-error)',
                color: 'var(--color-error)',
                fontSize: '0.8125rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* User Status Prompt */}
          {!currentUser ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                Mashg'ulotga yozilish uchun a'zolik akkauntingiz bo'lishi kerak.
              </p>
              <Link
                to="/tariflar"
                onClick={onClose}
                style={{
                  display: 'inline-block',
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}
              >
                Tariflar bilan tanishish →
              </Link>
            </div>
          ) : !activeSub && currentUser.role !== 'admin' ? (
            <div style={{ textAlign: 'center', padding: '8px 0' }}>
              <p style={{ fontSize: '0.8125rem', color: '#F59E0B', marginBottom: '8px' }}>
                Diqqat: Sizning hisobingizda faol a'zolik obunasi mavjud emas.
              </p>
              <Link
                to="/tariflar"
                onClick={onClose}
                style={{
                  display: 'inline-block',
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                }}
              >
                A'zolikni faollashtirish →
              </Link>
            </div>
          ) : null}

          {/* Submit Button */}
          <button
            onClick={handleBooking}
            disabled={isFull}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: isFull ? 'var(--color-bg-elevated)' : 'var(--color-accent)',
              color: isFull ? 'var(--color-text-muted)' : 'var(--color-accent-contrast)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: isFull ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: isFull ? 'none' : 'var(--shadow-glow)',
            }}
          >
            <CheckCircle2 size={18} />
            {isFull ? 'Barcha joylar band' : 'Yozilishni tasdiqlash'}
          </button>
        </div>
      </div>
    </div>
  );
};
