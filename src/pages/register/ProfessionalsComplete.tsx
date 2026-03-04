import { useNavigate } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'
import { PawrtLogo } from '@/components/PawrtLogo'
import { useRegistrationStore } from '@/store/registrationStore'

export default function ProfessionalsComplete() {
  const navigate = useNavigate()
  const { reset } = useRegistrationStore()

  const handleDone = () => {
    reset()
    navigate('/signin', { replace: true })
  }

  return (
    <div className="min-h-screen bg-pawrt-bg flex flex-col items-center justify-center px-6 py-10">
      <PawrtLogo className="w-32 mb-8" />

      <CheckCircle size={64} className="text-pawrt-blue mb-6" strokeWidth={1.5} />

      <h1 className="text-2xl font-bold text-pawrt-navy text-center mb-3">
        Registration Complete!
      </h1>
      <p className="text-sm text-pawrt-teal text-center mb-10 leading-relaxed max-w-xs">
        Your account has been created and your certification documents are under review. We'll notify you once approved.
      </p>

      <button
        onClick={handleDone}
        className="w-full max-w-sm h-10 rounded-lg bg-pawrt-blue text-white font-semibold text-sm active:opacity-80"
      >
        Done
      </button>
    </div>
  )
}
