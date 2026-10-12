import React, { useState } from 'react';
import { useClubStore } from '../store/useClubStore';
import { FreezeModal } from '../components/FreezeModal';
import { CheckoutModal } from '../components/CheckoutModal';
import { membershipPlans } from '../content/plans';
import {
  User,
  CreditCard,
  Calendar,
  Activity,
  Snowflake,
  QrCode,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  TrendingDown,
  Dumbbell,
  Receipt,
  ArrowRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const DashboardPage = () => {
  const {
    currentUser,
    subscriptions,
    bookings,
    cancelBooking,
    measurements,
    addMeasurement,
    workoutLogs,
    addWorkoutLog,
    invoices,
  } = useClubStore();

  const [activeTab, setActiveTab] = useState('bookings');
  const [freezeModalOpen, setFreezeModalOpen] = useState(false);
  const [renewPlan, setRenewPlan] = useState(null);

  // New measurement form state
  const [newWeight, setNewWeight] = useState('');
  const [newWaist, setNewWaist] = useState('');
  const [newChest, setNewChest] = useState('');

  // New workout log form state
  const [newExercise, setNewExercise] = useState('');
  const [newSets, setNewSets] = useState('4');
  const [newReps, setNewReps] = useState('10');
  const [newWeightKg, setNewWeightKg] = useState('60');

  if (!currentUser) {
    return (
      <div style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '520px' }}>
          <div
            style={{
              padding: '48px 32px',
              backgroundColor: 'var(--color-bg-secondary)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <User size={48} style={{ color: 'var(--color-accent)', margin: '0 auto 16px auto' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px' }}>
              Shaxsiy kabinetga kirish
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>
              Profil ma'lumotlari, darslar va obunangizni boshqarish uchun demo hisobingizni tanlang.
            </p>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-accent)', fontWeight: 600 }}>
              (Pastki chap burchakdagi "Rol almashtirish" tugmasini bosing)
            </p>
          </div>
        </div>
      </div>
    );
  }

  const activeSub = subscriptions.find((s) => s.userId === currentUser.id);
  const userBookings = bookings.filter((b) => b.userId === currentUser.id);
  const userMeasurements = measurements.filter((m) => m.userId === currentUser.id);
  const userWorkouts = workoutLogs.filter((w) => w.userId === currentUser.id);
  const userInvoices = invoices.filter((i) => i.userId === currentUser.id);

  const handleAddMeasurement = (e) => {
    e.preventDefault();
    if (!newWeight) return;
    addMeasurement({
      date: new Date().toISOString().split('T')[0],
      weight: parseFloat(newWeight),
      waist: newWaist ? parseFloat(newWaist) : undefined,
      chest: newChest ? parseFloat(newChest) : undefined,
    });
    setNewWeight('');
    setNewWaist('');
    setNewChest('');
  };

  const handleAddWorkout = (e) => {
    e.preventDefault();
    if (!newExercise) return;
    addWorkoutLog({
      date: new Date().toISOString().split('T')[0],
      exercise: newExercise,
      sets: parseInt(newSets) || 3,
      reps: parseInt(newReps) || 10,
      weightKg: parseFloat(newWeightKg) || 0,
    });
    setNewExercise('');
  };

  const formatDate = (iso) => {
    if (!iso) return '—';
    return new Date(iso).toLocaleDateString('uz-UZ');
  };

  return (
    <div style={{ padding: '48px 0 80px 0' }}>
      <div className="container">
        {/* Profile Header & Digital Pass */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '40px',
          }}
        >
          {/* User info card */}
          <div
            className="glass-panel"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <img
                src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80'}
                alt={currentUser.fullName}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '2px solid var(--color-accent)',
                }}
              />
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                  {currentUser.fullName}
                </h1>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                  {currentUser.phone} • {currentUser.email}
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-bg-tertiary)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    A'zolik ID: {currentUser.id.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px', flexWrap: 'wrap' }}>
              <Link
                to="/jadval"
                style={{
                  padding: '10px 18px',
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
                Darsga yozilish <ArrowRight size={14} />
              </Link>
              <Link
                to="/tariflar"
                style={{
                  padding: '10px 18px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-bg-tertiary)',
                  border: '1px solid var(--color-border-subtle)',
                  color: 'var(--color-text-primary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                }}
              >
                Tariflar
              </Link>
            </div>
          </div>

          {/* Virtual Membership Pass Card */}
          <div
            style={{
              padding: '32px',
              borderRadius: 'var(--radius-xl)',
              background: 'linear-gradient(135deg, #1A2230 0%, #0A0D12 100%)',
              border: '1px solid rgba(204, 255, 0, 0.3)',
              boxShadow: 'var(--shadow-glow)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span style={{ fontSize: '0.6875rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-accent)' }}>
                  APEX FITNESS CLUB
                </span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: '#FFFFFF', marginTop: '4px' }}>
                  {activeSub ? activeSub.planName : "A'zolik yo'q"}
                </h3>
              </div>

              {activeSub ? (
                <div
                  style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: activeSub.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                    color: activeSub.status === 'active' ? '#10B981' : '#38BDF8',
                    border: `1px solid ${activeSub.status === 'active' ? '#10B981' : '#38BDF8'}`,
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                  }}
                >
                  {activeSub.status === 'active' ? 'FAOL OBUNA' : 'MUZLATILGAN'}
                </div>
              ) : (
                <div
                  style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(239, 68, 68, 0.2)',
                    color: '#EF4444',
                    border: '1px solid #EF4444',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                  }}
                >
                  OBUNASIZ
                </div>
              )}
            </div>

            {/* Middle info */}
            <div style={{ margin: '20px 0' }}>
              {activeSub ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8125rem' }}>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Boshlanish:</span>
                    <div style={{ color: '#FFFFFF', fontWeight: 600 }}>{formatDate(activeSub.startDate)}</div>
                  </div>
                  <div>
                    <span style={{ color: '#94A3B8' }}>Tugash muddati:</span>
                    <div style={{ color: 'var(--color-accent)', fontWeight: 700 }}>{formatDate(activeSub.endDate)}</div>
                  </div>
                </div>
              ) : (
                <p style={{ fontSize: '0.875rem', color: '#94A3B8' }}>
                  Zalga kirish va darslarga yozilish uchun obuna xarid qiling.
                </p>
              )}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', fontSize: '0.75rem' }}>
                <QrCode size={20} style={{ color: 'var(--color-accent)' }} />
                <span>Raqamli Club Pass</span>
              </div>

              {activeSub ? (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setFreezeModalOpen(true)}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(56, 189, 248, 0.15)',
                      color: '#38BDF8',
                      border: '1px solid #38BDF8',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {activeSub.status === 'frozen' ? 'Muzlatishni ochish' : 'Muzlatish'}
                  </button>
                  <button
                    onClick={() => setRenewPlan(membershipPlans[1])}
                    style={{
                      padding: '6px 14px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-accent)',
                      color: '#0A0D12',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      cursor: 'pointer',
                    }}
                  >
                    Yangilash
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setRenewPlan(membershipPlans[1])}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-accent)',
                    color: '#0A0D12',
                    fontSize: '0.8125rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                  }}
                >
                  Obuna olish
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
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
            { id: 'bookings', label: 'Mening darslarim', icon: <Calendar size={16} /> },
            { id: 'progress', label: 'Vazn va dinamika', icon: <Activity size={16} /> },
            { id: 'workouts', label: 'Mashg\'ulotlar jurnali', icon: <Dumbbell size={16} /> },
            { id: 'invoices', label: 'To\'lovlar tarixi', icon: <Receipt size={16} /> },
          ].map((tab) => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 20px',
                  borderBottom: active ? '2px solid var(--color-accent)' : '2px solid transparent',
                  color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  fontWeight: active ? 700 : 500,
                  fontSize: '0.9375rem',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer',
                }}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Yozilgan mashg'ulotlar</h3>
              <Link
                to="/jadval"
                style={{
                  color: 'var(--color-accent)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                Yangi dars qo'shish <Plus size={16} />
              </Link>
            </div>

            {userBookings.length === 0 ? (
              <div
                style={{
                  padding: '48px',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-bg-secondary)',
                  borderRadius: 'var(--radius-lg)',
                }}
              >
                <p style={{ color: 'var(--color-text-secondary)', marginBottom: '16px' }}>
                  Siz hali birorta ham guruh darsiga yozilmagansiz.
                </p>
                <Link
                  to="/jadval"
                  style={{
                    padding: '10px 20px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-contrast)',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    display: 'inline-block',
                  }}
                >
                  Jadvalni ko'rish
                </Link>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                {userBookings.map((bk) => (
                  <div
                    key={bk.id}
                    className="glass-panel"
                    style={{
                      padding: '20px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                        {bk.sessionTitle}
                      </h4>
                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--color-success-bg)',
                          color: 'var(--color-success)',
                        }}
                      >
                        Tasdiqlangan
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <div>Sana: <strong>{bk.sessionDate}</strong> ({bk.startTime} – {bk.endTime})</div>
                      <div>Xona: {bk.room}</div>
                      <div>Murabbiy: {bk.trainerName}</div>
                    </div>

                    <button
                      onClick={() => cancelBooking(bk.id)}
                      style={{
                        marginTop: 'auto',
                        padding: '8px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: 'var(--color-error-bg)',
                        color: 'var(--color-error)',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                      }}
                    >
                      <Trash2 size={14} /> Bekor qilish
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PROGRESS / MEASUREMENTS */}
        {activeTab === 'progress' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {/* Chart */}
            <div
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '16px' }}>
                Vazn o'zgarish dinamikasi (kg)
              </h3>
              <div style={{ width: '100%', height: '260px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={userMeasurements}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
                    <XAxis dataKey="date" stroke="var(--color-text-muted)" fontSize={12} />
                    <YAxis stroke="var(--color-text-muted)" fontSize={12} domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'var(--color-bg-secondary)',
                        borderColor: 'var(--color-border-medium)',
                        color: 'var(--color-text-primary)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      stroke="var(--color-accent)"
                      strokeWidth={3}
                      dot={{ r: 5, fill: 'var(--color-accent)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Add Measurement Form */}
            <div
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '16px' }}>
                Yangi ko'rsatkich kiritish
              </h3>
              <form onSubmit={handleAddMeasurement} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Vazn (kg):
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="Masalan: 80.5"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Bel (sm):
                    </label>
                    <input
                      type="number"
                      placeholder="88"
                      value={newWaist}
                      onChange={(e) => setNewWaist(e.target.value)}
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
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Ko'krak (sm):
                    </label>
                    <input
                      type="number"
                      placeholder="105"
                      value={newChest}
                      onChange={(e) => setNewChest(e.target.value)}
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
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-contrast)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  O'lchovni saqlash
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 3: WORKOUT JOURNAL */}
        {activeTab === 'workouts' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
            {/* Workout History List */}
            <div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '16px' }}>
                So'nggi mashqlar tarixi
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {userWorkouts.map((w) => (
                  <div
                    key={w.id}
                    style={{
                      padding: '14px 18px',
                      backgroundColor: 'var(--color-bg-secondary)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--color-border-subtle)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--color-text-primary)', fontSize: '0.9375rem' }}>
                        {w.exercise}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{w.date}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 700, color: 'var(--color-accent)' }}>
                        {w.sets} set × {w.reps} marta
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                        {w.weightKg} kg
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Workout Form */}
            <div
              className="glass-panel"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-xl)',
              }}
            >
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '16px' }}>
                Yangi mashq qayd etish
              </h3>
              <form onSubmit={handleAddWorkout} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                    Mashq nomi:
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Shtanga tortish, gantel ko'tarish..."
                    value={newExercise}
                    onChange={(e) => setNewExercise(e.target.value)}
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

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Setlar:
                    </label>
                    <input
                      type="number"
                      value={newSets}
                      onChange={(e) => setNewSets(e.target.value)}
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
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Takror:
                    </label>
                    <input
                      type="number"
                      value={newReps}
                      onChange={(e) => setNewReps(e.target.value)}
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
                    <label style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: '4px' }}>
                      Vazn (kg):
                    </label>
                    <input
                      type="number"
                      value={newWeightKg}
                      onChange={(e) => setNewWeightKg(e.target.value)}
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
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--color-accent)',
                    color: 'var(--color-accent-contrast)',
                    fontWeight: 700,
                    cursor: 'pointer',
                    marginTop: '8px',
                  }}
                >
                  Kundalikka qo'shish
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 4: INVOICES */}
        {activeTab === 'invoices' && (
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px' }}>
              Hisob-fakturalar va kvitansiyalar
            </h3>

            <div
              style={{
                overflowX: 'auto',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border-subtle)',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-bg-tertiary)', borderBottom: '1px solid var(--color-border-subtle)' }}>
                    <th style={{ padding: '14px 20px', fontSize: '0.875rem' }}>ID</th>
                    <th style={{ padding: '14px 20px', fontSize: '0.875rem' }}>Ta'rif / Xizmat</th>
                    <th style={{ padding: '14px 20px', fontSize: '0.875rem' }}>Summa</th>
                    <th style={{ padding: '14px 20px', fontSize: '0.875rem' }}>Sana</th>
                    <th style={{ padding: '14px 20px', fontSize: '0.875rem' }}>To'lov usuli</th>
                    <th style={{ padding: '14px 20px', fontSize: '0.875rem' }}>Holat</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.875rem' }}>
                  {userInvoices.map((inv) => (
                    <tr key={inv.id} style={{ borderBottom: '1px solid var(--color-border-subtle)' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--color-accent)' }}>{inv.id}</td>
                      <td style={{ padding: '14px 20px', fontWeight: 600 }}>{inv.planName}</td>
                      <td style={{ padding: '14px 20px', fontWeight: 700 }}>
                        {new Intl.NumberFormat('uz-UZ').format(inv.amount)} so'm
                      </td>
                      <td style={{ padding: '14px 20px', color: 'var(--color-text-secondary)' }}>{inv.date}</td>
                      <td style={{ padding: '14px 20px' }}>{inv.paymentMethod}</td>
                      <td style={{ padding: '14px 20px' }}>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'var(--color-success-bg)',
                            color: 'var(--color-success)',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                          }}
                        >
                          To'langan
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {freezeModalOpen && activeSub && (
        <FreezeModal
          subscription={activeSub}
          onClose={() => setFreezeModalOpen(false)}
        />
      )}

      {renewPlan && (
        <CheckoutModal
          plan={renewPlan}
          onClose={() => setRenewPlan(null)}
        />
      )}
    </div>
  );
};
