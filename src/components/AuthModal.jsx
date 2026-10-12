import React, { useState } from 'react';
import { useClubStore } from '../store/useClubStore';
import { X, Lock, Mail, Phone, User, CheckCircle2, ArrowRight } from 'lucide-react';

export const AuthModal = ({ onClose }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [password, setPassword] = useState('');

  const { registerUser, loginUser } = useClubStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      if (!fullName.trim() || !phone.trim()) return;
      registerUser({ fullName, email: email || `${Date.now()}@apex.uz`, phone });
      onClose();
    } else {
      const identifier = email || phone;
      if (!identifier.trim()) return;
      const ok = loginUser(identifier);
      if (ok) onClose();
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
          maxWidth: '440px',
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
            backgroundColor: 'var(--color-bg-tertiary)',
          }}
        >
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {isRegister ? "Klub a'zoligiga ro'yxatdan o'tish" : "Shaxsiy kabinetga kirish"}
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
              APEX FITNESS CLUB Toshkent
            </p>
          </div>
          <button onClick={onClose} style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isRegister && (
            <div>
              <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                F.I.SH (To'liq ismingiz):
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
                <input
                  type="text"
                  placeholder="Azamat Qodirov"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 36px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
              Telefon raqamingiz:
            </label>
            <div style={{ position: 'relative' }}>
              <Phone size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="text"
                placeholder="+998 90 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border-subtle)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
              Elektron pochta (ixtiyoriy):
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="email"
                placeholder="example@mail.uz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border-subtle)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
              Parol:
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px 10px 36px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border-subtle)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-accent)',
              color: 'var(--color-accent-contrast)',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              marginTop: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            {isRegister ? "A'zo bo'lish va kabinetga kirish" : "Tizimga kirish"}
            <ArrowRight size={16} />
          </button>

          {/* Toggle Register / Login */}
          <div style={{ textAlign: 'center', marginTop: '8px', fontSize: '0.8125rem' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>
              {isRegister ? "Hisobingiz bormi? " : "Hali hisobingiz yo'qmi? "}
            </span>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              style={{
                color: 'var(--color-accent)',
                fontWeight: 700,
                textDecoration: 'underline',
                cursor: 'pointer',
              }}
            >
              {isRegister ? "Kirish" : "Ro'yxatdan o'tish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
