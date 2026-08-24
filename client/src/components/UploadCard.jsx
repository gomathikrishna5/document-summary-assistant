import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Image as ImageIcon, X } from 'lucide-react';
import { formatFileSize, fileTypeLabel } from '../services/format';

const ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
};

const MAX_SIZE = 10 * 1024 * 1024;

const UploadCard = ({ selectedFile, onFileSelect, onFileClear, onError }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      setIsDragActive(false);

      if (fileRejections.length > 0) {
        const rejection = fileRejections[0];
        const code = rejection.errors[0]?.code;
        if (code === 'file-too-large') {
          onError('This file exceeds the 10MB limit. Please upload a smaller file.');
        } else if (code === 'file-invalid-type') {
          onError('Unsupported file type. Please upload a PDF, PNG, or JPG file.');
        } else {
          onError('This file could not be accepted. Please try another file.');
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect, onError]
  );

  const { getRootProps, getInputProps, isDragActive: dropzoneDragActive } = useDropzone({
    onDrop,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    multiple: false,
  });

  const active = isDragActive || dropzoneDragActive;

  return (
    <div className="glass-card p-6 sm:p-8">
      <AnimatePresence mode="wait">
        {!selectedFile ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            {...getRootProps()}
            className={`group cursor-pointer rounded-xl2 border-2 border-dashed px-6 py-14 text-center transition-all duration-300 ${
              active
                ? 'border-accent bg-accent/5 shadow-glow-accent'
                : 'border-border hover:border-primary/60 hover:bg-white/[0.03]'
            }`}
          >
            <input {...getInputProps()} />
            <motion.div
              animate={{ y: active ? -6 : 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow"
            >
              <UploadCloud className="h-8 w-8 text-white" />
            </motion.div>
            <p className="mt-5 text-lg font-semibold">
              {active ? 'Drop your file here' : 'Drag & drop your document here'}
            </p>
            <p className="mt-1.5 text-sm text-muted">
              or click to browse — PDF, PNG, or JPG up to 10MB
            </p>
            <span className="btn-secondary mt-6 inline-flex text-sm">
              Browse files
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="file-preview"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="flex items-center justify-between gap-4 rounded-xl2 border border-border bg-white/5 px-5 py-5"
          >
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-primary">
                {selectedFile.type === 'application/pdf' ? (
                  <FileText className="h-6 w-6 text-white" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-white" />
                )}
              </div>
              <div className="min-w-0">
                <p className="truncate font-medium">{selectedFile.name}</p>
                <p className="text-sm text-muted">
                  {fileTypeLabel(selectedFile.type)} &middot;{' '}
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onFileClear}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border text-muted transition hover:bg-white/10 hover:text-ink"
              aria-label="Remove file"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UploadCard;
