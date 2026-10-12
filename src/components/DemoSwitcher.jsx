import React, { useState } from 'react';
import { useClubStore, DEMO_USERS } from '../store/useClubStore';
import { Users, ChevronDown, Check, Shield, UserX, Snowflake, Zap } from 'lucide-react';

export const DemoSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, switchDemoUser, setCurrentUser, addToast } = useClubStore();

  const handleSelect = (userId) => {
    switchDemoUser(userId);
    setIsOpen(false);
  };

  const handleSetGuest = () => {
    setCurrentUser(null);
    setIsOpen(false);
    addToast({
      type: 'info',
      title: 'Mehmon rejimi',
      message: "Tizimdan chiqildi, endi saytni yangi mehmon sifatida ko'ryapsiz",
    });
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        zIndex: 9990,
      }}
    >
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            bottom: '52px',
            left: 0,
            width: '320px',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border-medium)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-xl)',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '8px',
              borderBottom: '1px solid var(--color-border-subtle)',
            }}
          >
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Test / Demo Profil Tanlash
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)', fontWeight: 600 }}>
              Tezkor sinov
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {DEMO_USERS.map((user) => {
              const isSelected = currentUser?.id === user.id;
              const isFrozen = user.accountStatus === 'FROZEN';
              const isNoSub = user.accountStatus === 'REGISTERED_NO_SUB';
              const isAdmin = user.role === 'admin';

              return (
                <button
                  key={user.id}
                  onClick={() => handleSelect(user.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--color-accent-muted)' : 'var(--color-bg-tertiary)',
                    border: isSelected ? '1px solid var(--color-accent)' : '1px solid transparent',
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={user.avatarUrl}
                      alt={user.fullName}
                      style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        {user.fullName}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {isAdmin ? (
                          <span style={{ color: '#00F0FF', display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <Shield size={12} /> Boshqaruvchi (Admin)
                          </span>
                        ) : isFrozen ? (
                          <span style={{ color: '#38BDF8', display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <Snowflake size={12} /> Muzlatilgan VIP
                          </span>
                        ) : isNoSub ? (
                          <span style={{ color: '#F59E0B' }}>Obunasiz yangi a'zo</span>
                        ) : (
                          <span style={{ color: 'var(--color-accent)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                            <Zap size={12} /> Faol PRO a'zo
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  {isSelected && <Check size={16} style={{ color: 'var(--color-accent)' }} />}
                </button>
              );
            })}

            {/* Guest Option */}
            <button
              onClick={handleSetGuest}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: !currentUser ? 'var(--color-accent-muted)' : 'var(--color-bg-tertiary)',
                border: !currentUser ? '1px solid var(--color-accent)' : '1px solid transparent',
                textAlign: 'left',
                width: '100%',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-bg-elevated)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <UserX size={16} />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    Mehmon (Chiqish)
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    Ro'yxatdan o'tmagan holat
                  </div>
                </div>
              </div>
              {!currentUser && <Check size={16} style={{ color: 'var(--color-accent)' }} />}
            </button>
          </div>
        </div>
      )}

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 14px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border-medium)',
          boxShadow: 'var(--shadow-lg)',
          color: 'var(--color-text-primary)',
          fontSize: '0.8125rem',
          fontWeight: 600,
          cursor: 'pointer',
          backdropFilter: 'blur(12px)',
        }}
        title="Rol va profilni almashtirish"
      >
        <Users size={16} style={{ color: 'var(--color-accent)' }} />
        <span>
          {currentUser ? currentUser.fullName.split(' ')[0] : 'Mehmon'} (Rol almashtirish)
        </span>
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
      </button>
    </div>
  );
};
