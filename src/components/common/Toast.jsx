import React from 'react';
import { useMahalla } from '../../context/MahallaContext';
import { CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react';

export const Toast = () => {
  const { toasts } = useMahalla();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto p-4 rounded-2xl glass-panel border border-cyan-500/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex items-start gap-3 animate-fadeIn"
        >
          {toast.type === 'success' && (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'error' && (
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          )}
          {toast.type === 'info' && (
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          )}

          <div className="flex-1">
            <p className="text-xs font-semibold text-white leading-relaxed">
              {toast.message}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
