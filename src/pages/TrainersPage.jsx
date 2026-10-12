import React, { useState } from 'react';
import { clubTrainers } from '../content/trainers';
import { useClubStore } from '../store/useClubStore';
import {
  Award,
  Star,
  CheckCircle,
  Instagram,
  Send,
  Calendar,
  X,
  Phone,
  User,
} from 'lucide-react';

export const TrainersPage = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [bookingTrainer, setBookingTrainer] = useState(null);
  const [sessionDate, setSessionDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const { addToast } = useClubStore();

  const specialtiesList = [
    { key: 'all', label: 'Barchasi' },
    { key: 'Bodibilding', label: 'Bodibilding & Kuch' },
    { key: 'Yoga', label: 'Yoga & Pilates' },
    { key: 'CrossFit', label: 'Krossfit & HIIT' },
    { key: 'Boks', label: 'Boks & Jangovar' },
    { key: 'Ayollar fitnesi', label: 'Ayollar fitnesi' },
  ];

  const filteredTrainers = clubTrainers.filter((tr) => {
    if (selectedSpecialty === 'all') return true;
    return tr.specialties.some((s) => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));
  });

  const handlePersonalBooking = (e) => {
    e.preventDefault();
    if (!bookingTrainer) return;

    addToast({
      type: 'success',
      title: "Shaxsiy mashg'ulot so'rovi yuborildi!",
      message: `${bookingTrainer.name} siz bilan tez orada bog'lanadi (${sessionDate})`,
    });
    setBookingTrainer(null);
  };

  return (
    <div style={{ padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '680px', marginBottom: '40px' }}>
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
            <Award size={14} style={{ color: 'var(--color-accent)' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Xalqaro sertifikatlangan murabbiylar
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
            Bizning Murabbiylarimiz
          </h1>

          <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Har bir murabbiyimiz o'z yo'nalishi bo'yicha ko'p yillik tajribaga va nufuzli xalqaro sertifikatlarga ega.
            Maqsadingiz sari ishonchli ustoz bilan qadam tashlang.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '36px' }}>
          {specialtiesList.map((sp) => {
            const active = selectedSpecialty === sp.key;
            return (
              <button
                key={sp.key}
                onClick={() => setSelectedSpecialty(sp.key)}
                style={{
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  backgroundColor: active ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                  color: active ? 'var(--color-accent-contrast)' : 'var(--color-text-secondary)',
                  border: active ? '1px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {sp.label}
              </button>
            );
          })}
        </div>

        {/* Trainer Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredTrainers.map((tr) => (
            <div
              key={tr.id}
              className="glass-panel"
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ position: 'relative', height: '320px' }}>
                <img
                  src={tr.image}
                  alt={tr.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10, 13, 18, 0.85) 0%, transparent 60%)',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '16px',
                    left: '20px',
                    right: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.375rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        marginBottom: '4px',
                      }}
                    >
                      {tr.name}
                    </h3>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-accent)', fontWeight: 600 }}>
                      {tr.role}
                    </div>
                  </div>

                  <div
                    style={{
                      backgroundColor: 'rgba(10, 13, 18, 0.85)',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: '#F59E0B',
                      fontSize: '0.8125rem',
                      fontWeight: 700,
                    }}
                  >
                    <Star size={14} fill="#F59E0B" />
                    <span>{tr.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {tr.bio}
                </p>

                {/* Specialties pills */}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Mutaxassisligi:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {tr.specialties.map((s, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.75rem',
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--color-bg-tertiary)',
                          color: 'var(--color-text-primary)',
                          border: '1px solid var(--color-border-subtle)',
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Yutuqlari va Sertifikatlari:
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {tr.achievements.map((ach, idx) => (
                      <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                        <CheckCircle size={14} style={{ color: 'var(--color-accent)', flexShrink: 0 }} />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--color-border-subtle)' }}>
                  <button
                    onClick={() => setBookingTrainer(tr)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-accent)',
                      color: 'var(--color-accent-contrast)',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '0.9375rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}
                  >
                    Shaxsiy mashg'ulotga yozilish
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Personal Trainer Modal */}
      {bookingTrainer && (
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
          onClick={() => setBookingTrainer(null)}
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
                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Shaxsiy mashg'ulot band qilish
                </h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-accent)' }}>
                  {bookingTrainer.name} bilan
                </p>
              </div>
              <button onClick={() => setBookingTrainer(null)} style={{ color: 'var(--color-text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handlePersonalBooking} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px', display: 'block' }}>
                  Mashg'ulot sanasi:
                </label>
                <input
                  type="date"
                  value={sessionDate}
                  onChange={(e) => setSessionDate(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border-subtle)',
                    color: 'var(--color-text-primary)',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '6px', display: 'block' }}>
                  Maqsadingiz yoki istaklaringiz:
                </label>
                <textarea
                  placeholder="Masalan: Vazn tashlash, tana reliesini chiqarish, orqa umurtqa mashqlari..."
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
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

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-contrast)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginTop: '8px',
                }}
              >
                So'rovni yuborish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
