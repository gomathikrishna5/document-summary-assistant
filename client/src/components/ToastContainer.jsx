import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

const COLORS = {
  success: 'text-accent border-accent/30 bg-accent/10',
  error: 'text-red-400 border-red-400/30 bg-red-400/10',
  info: 'text-primary border-primary/30 bg-primary/10',
};

const ToastContainer = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = ICONS[toast.type] || Info;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              className={`flex items-start gap-3 rounded-xl2 border bg-card/95 backdrop-blur-xl px-4 py-3.5 shadow-card ${COLORS[toast.type]}`}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <p className="flex-1 text-sm text-ink">{toast.message}</p>
              <button
                onClick={() => onDismiss(toast.id)}
                className="text-muted transition hover:text-ink"
                aria-label="Dismiss notification"
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
