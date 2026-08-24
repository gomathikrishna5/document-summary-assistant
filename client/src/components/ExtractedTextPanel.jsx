import { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Copy, Check } from 'lucide-react';

const ExtractedTextPanel = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.32 }}
      className="glass-card p-6 sm:p-8"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-ink">
            <Terminal className="h-4.5 w-4.5" />
          </div>
          <h3 className="font-semibold">Extracted Text</h3>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition hover:bg-white/10 hover:text-ink"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-accent" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="code-panel max-h-80 p-5">
        <pre className="whitespace-pre-wrap break-words">{text}</pre>
      </div>
    </motion.div>
  );
};

export default ExtractedTextPanel;
