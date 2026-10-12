import React, { useState } from 'react';
import { clubInfo } from '../content/club';
import { useClubStore } from '../store/useClubStore';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Instagram,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from 'lucide-react';

export const ContactPage = () => {
  const { submitContactInquiry } = useClubStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [goal, setGoal] = useState("Vazn tashlash va qomat to'g'rilash");
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    submitContactInquiry({ name, phone, goal, message });
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '48px' }}>
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
            <MapPin size={14} style={{ color: 'var(--color-accent)' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Mirobod tumani, Toshkent
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            Biz Bilan Bog'laning
          </h1>

          <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Klubga tashrif buyuring, bepul ekskursiyaga yoki sinov mashg'ulotiga yoziling.
            Menejerlarimiz barcha savollaringizga mamnuniyat bilan javob berishadi.
          </p>
        </div>

        {/* 2 Columns: Contact Form & Info Card */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '36px', alignItems: 'flex-start' }}>
          {/* Form */}
          <div className="glass-panel" style={{ padding: '36px', borderRadius: 'var(--radius-xl)' }}>
            <h3 style={{ fontSize: '1.375rem', fontWeight: 800, marginBottom: '6px' }}>
              Sinov mashg'ulotiga yozilish
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              Ma'lumotlaringizni qoldiring, 15 daqiqa ichida qo'ng'iroq qilib, sizga qulay vaqtni band qilamiz.
            </p>

            {submitted ? (
              <div
                style={{
                  padding: '32px 20px',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <CheckCircle2 size={48} style={{ color: 'var(--color-success)', margin: '0 auto 12px auto' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '6px' }}>
                  Rahmat, so'rovingiz qabul qilindi!
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Tez orada operatorimiz siz bilan bog'lanadi.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  style={{
                    marginTop: '20px',
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-contrast)',
                    fontWeight: 700,
                    fontSize: '0.8125rem',
                    cursor: 'pointer',
                  }}
                >
                  Yana so'rov yuborish
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Ismingiz:
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Sardor Aliyev"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-bg-tertiary)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Telefon raqamingiz:
                  </label>
                  <input
                    type="text"
                    placeholder="+998 90 123 45 67"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-bg-tertiary)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-text-primary)',
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Sizni qaysi yo'nalish qiziqtiradi?
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-bg-tertiary)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <option value="Vazn tashlash va qomat to'g'rilash">Vazn tashlash va qomat to'g'rilash</option>
                    <option value="Mushak massasi oshirish (Bodibilding)">Mushak massasi oshirish (Bodibilding)</option>
                    <option value="Krossfit va chidamlilik">Krossfit va chidamlilik</option>
                    <option value="Yoga va pilates">Yoga va pilates</option>
                    <option value="Boks va jangovar san'atlar">Boks va jangovar san'atlar</option>
                    <option value="VIP Shaxsiy murabbiy bilan mashg'ulot">VIP Shaxsiy murabbiy bilan mashg'ulot</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '6px' }}>
                    Qo'shimcha savol yoki istak (ixtiyoriy):
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Masalan: qulay vaqt yoki haftaning ma'lum kuni..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-bg-tertiary)',
                      border: '1px solid var(--color-border-subtle)',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'inherit',
                    }}
                  />
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
                    boxShadow: 'var(--shadow-glow)',
                  }}
                >
                  <Send size={18} /> So'rovni yuborish
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Location Map Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Info panel */}
            <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
                Kontaktlar va Manzil
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9375rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <MapPin size={20} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>Manzil:</div>
                    <div style={{ color: 'var(--color-text-secondary)' }}>
                      {clubInfo.contacts.address}
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '2px' }}>
                      (Mo'ljal: {clubInfo.contacts.landmark})
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Phone size={20} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>Qabulxona telefoni:</div>
                    <a href={`tel:${clubInfo.contacts.phoneClean}`} style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>
                      {clubInfo.contacts.phone}
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <Clock size={20} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '3px' }} />
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>Ish vaqtlari:</div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                      {clubInfo.contacts.workingHours.weekdays}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                      {clubInfo.contacts.workingHours.saturday}
                    </div>
                    <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
                      {clubInfo.contacts.workingHours.sunday}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--color-border-subtle)', display: 'flex', gap: '12px' }}>
                <a
                  href={`https://t.me/${clubInfo.contacts.supportTelegram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                >
                  <Send size={16} style={{ color: '#00F0FF' }} />
                  Telegram
                </a>
                <a
                  href={clubInfo.contacts.instagram}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                >
                  <Instagram size={16} style={{ color: '#F59E0B' }} />
                  Instagram
                </a>
              </div>
            </div>

            {/* Stylized Map View Card */}
            <div
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                position: 'relative',
                height: '240px',
                backgroundImage: 'url("https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1000&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundColor: 'rgba(10, 13, 18, 0.75)',
                  backdropFilter: 'blur(3px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-accent)',
                    color: '#0A0D12',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '12px',
                    boxShadow: 'var(--shadow-glow)',
                  }}
                >
                  <MapPin size={24} />
                </div>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '4px' }}>
                  APEX CLUB Mirobod markazi
                </h4>
                <p style={{ fontSize: '0.8125rem', color: '#94A3B8', maxWidth: '300px' }}>
                  Nukus ko'chasi 42-uy, Grand Mir Hotel va Rossiya elchixonasi qarshisida
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    marginTop: '12px',
                    fontSize: '0.75rem',
                    color: 'var(--color-accent)',
                    fontWeight: 700,
                    textDecoration: 'underline',
                  }}
                >
                  Google Xaritalarda ochish ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
