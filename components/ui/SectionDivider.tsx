type SectionDividerProps = {
  className?: string;
};

export function SectionDivider({ className = '' }: SectionDividerProps) {
  return (
    <div className={`w-full px-4 sm:px-6 lg:px-8 ${className}`.trim()} aria-hidden="true">
      <div className="mx-auto max-w-7xl py-2">
        <div className="h-px bg-linear-to-r from-transparent via-white/60 to-transparent" />
      </div>
    </div>
  );
}
