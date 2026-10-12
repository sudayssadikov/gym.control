import React from 'react';
import { useClubStore } from '../store/useClubStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useClubStore();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100% - 32px)',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';

        const borderColor = isSuccess ? 'var(--color-success)' : isError ? 'var(--color-error)' : 'var(--color-info)';
        const bgIcon = isSuccess ? 'var(--color-success-bg)' : isError ? 'var(--color-error-bg)' : 'var(--color-info-bg)';

        return (
          <div
            key={toast.id}
            style={{
              pointerEvents: 'auto',
              background: 'var(--color-bg-secondary)',
              borderLeft: `4px solid ${borderColor}`,
              borderTop: '1px solid var(--color-border-subtle)',
              borderRight: '1px solid var(--color-border-subtle)',
              borderBottom: '1px solid var(--color-border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              boxShadow: 'var(--shadow-xl)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <div
              style={{
                background: bgIcon,
                color: borderColor,
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {isSuccess ? <CheckCircle2 size={18} /> : isError ? <AlertCircle size={18} /> : <Info size={18} />}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: toast.message ? '2px' : '0' }}>
                {toast.title}
              </h4>
              {toast.message && (
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', lineHeight: 1.4 }}>
                  {toast.message}
                </p>
              )}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                color: 'var(--color-text-muted)',
                padding: '4px',
                borderRadius: 'var(--radius-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              title="Yopish"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
