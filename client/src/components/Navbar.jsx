import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-primary shadow-glow">
            <FileText className="h-5 w-5 text-white" strokeWidth={2.25} />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            Document Summary Assistant
          </span>
        </div>
        <a
          href="https://github.com/gomathikrishna5/document-summary-assistant"
          target="_blank"
          rel="noreferrer"
          className="btn-secondary text-sm"
        >
          View on GitHub
        </a>
      </div>
    </motion.header>
  );
};

export default Navbar;
