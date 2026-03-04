import { cn } from '@/lib/utils'

interface OrangeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export function OrangeButton({ children, className, disabled, ...props }: OrangeButtonProps) {
  return (
    <button
      className={cn(
        'w-full h-10 rounded-lg font-semibold text-sm text-white transition-opacity',
        disabled
          ? 'bg-pawrt-gray-disabled cursor-not-allowed'
          : 'bg-pawrt-orange active:opacity-80',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}
