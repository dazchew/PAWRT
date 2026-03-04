interface PawrtLogoProps {
  className?: string
}

export function PawrtLogo({ className = 'w-36' }: PawrtLogoProps) {
  return (
    <img
      src="/logo.png"
      alt="Pawrt"
      className={className}
      draggable={false}
    />
  )
}
