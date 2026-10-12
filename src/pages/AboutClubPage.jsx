import React, { useState } from 'react';
import { clubInfo } from '../content/club';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Check,
  Wind,
  Layers,
  Flame,
  Award,
  ArrowRight,
} from 'lucide-react';

export const AboutClubPage = () => {
  const [selectedFacility, setSelectedFacility] = useState(clubInfo.facilities[0]);

  return (
    <div style={{ padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '720px', marginBottom: '48px' }}>
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
              2 500 m² Premium Standart
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
            APEX Fitness Infratuzilmasi
          </h1>

          <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            {clubInfo.description}
          </p>
        </div>

        {/* 3 Pillars / Standards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '64px',
          }}
        >
          <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-xl)' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-accent-muted)',
                color: 'var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Layers size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
              3 Qavatli Majmua
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              1-qavat: Keng kiyinish xonalari, Fin saunasi va SPA.
              2-qavat: Asosiy Technogym og'ir toshlar va kardio zonasi.
              3-qavat: Krossfit arenasi, boks ringi va tinch yoga studiyasi.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-xl)' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(0, 240, 255, 0.15)',
                color: '#00F0FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Wind size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
              Iqlim va Havo Almashinuvi
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Germaniyaning Wolf ventilyatsiya tizimi va HEPA-13 filtrlari.
              Har soatda havoni 8 marta 100% yangilab turadi, zalda doim toza va kislorodga boy muhit.
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '28px', borderRadius: 'var(--radius-xl)' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                color: '#F59E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
              Xavfsizlik va Gigiyena
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Biometrik turniketlar, videokuzatuv tizimi va doimiy dezinfeksiya.
              Har bir a'zoga antibakterial toza sochiq va shaxsiy raqamli qulflanuvchi shkafcha taqdim etiladi.
            </p>
          </div>
        </div>

        {/* Interactive Facilities Showcase */}
        <div>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Zallar va Hududlar bo'yicha Tanishuv</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Quyidagi hududlardan birini tanlang va uning imkoniyatlarini ko'ring:
            </p>
          </div>

          {/* Facility Buttons Tabs */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px', marginBottom: '24px' }}>
            {clubInfo.facilities.map((fac) => {
              const isSelected = selectedFacility.id === fac.id;
              return (
                <button
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                    color: isSelected ? 'var(--color-accent-contrast)' : 'var(--color-text-primary)',
                    border: isSelected ? '1px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {fac.title}
                </button>
              );
            })}
          </div>

          {/* Detailed Selected Facility Preview Box */}
          <div
            className="glass-panel"
            style={{
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            }}
          >
            <div style={{ height: '380px' }}>
              <img
                src={selectedFacility.image}
                alt={selectedFacility.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                PREMIUM MASHG'ULOT MAYDONI
              </span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                {selectedFacility.title}
              </h3>
              <p style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {selectedFacility.description}
              </p>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <Link
                  to="/tariflar"
                  style={{
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-contrast)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  A'zolik olish <ArrowRight size={14} />
                </Link>
                <Link
                  to="/jadval"
                  style={{
                    padding: '12px 24px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                  }}
                >
                  Darslar jadvali
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
