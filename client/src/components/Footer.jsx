const Footer = () => {
  return (
    <footer className="border-t border-border mt-24">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted">
          Built with React, Express, and Google Gemini.
        </p>
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} Document Summary Assistant
        </p>
      </div>
    </footer>
  );
};

export default Footer;
