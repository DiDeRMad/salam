export function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <div className="h-px bg-gradient-to-r from-transparent via-primary/60 to-primary w-16 md:w-32" />
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 bg-accent rotate-45" />
        <div className="w-3 h-3 border-2 border-primary rotate-45" />
        <div className="w-4 h-4 bg-primary/30 border-2 border-primary rotate-45 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-accent rotate-0" />
        </div>
        <div className="w-3 h-3 border-2 border-primary rotate-45" />
        <div className="w-2 h-2 bg-accent rotate-45" />
      </div>
      <div className="h-px bg-gradient-to-l from-transparent via-primary/60 to-primary w-16 md:w-32" />
    </div>
  )
}
