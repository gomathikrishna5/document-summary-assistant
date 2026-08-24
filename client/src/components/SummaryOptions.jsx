import { motion } from 'framer-motion';

const OPTIONS = [
  { value: 'short', label: 'Short', hint: '3-5 bullets' },
  { value: 'medium', label: 'Medium', hint: '1-2 paragraphs' },
  { value: 'long', label: 'Long', hint: 'Detailed' },
];

const SummaryOptions = ({ value, onChange, disabled }) => {
  return (
    <div className="glass-card p-2">
      <div className="relative grid grid-cols-3 gap-1">
        {OPTIONS.map((option) => {
          const isActive = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              disabled={disabled}
              onClick={() => onChange(option.value)}
              className={`relative z-10 flex flex-col items-center rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                isActive ? 'text-white' : 'text-muted hover:text-ink'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="summary-length-pill"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="absolute inset-0 -z-10 rounded-xl bg-gradient-primary shadow-glow"
                />
              )}
              <span>{option.label}</span>
              <span className={`text-xs ${isActive ? 'text-white/80' : 'text-muted/70'}`}>
                {option.hint}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SummaryOptions;
