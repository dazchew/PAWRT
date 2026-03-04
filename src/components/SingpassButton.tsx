interface SingpassButtonProps {
  onClick: () => void
  loading?: boolean
}

export function SingpassButton({ onClick, loading }: SingpassButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="flex items-center justify-center gap-3 w-full h-14 rounded-xl border-4 border-pawrt-navy bg-white active:opacity-80 transition-opacity"
    >
      <img src="/singpass-logo.png" alt="Singpass" className="h-8 object-contain" />
      <span className="text-pawrt-navy font-semibold text-sm">
        {loading ? 'Redirecting…' : 'Verify with Singpass'}
      </span>
    </button>
  )
}
