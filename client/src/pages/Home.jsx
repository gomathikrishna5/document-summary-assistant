import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, History, X } from 'lucide-react';
import Hero from '../components/Hero';
import UploadCard from '../components/UploadCard';
import SummaryOptions from '../components/SummaryOptions';
import LoadingState from '../components/LoadingState';
import ResultCards from '../components/ResultCards';
import ExtractedTextPanel from '../components/ExtractedTextPanel';
import { uploadFile, summarizeText } from '../services/api';

const RECENT_KEY = 'dsa_recent_uploads';
const MAX_RECENT = 5;

const Home = ({ showToast }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summaryLength, setSummaryLength] = useState('medium');
  const [status, setStatus] = useState('idle'); // idle | uploading | extracting | summarizing | done
  const [extractedText, setExtractedText] = useState('');
  const [result, setResult] = useState(null);
  const [recentUploads, setRecentUploads] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem(RECENT_KEY) || '[]');
      setRecentUploads(stored);
    } catch {
      setRecentUploads([]);
    }
  }, []);

  const persistRecent = (entry) => {
    setRecentUploads((prev) => {
      const next = [entry, ...prev].slice(0, MAX_RECENT);
      sessionStorage.setItem(RECENT_KEY, JSON.stringify(next));
      return next;
    });
  };

  const resetFlow = () => {
    setSelectedFile(null);
    setExtractedText('');
    setResult(null);
    setStatus('idle');
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResult(null);
    setExtractedText('');
  };

  const handleGenerate = async () => {
    if (!selectedFile) {
      showToast('Please choose a file to summarize first.', 'error');
      return;
    }

    try {
      setStatus('uploading');
      const uploadResult = await uploadFile(selectedFile);

      setStatus('extracting');
      setExtractedText(uploadResult.extractedText);

      setStatus('summarizing');
      const summaryResult = await summarizeText(uploadResult.extractedText, summaryLength);

      setResult(summaryResult);
      setStatus('done');

      persistRecent({
        name: selectedFile.name,
        size: selectedFile.size,
        length: summaryLength,
        timestamp: new Date().toISOString(),
      });

      showToast('Summary generated successfully.', 'success');
    } catch (err) {
      setStatus('idle');
      showToast(err.message || 'Something went wrong. Please try again.', 'error');
    }
  };

  const handleCopySummary = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result.summary);
    showToast('Summary copied to clipboard.', 'success');
  };

  const handleDownloadSummary = () => {
    if (!result) return;
    const blob = new Blob([result.summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedFile?.name?.replace(/\.[^/.]+$/, '') || 'summary'}-summary.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Summary downloaded as TXT.', 'success');
  };

  const isProcessing = ['uploading', 'extracting', 'summarizing'].includes(status);

  return (
    <>
      <Hero />

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <div className="space-y-6">
          <UploadCard
            selectedFile={selectedFile}
            onFileSelect={handleFileSelect}
            onFileClear={resetFlow}
            onError={(msg) => showToast(msg, 'error')}
          />

          {recentUploads.length > 0 && !selectedFile && (
            <div className="glass-card p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-medium text-muted">
                <History className="h-4 w-4" />
                Recent uploads
              </div>
              <div className="flex flex-wrap gap-2">
                {recentUploads.map((item, i) => (
                  <span key={i} className="chip text-xs">
                    {item.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <SummaryOptions
            value={summaryLength}
            onChange={setSummaryLength}
            disabled={isProcessing}
          />

          <motion.button
            whileTap={{ scale: 0.98 }}
            disabled={!selectedFile || isProcessing}
            onClick={handleGenerate}
            className="btn-gradient w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0"
          >
            <Sparkles className="h-5 w-5" />
            {isProcessing ? 'Generating summary…' : 'Generate AI Summary'}
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {isProcessing && (
            <div className="mt-8">
              <LoadingState currentStep={status} />
            </div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {status === 'done' && result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-10 space-y-6"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Your document insights</h2>
                <button
                  onClick={resetFlow}
                  className="flex items-center gap-1.5 text-sm text-muted transition hover:text-ink"
                >
                  <X className="h-4 w-4" />
                  Start over
                </button>
              </div>
              <ResultCards
                result={result}
                onCopy={handleCopySummary}
                onDownload={handleDownloadSummary}
              />
              <ExtractedTextPanel text={extractedText} />
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Home;
