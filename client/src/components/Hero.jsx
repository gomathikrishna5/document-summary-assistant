import { motion } from 'framer-motion';
import { Sparkles, ScanText, ListChecks, Wand2 } from 'lucide-react';

const chips = [
  { icon: ScanText, label: 'PDF & image text extraction' },
  { icon: ListChecks, label: 'Key points & main ideas' },
  { icon: Wand2, label: 'Improvement suggestions' },
];

const Hero = () => {
  return (
    <section className="relative overflow-hidden px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-20 right-10 h-64 w-64 rounded-full bg-accent/15 blur-[100px] animate-float"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="chip mx-auto mb-6 w-fit"
        >
          <Sparkles className="h-3.5 w-3.5 text-accent" />
          <span>Powered by Google Gemini</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl"
        >
          Turn any document into a{' '}
          <span className="bg-gradient-primary bg-clip-text text-transparent">
            clear, actionable summary
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-5 max-w-xl text-lg text-muted"
        >
          Upload a PDF or image and get an instant AI summary, key points,
          main ideas, and suggestions for improving the document...all in
          seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {chips.map(({ icon: Icon, label }) => (
            <div key={label} className="chip">
              <Icon className="h-3.5 w-3.5 text-primary" />
              <span>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
