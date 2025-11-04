export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-ink py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center text-xs text-cloud/60 sm:flex-row sm:text-left">
        <p>&copy; {new Date().getFullYear()} KBB. Rail-agnostic • Audit-ready • Delivery-versus-Payment.</p>
        <div className="flex gap-4">
          <a href="#how-it-works" className="hover:text-white">
            How it works
          </a>
          <a href="#features" className="hover:text-white">
            Features
          </a>
          <a href="#demo" className="hover:text-white">
            Demo
          </a>
        </div>
      </div>
    </footer>
  );
}
