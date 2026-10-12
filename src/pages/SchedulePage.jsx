import React, { useState } from 'react';
import { useClubStore } from '../store/useClubStore';
import { BookClassModal } from '../components/BookClassModal';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  User,
  Filter,
  Search,
  CheckCircle2,
  Users,
} from 'lucide-react';

const DAYS = [
  { dayNum: 1, name: 'Dushanba' },
  { dayNum: 2, name: 'Seshanba' },
  { dayNum: 3, name: 'Chorshanba' },
  { dayNum: 4, name: 'Payshanba' },
  { dayNum: 5, name: 'Juma' },
  { dayNum: 6, name: 'Shanba' },
  { dayNum: 0, name: 'Yakshanba' },
];

const CATEGORIES = [
  { key: 'all', label: 'Barcha yo\'nalishlar' },
  { key: 'crossfit', label: 'Krossfit & HIIT' },
  { key: 'yoga', label: 'Yoga & Meditatsiya' },
  { key: 'strength', label: 'Kuch mashg\'ulotlari' },
  { key: 'boxing', label: 'Boks & Jangovar' },
  { key: 'cardio', label: 'Kardio' },
  { key: 'pilates', label: 'Pilates' },
];

export const SchedulePage = () => {
  const { classes, bookings, currentUser } = useClubStore();
  const [selectedDay, setSelectedDay] = useState(1); // Default Monday
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingModalSession, setBookingModalSession] = useState(null);

  const filteredClasses = classes.filter((cls) => {
    const matchesDay = cls.dayOfWeek === selectedDay;
    const matchesCat = selectedCategory === 'all' || cls.category === selectedCategory;
    const matchesSearch =
      cls.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.trainerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.room.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDay && matchesCat && matchesSearch;
  });

  const isUserBooked = (sessionId) => {
    if (!currentUser) return false;
    return bookings.some(
      (b) => b.userId === currentUser.id && b.sessionId === sessionId && b.status === 'confirmed'
    );
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
            <CalendarIcon size={14} style={{ color: 'var(--color-accent)' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Haftalik guruh darslari
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
            Mashg'ulotlar Jadvali
          </h1>
          <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Istalgan darsni tanlang, bo'sh o'rinlarni ko'ring va 1 marta bosish bilan joyingizni band qiling.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '28px',
          }}
        >
          {DAYS.map((d) => {
            const isSelected = selectedDay === d.dayNum;
            return (
              <button
                key={d.dayNum}
                onClick={() => setSelectedDay(d.dayNum)}
                style={{
                  padding: '12px 20px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isSelected ? 'var(--color-accent)' : 'var(--color-bg-secondary)',
                  color: isSelected ? 'var(--color-accent-contrast)' : 'var(--color-text-primary)',
                  border: isSelected ? '1px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {d.name}
              </button>
            );
          })}
        </div>

        {/* Filters & Search Bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '32px',
            padding: '16px 20px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          {/* Categories */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8125rem',
                    fontWeight: 600,
                    backgroundColor: active ? 'var(--color-accent-muted)' : 'var(--color-bg-tertiary)',
                    color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                    border: active ? '1px solid var(--color-accent)' : '1px solid var(--color-border-subtle)',
                    cursor: 'pointer',
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '280px',
            }}
          >
            <Search
              size={16}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
              }}
            />
            <input
              type="text"
              placeholder="Dars yoki murabbiy nomi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-tertiary)',
                border: '1px solid var(--color-border-subtle)',
                color: 'var(--color-text-primary)',
                fontSize: '0.875rem',
              }}
            />
          </div>
        </div>

        {/* Classes Grid */}
        {filteredClasses.length === 0 ? (
          <div
            style={{
              padding: '64px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', marginBottom: '8px' }}>
              Ushbu kunda yoki toifada mashg'ulotlar topilmadi
            </p>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Iltimos, boshqa kun yoki qidiruv so'zini tanlab ko'ring
            </p>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredClasses.map((cls) => {
              const booked = isUserBooked(cls.id);
              const isFull = cls.bookedCount >= cls.capacity;
              const fillPct = Math.round((cls.bookedCount / cls.capacity) * 100);

              return (
                <div
                  key={cls.id}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    position: 'relative',
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
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      <Clock size={14} style={{ color: 'var(--color-accent)' }} />
                      {cls.startTime} – {cls.endTime}
                    </span>
                  </div>

                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 800,
                        color: 'var(--color-text-primary)',
                        marginBottom: '6px',
                      }}
                    >
                      {cls.title}
                    </h3>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      {cls.description}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      padding: '12px',
                      backgroundColor: 'var(--color-bg-tertiary)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.8125rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Xona:</span>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{cls.room}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-text-muted)' }}>Darajasi:</span>
                      <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{cls.level}</span>
                    </div>

                    {/* Capacity bar */}
                    <div style={{ marginTop: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.75rem' }}>
                        <span style={{ color: 'var(--color-text-muted)' }}>Sig'imi:</span>
                        <span style={{ fontWeight: 700, color: isFull ? 'var(--color-error)' : 'var(--color-text-primary)' }}>
                          {cls.bookedCount}/{cls.capacity} joy band ({cls.capacity - cls.bookedCount} ta bo'sh)
                        </span>
                      </div>
                      <div
                        style={{
                          width: '100%',
                          height: '6px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--color-bg-elevated)',
                          overflow: 'hidden',
                        }}
                      >
                        <div
                          style={{
                            width: `${fillPct}%`,
                            height: '100%',
                            backgroundColor: isFull ? 'var(--color-error)' : 'var(--color-accent)',
                            borderRadius: 'var(--radius-full)',
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Trainer footer & Book button */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 'auto',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--color-border-subtle)',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={cls.trainerAvatar}
                        alt={cls.trainerName}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                          {cls.trainerName}
                        </div>
                        <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                          Murabbiy
                        </div>
                      </div>
                    </div>

                    {booked ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '8px 14px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: 'var(--color-success-bg)',
                          color: 'var(--color-success)',
                          fontSize: '0.8125rem',
                          fontWeight: 700,
                        }}
                      >
                        <CheckCircle2 size={16} />
                        Yozilgansiz
                      </div>
                    ) : (
                      <button
                        onClick={() => setBookingModalSession(cls)}
                        disabled={isFull}
                        style={{
                          padding: '10px 18px',
                          borderRadius: 'var(--radius-md)',
                          backgroundColor: isFull ? 'var(--color-bg-elevated)' : 'var(--color-accent)',
                          color: isFull ? 'var(--color-text-muted)' : 'var(--color-accent-contrast)',
                          fontFamily: 'var(--font-display)',
                          fontSize: '0.875rem',
                          fontWeight: 800,
                          cursor: isFull ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {isFull ? 'To\'liq band' : 'Yozilish'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {bookingModalSession && (
        <BookClassModal
          session={bookingModalSession}
          onClose={() => setBookingModalSession(null)}
        />
      )}
    </div>
  );
};
