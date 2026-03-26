export function Footer() {
  return (
    <footer className="relative mt-8 w-full overflow-hidden border-y border-white/5 bg-neutral">
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-0.5 bg-linear-to-r from-transparent via-[rgba(212,175,55,0.85)] to-transparent" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 30% 0%, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 30%, rgba(255, 255, 255, 0) 72%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-highlight">Velris Studio LLC</p>
            <p className="mt-1.5 font-sans text-sm text-secondary">Placeholder HQ: King Fahd Road, Riyadh, Saudi Arabia</p>
          </div>

          <p className="font-sans text-sm text-white">
            +966 50 000 0000
            <span className="px-3 text-secondary">|</span>
            hello@velrisstudio.com
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-1 border-t border-white/10 pt-3 font-sans text-xs text-secondary sm:flex-row sm:items-center sm:justify-between">
          <p>Commercial Registration: 0000000000 | VAT: 300000000000003</p>
          <p>2026 Velris Studio LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
