import React from 'react';
import { Link } from 'react-router-dom';
import { clubInfo } from '../content/club';
import { Dumbbell, Phone, Mail, MapPin, Clock, Send, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--color-border-subtle)',
        paddingTop: '64px',
        paddingBottom: '32px',
        marginTop: '80px',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, var(--color-accent) 0%, #00F0FF 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0A0D12',
                }}
              >
                <Dumbbell size={22} strokeWidth={2.4} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.25rem',
                  letterSpacing: '-0.02em',
                }}
              >
                APEX <span style={{ color: 'var(--color-accent)' }}>FITNESS</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '20px' }}>
              {clubInfo.description}
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={clubInfo.contacts.instagram}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-primary)',
                }}
                title="Instagram sahifamiz"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`https://t.me/${clubInfo.contacts.supportTelegram.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-text-primary)',
                }}
                title="Telegram qo'llab-quvvatlash"
              >
                <Send size={18} />
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              Tezkor havolalar
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <Link to="/" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Asosiy sahifa
                </Link>
              </li>
              <li>
                <Link to="/jadval" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Guruh mashg'ulotlari jadvali
                </Link>
              </li>
              <li>
                <Link to="/tariflar" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  A'zolik tariflari va narxlar
                </Link>
              </li>
              <li>
                <Link to="/murabbiylar" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Professional murabbiylar jamoasi
                </Link>
              </li>
              <li>
                <Link to="/kabinet" style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  Shaxsiy a'zo kabineti
                </Link>
              </li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              Ish vaqtlari
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Clock size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Dushanba – Juma</div>
                  <div style={{ color: 'var(--color-text-muted)' }}>06:00 – 23:00</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Clock size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Shanba</div>
                  <div style={{ color: 'var(--color-text-muted)' }}>07:00 – 22:00</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <Clock size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>Yakshanba</div>
                  <div style={{ color: 'var(--color-text-muted)' }}>08:00 – 21:00</div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Col */}
          <div>
            <h4
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: '16px',
                letterSpacing: '-0.01em',
              }}
            >
              Biz bilan bog'lanish
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <MapPin size={18} style={{ color: 'var(--color-accent)', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'var(--color-text-secondary)' }}>
                  {clubInfo.contacts.address} ({clubInfo.contacts.landmark})
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <a
                  href={`tel:${clubInfo.contacts.phoneClean}`}
                  style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}
                >
                  {clubInfo.contacts.phone}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                <a href={`mailto:${clubInfo.contacts.email}`} style={{ color: 'var(--color-text-secondary)' }}>
                  {clubInfo.contacts.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid var(--color-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
            fontSize: '0.8125rem',
            color: 'var(--color-text-muted)',
          }}
        >
          <div>
            © {new Date().getFullYear()} {clubInfo.name}. Barcha huquqlar himoyalangan.
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Maxfiylik siyosati</span>
            <span>Ommaviy oferta</span>
            <span>Qoidalar va xavfsizlik</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
