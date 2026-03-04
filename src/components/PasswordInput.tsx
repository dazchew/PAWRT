import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PasswordInputProps {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  error?: boolean
  className?: string
}

export function PasswordInput({
  value,
  onChange,
  placeholder = 'Password',
  error,
  className,
}: PasswordInputProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="relative">
      <input
        type={show ? 'text' : 'password'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          'w-full h-10 px-4 pr-12 rounded-lg border text-sm outline-none transition-colors',
          'placeholder:text-pawrt-gray-placeholder',
          error
            ? 'border-pawrt-error bg-pawrt-error-bg'
            : 'border-pawrt-navy bg-white focus:border-pawrt-blue',
          className
        )}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-pawrt-blue-ring"
        tabIndex={-1}
      >
        {show ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}
