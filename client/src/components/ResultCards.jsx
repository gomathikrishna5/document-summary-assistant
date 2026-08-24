import { motion } from 'framer-motion';
import {
  Sparkles,
  ListChecks,
  Lightbulb,
  Wand2,
  Copy,
  Download,
  Clock,
  Type,
} from 'lucide-react';
import { estimateReadingTime } from '../services/format';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const ListCard = ({ icon: Icon, title, items, index, accent = 'primary' }) => (
  <motion.div
    custom={index}
    variants={cardVariants}
    initial="hidden"
    animate="visible"
    whileHover={{ y: -3 }}
    className="glass-card p-6"
  >
    <div className="mb-4 flex items-center gap-2.5">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          accent === 'accent' ? 'bg-accent/15 text-accent' : 'bg-primary/15 text-primary'
        }`}
      >
        <Icon className="h-4.5 w-4.5" />
      </div>
      <h3 className="font-semibold">{title}</h3>
    </div>
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-ink/85 leading-relaxed">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

const ResultCards = ({ result, onCopy, onDownload }) => {
  const { summary, keyPoints, mainIdeas, suggestions } = result;

  return (
    <div className="space-y-6">
      <motion.div
        custom={0}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="glass-card p-6 sm:p-8"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="h-4.5 w-4.5 text-white" />
            </div>
            <h3 className="font-semibold">AI Summary</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onCopy}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-white/10 hover:text-ink"
            >
              <Copy className="h-3.5 w-3.5" />
              Copy
            </button>
            <button
              onClick={onDownload}
              className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-white/10 hover:text-ink"
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </button>
          </div>
        </div>

        <p className="whitespace-pre-line text-ink/90 leading-relaxed">{summary}</p>

        <div className="mt-5 flex flex-wrap gap-4 border-t border-border pt-4 text-xs text-muted">
          <span className="flex items-center gap-1.5">
            <Type className="h-3.5 w-3.5" />
            {summary.length} characters
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {estimateReadingTime(summary)}
          </span>
        </div>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        <ListCard
          icon={ListChecks}
          title="Key Points"
          items={keyPoints}
          index={1}
          accent="primary"
        />
        <ListCard
          icon={Lightbulb}
          title="Main Ideas"
          items={mainIdeas}
          index={2}
          accent="accent"
        />
      </div>

      <ListCard
        icon={Wand2}
        title="Improvement Suggestions"
        items={suggestions}
        index={3}
        accent="primary"
      />
    </div>
  );
};

export default ResultCards;
