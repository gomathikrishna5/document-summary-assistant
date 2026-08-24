import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

const STEPS = [
  { key: 'uploading', label: 'Uploading document' },
  { key: 'extracting', label: 'Extracting text' },
  { key: 'summarizing', label: 'Generating AI summary' },
];

const LoadingState = ({ currentStep }) => {
  const currentIndex = STEPS.findIndex((step) => step.key === currentStep);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      className="glass-card p-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {STEPS.map((step, index) => {
          const isDone = index < currentIndex;
          const isActive = index === currentIndex;

          return (
            <div key={step.key} className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                  isDone
                    ? 'border-accent bg-accent/20 text-accent'
                    : isActive
                    ? 'border-primary bg-primary/20 text-primary'
                    : 'border-border text-muted'
                }`}
              >
                {isDone ? (
                  <Check className="h-4 w-4" />
                ) : isActive ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <span className="text-xs">{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm font-medium ${
                  isActive ? 'text-ink' : isDone ? 'text-muted' : 'text-muted/60'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-8 h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-primary"
          initial={{ width: '5%' }}
          animate={{
            width: `${((currentIndex + 1) / STEPS.length) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      <div className="mt-8 space-y-3">
        <div className="skeleton h-4 w-3/4" />
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-5/6" />
      </div>
    </motion.div>
  );
};

export default LoadingState;
