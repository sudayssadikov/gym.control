import React, { useState } from 'react';
import { useClubStore, DEMO_USERS } from '../store/useClubStore';
import { clubTrainers } from '../content/trainers';
import {
  ShieldAlert,
  Users,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  Sparkles,
  MessageSquare,
  MapPin,
} from 'lucide-react';

export const AdminPage = () => {
  const {
    currentUser,
    classes,
    addClass,
    deleteClass,
    subscriptions,
    bookings,
    cancelBooking,
    contactInquiries,
  } = useClubStore();

  const [activeAdminTab, setActiveAdminTab] = useState('classes'); // 'classes' | 'members' | 'leads' | 'bookings'

  // Add class form
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('crossfit');
  const [trainerId, setTrainerId] = useState(clubTrainers[0].id);
  const [dayOfWeek, setDayOfWeek] = useState(1);
  const [startTime, setStartTime] = useState('18:00');
  const [endTime, setEndTime] = useState('19:00');
  const [room, setRoom] = useState('Asosiy Zal');
  const [capacity, setCapacity] = useState(16);
  const [level, setLevel] = useState("O'rta");
  const [description, setDescription] = useState('');

  if (currentUser?.role !== 'admin') {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '480px' }}>
          <div style={{ padding: '48px', backgroundColor: 'var(--color-bg-secondary)', borderRadius: 'var(--radius-xl)' }}>
            <ShieldAlert size={48} style={{ color: 'var(--color-error)', margin: '0 auto 16px auto' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Ruxsat berilmagan</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
              Ushbu sahifaga faqat klub administratorlari kirishi mumkin. Pastdagi "Rol almashtirish" tugmasidan
              "Sardorbek Karimov (Admin)" profiliga o'ting.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleCreateClass = (e) => {
    e.preventDefault();
    if (!title) return;

    const selectedTrainer = clubTrainers.find((t) => t.id === trainerId) || clubTrainers[0];
    const dayNames = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];

    addClass({
      title,
      category,
      categoryLabel: category === 'yoga' ? 'Yoga & Pilates' : category === 'boxing' ? "Jangovar san'at" : 'Krossfit & HIIT',
      trainerId: selectedTrainer.id,
      trainerName: selectedTrainer.name,
      trainerAvatar: selectedTrainer.image,
      dayOfWeek: parseInt(dayOfWeek),
      dayName: dayNames[parseInt(dayOfWeek)],
      startTime,
      endTime,
      room,
      capacity: parseInt(capacity) || 15,
      level,
      description: description || "Professional murabbiy boshchiligidagi intensiv mashg'ulot.",
    });

    setTitle('');
    setDescription('');
  };

  const activeSubsCount = subscriptions.filter((s) => s.status === 'active').length;

  return (
    <div style={{ padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#00F0FF', textTransform: 'uppercase' }}>
            Administrator Boshqaruv Paneli
          </span>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 800, marginTop: '4px' }}>
            APEX Fitness Boshqaruvi
          </h1>
        </div>

        {/* Stats Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <div className="glass-panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Faol a'zolar</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-accent)', marginTop: '4px' }}>
              {activeSubsCount} ta
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Muntazam obunachilar</span>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Guruh darslari</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#00F0FF', marginTop: '4px' }}>
              {classes.length} ta
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Haftalik jadvalda</span>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Sinov so'rovlari</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>
              {contactInquiries?.length || 0} ta
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Sayt orqali kelgan</span>
          </div>

          <div className="glass-panel" style={{ padding: '20px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Jami band qilingan</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '4px' }}>
              {bookings.length} ta
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>A'zolar yozilgan darslar</span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid var(--color-border-subtle)',
            marginBottom: '32px',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'classes', label: 'Darslar jadvali va yangi dars' },
            { id: 'members', label: "Ro'yxatdan o'tgan a'zolar" },
            { id: 'leads', label: `Sinov darsi so'rovlari (${contactInquiries?.length || 0})` },
            { id: 'bookings', label: `Band qilishlar nazorati (${bookings.length})` },
          ].map((tab) => {
            const active = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id)}
                style={{
                  padding: '12px 18px',
                  borderBottom: active ? '2px solid var(--color-accent)' : '2px solid transparent',
                  color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.9375rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: CLASSES */}
        {activeAdminTab === 'classes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '32px' }}>
            {/* Add New Class Form */}
            <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
                Yangi guruh darsi kiritish
              </h3>
              <form onSubmit={handleCreateClass} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                    Dars nomi:
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Night CrossFit Madness"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Kategoriya:
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      <option value="crossfit">Krossfit & HIIT</option>
                      <option value="yoga">Yoga & Pilates</option>
                      <option value="strength">Kuch mashg'uloti</option>
                      <option value="boxing">Boks</option>
                      <option value="cardio">Kardio</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Murabbiy:
                    </label>
                    <select
                      value={trainerId}
                      onChange={(e) => setTrainerId(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      {clubTrainers.map((tr) => (
                        <option key={tr.id} value={tr.id}>
                          {tr.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Hafta kuni:
                    </label>
                    <select
                      value={dayOfWeek}
                      onChange={(e) => setDayOfWeek(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                      }}
                    >
                      <option value={1}>Dushanba</option>
                      <option value={2}>Seshanba</option>
                      <option value={3}>Chorshanba</option>
                      <option value={4}>Payshanba</option>
                      <option value={5}>Juma</option>
                      <option value={6}>Shanba</option>
                      <option value={0}>Yakshanba</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Boshlanishi:
                    </label>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Tugashi:
                    </label>
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Xona:
                    </label>
                    <input
                      type="text"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-bg-tertiary)',
                        border: '1px solid var(--color-border-subtle)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
                      Maksimal sig'im:
                    </label>
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
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
                  }}
                >
                  Jadvalga qo'shish
                </button>
              </form>
            </div>

            {/* List of existing classes with delete action */}
            <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
                Jadvaldagi mashg'ulotlar ({classes.length} ta)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '520px', overflowY: 'auto', paddingRight: '6px' }}>
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-bg-tertiary)',
                      border: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '0.9375rem' }}>
                        {cls.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {cls.dayName}, {cls.startTime}–{cls.endTime} • {cls.room} ({cls.trainerName})
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-accent)', marginTop: '2px' }}>
                        Band qilingan: {cls.bookedCount}/{cls.capacity} kishi
                      </div>
                    </div>

                    <button
                      onClick={() => deleteClass(cls.id)}
                      style={{
                        padding: '8px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-error-bg)',
                        color: 'var(--color-error)',
                        cursor: 'pointer',
                      }}
                      title="Darsni jadvaldan o'chirish"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MEMBERS */}
        {activeAdminTab === 'members' && (
          <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
              Ro'yxatdan o'tgan barcha a'zolar
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {DEMO_USERS.map((usr) => (
                <div
                  key={usr.id}
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <img
                      src={usr.avatarUrl}
                      alt={usr.fullName}
                      style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '1rem' }}>{usr.fullName}</div>
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                        {usr.phone} • {usr.email}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor:
                          usr.role === 'admin'
                            ? 'rgba(0, 240, 255, 0.15)'
                            : usr.accountStatus === 'ACTIVE'
                            ? 'var(--color-success-bg)'
                            : 'var(--color-warning-bg)',
                        color:
                          usr.role === 'admin'
                            ? '#00F0FF'
                            : usr.accountStatus === 'ACTIVE'
                            ? 'var(--color-success)'
                            : 'var(--color-warning)',
                      }}
                    >
                      {usr.role === 'admin'
                        ? 'ADMIN'
                        : usr.accountStatus === 'ACTIVE'
                        ? "FAOL A'ZO"
                        : usr.accountStatus === 'FROZEN'
                        ? 'MUZLATILGAN'
                        : 'OBUNASIZ'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: LEADS / INQUIRIES */}
        {activeAdminTab === 'leads' && (
          <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
              Sayt orqali yuborilgan sinov darsi so'rovlari
            </h3>
            {contactInquiries?.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }}>Hozircha yangi so'rovlar yo'q.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {contactInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    style={{
                      padding: '18px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-bg-tertiary)',
                      border: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--color-text-primary)' }}>
                        {inq.name}
                      </div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 700 }}>
                        {inq.date}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                      Telefon: <a href={`tel:${inq.phone}`} style={{ color: '#00F0FF', fontWeight: 700 }}>{inq.phone}</a>
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
                      Qiziqqan yo'nalishi: <strong>{inq.goal}</strong>
                    </div>
                    {inq.message && (
                      <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', fontStyle: 'italic', marginTop: '4px' }}>
                        "{inq.message}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: BOOKINGS */}
        {activeAdminTab === 'bookings' && (
          <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
              Barcha faol band qilishlar
            </h3>
            {bookings.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)' }}>Hozircha darslarga yozilishlar mavjud emas.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    style={{
                      padding: '14px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--color-bg-tertiary)',
                      border: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{b.sessionTitle}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Sana: {b.sessionDate} ({b.startTime}–{b.endTime}) • Murabbiy: {b.trainerName}
                      </div>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                        Foydalanuvchi ID: {b.userId}
                      </div>
                    </div>

                    <button
                      onClick={() => cancelBooking(b.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-error-bg)',
                        color: 'var(--color-error)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Bekor qilish
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
