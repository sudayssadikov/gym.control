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
} from 'lucide-react';

export const AdminPage = () => {
  const { currentUser, classes, addClass, subscriptions } = useClubStore();

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
      categoryLabel: category === 'yoga' ? 'Yoga & Pilates' : category === 'boxing' ? 'Jangovar san\'at' : 'Krossfit & HIIT',
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
      description: description || 'Professional murabbiy boshchiligidagi intensiv mashg\'ulot.',
    });

    setTitle('');
    setDescription('');
  };

  const totalMembers = DEMO_USERS.length;
  const activeSubsCount = subscriptions.filter((s) => s.status === 'active').length;

  return (
    <div style={{ padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '36px' }}>
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}
        >
          <div className="glass-panel" style={{ padding: '24px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Faol a'zolar obunasi</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-accent)', marginTop: '4px' }}>
              {activeSubsCount} ta
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Muntazam obunachilar</span>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Guruh darslari soni</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#00F0FF', marginTop: '4px' }}>
              {classes.length} ta
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Haftalik jadvalda</span>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Murabbiylar shtati</span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: '#F59E0B', marginTop: '4px' }}>
              {clubTrainers.length} nafar
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Sertifikatlangan ustozlar</span>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>Klub holati</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-success)', marginTop: '8px' }}>
              Ochiq (06:00-23:00)
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Standart ish rejimi</span>
          </div>
        </div>

        {/* Two Columns: Add Class & Member List */}
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

          {/* Members List */}
          <div className="glass-panel" style={{ padding: '32px', borderRadius: 'var(--radius-xl)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
              Ro'yxatdan o'tgan a'zolar
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {DEMO_USERS.map((usr) => (
                <div
                  key={usr.id}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-bg-tertiary)',
                    border: '1px solid var(--color-border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={usr.avatarUrl}
                      alt={usr.fullName}
                      style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{usr.fullName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{usr.phone}</div>
                    </div>
                  </div>

                  <div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '4px 10px',
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
                        ? 'FAOL A\'ZO'
                        : usr.accountStatus === 'FROZEN'
                        ? 'MUZLATILGAN'
                        : 'OBUNASIZ'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
