import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PawrtLogo } from '@/components/PawrtLogo'
import { SingpassButton } from '@/components/SingpassButton'
import { useRegistrationStore } from '@/store/registrationStore'

const SINGPASS_AUTH_URL = 'https://api.singpass.gov.sg/auth'

export default function OwnerVerify() {
  const navigate = useNavigate()
  const { reset } = useRegistrationStore()
  const [loading, setLoading] = useState(false)

  const handleSingpass = () => {
    setLoading(true)
    // Production: redirect to Singpass OIDC endpoint
    // On Capacitor: use @capacitor/browser
    setTimeout(() => {
      setLoading(false)
      reset()
      navigate('/signin', { replace: true })
    }, 1500)

    console.log('Singpass auth URL:', SINGPASS_AUTH_URL)
  }

  return (
    <div className="min-h-screen bg-pawrt-bg flex flex-col items-center px-6 py-10">
      <PawrtLogo className="w-32 mb-6 mt-4" />

      <h1 className="text-2xl font-bold text-pawrt-navy mb-2">Verify Your Identity</h1>
      <p className="text-sm text-pawrt-teal mb-8 text-center max-w-xs">
        Please verify your identity with Singpass to complete your registration as a Pet Owner.
      </p>

      <div className="w-full max-w-sm">
        <SingpassButton onClick={handleSingpass} loading={loading} />
      </div>
    </div>
  )
}
