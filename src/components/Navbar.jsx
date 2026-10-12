import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useClubStore } from '../store/useClubStore';
import { AuthModal } from './AuthModal';
import {
  Dumbbell,
  Sun,
  Moon,
  Menu,
  X,
  User as UserIcon,
  LogIn,
} from 'lucide-react';

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme, currentUser, subscriptions } = useClubStore();

  const activeSub = currentUser
    ? subscriptions.find((s) => s.userId === currentUser.id && s.status === 'active')
    : null;

  const navLinks = [
    { label: 'Asosiy', path: '/' },
    { label: 'Jadval', path: '/jadval' },
    { label: 'Tariflar', path: '/tariflar' },
    { label: 'Murabbiylar', path: '/murabbiylar' },
    { label: 'Klub haqida', path: '/klub' },
    { label: 'Kalkulyator', path: '/kalkulyator' },
    { label: 'Aloqa', path: '/aloqa' },
    { label: 'Kabinet', path: '/kabinet' },
    ...(currentUser?.role === 'admin' ? [{ label: 'Admin', path: '/admin' }] : []),
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        width: '100%',
        backgroundColor: 'var(--color-bg-glass)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--color-border-subtle)',
        transition: 'all var(--transition-normal)',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--color-accent) 0%, #00F0FF 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#0A0D12',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <Dumbbell size={24} strokeWidth={2.4} />
          </div>
          <div>
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: 'var(--color-text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              APEX <span style={{ color: 'var(--color-accent)' }}>FITNESS</span>
            </div>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--color-text-muted)',
              }}
            >
              Premium Club Tashkent
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '4px',
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  padding: '7px 12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.875rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  backgroundColor: active ? 'var(--color-accent-muted)' : 'transparent',
                  border: active ? '1px solid var(--color-accent)' : '1px solid transparent',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {/* Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
            title={theme === 'dark' ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
            aria-label="Mavzuni almashtirish"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* User Status / Profile Button or Log In Button */}
          {currentUser ? (
            <Link
              to="/kabinet"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '5px 12px 5px 5px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-subtle)',
                textDecoration: 'none',
              }}
            >
              <img
                src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80'}
                alt={currentUser.fullName}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <div style={{ display: 'none', flexDirection: 'column' }} className="user-text-box">
                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {currentUser.fullName.split(' ')[0]}
                </span>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    color: activeSub ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    fontWeight: 600,
                  }}
                >
                  {currentUser.role === 'admin'
                    ? 'ADMIN'
                    : activeSub
                    ? activeSub.planName
                    : 'Obunasiz'}
                </span>
              </div>
            </Link>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-accent-contrast)',
                fontWeight: 700,
                fontSize: '0.8125rem',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-glow)',
              }}
            >
              <LogIn size={15} /> Kirish
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
              backgroundColor: 'var(--color-bg-secondary)',
              color: 'var(--color-text-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            className="mobile-toggle"
            aria-label="Menyu ochish"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            top: '72px',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'var(--color-bg-primary)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 999,
            overflowY: 'auto',
          }}
        >
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '1rem',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--color-accent)' : 'var(--color-text-primary)',
                  backgroundColor: active ? 'var(--color-accent-muted)' : 'var(--color-bg-secondary)',
                  border: '1px solid var(--color-border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{link.label}</span>
                {active && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent)' }} />}
              </Link>
            );
          })}

          <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--color-border-subtle)' }}>
            {!currentUser ? (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setAuthModalOpen(true);
                }}
                style={{
                  width: '100%',
                  padding: '14px',
                  textAlign: 'center',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-accent-contrast)',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  marginBottom: '10px',
                }}
              >
                Kirish / Ro'yxatdan o'tish
              </button>
            ) : null}

            <Link
              to="/tariflar"
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'block',
                width: '100%',
                padding: '14px',
                textAlign: 'center',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border-medium)',
                color: 'var(--color-text-primary)',
                fontWeight: 700,
                fontSize: '1rem',
              }}
            >
              Tariflar & Obuna xaridi
            </Link>
          </div>
        </div>
      )}

      {authModalOpen && (
        <AuthModal onClose={() => setAuthModalOpen(false)} />
      )}

      <style>{`
        @media (min-width: 1080px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
          .user-text-box {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
