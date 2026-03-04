import { cn } from '@/lib/utils'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
}

export function TextInput({ error, className, ...props }: TextInputProps) {
  return (
    <input
      className={cn(
        'w-full h-10 px-4 rounded-lg border text-sm outline-none transition-colors',
        'placeholder:text-pawrt-gray-placeholder',
        error
          ? 'border-pawrt-error bg-pawrt-error-bg'
          : 'border-pawrt-navy bg-white focus:border-pawrt-blue',
        className
      )}
      {...props}
    />
  )
}
