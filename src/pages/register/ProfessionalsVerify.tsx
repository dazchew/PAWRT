import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PawrtLogo } from '@/components/PawrtLogo'
import { SingpassButton } from '@/components/SingpassButton'

const SINGPASS_AUTH_URL = 'https://api.singpass.gov.sg/auth'

export default function ProfessionalsVerify() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSingpass = () => {
    setLoading(true)
    // In production: redirect to Singpass OIDC authorization endpoint
    // On Capacitor native: use @capacitor/browser to open in-app
    // For now, simulate success and move to complete screen
    setTimeout(() => {
      setLoading(false)
      navigate('/register/complete-pro')
    }, 1500)

    // Production implementation:
    // window.location.href = `${SINGPASS_AUTH_URL}?...oidc_params...`
    console.log('Singpass auth URL:', SINGPASS_AUTH_URL)
  }

  return (
    <div className="min-h-screen bg-pawrt-bg flex flex-col items-center px-6 py-10">
      <PawrtLogo className="w-32 mb-6 mt-4" />

      <h1 className="text-2xl font-bold text-pawrt-navy mb-2">Verify Your Identity</h1>
      <p className="text-sm text-pawrt-teal mb-8 text-center">
        Professional verification required
      </p>

      {/* Lavender instruction card — matches Figma #CCC1FF block */}
      <div className="w-full max-w-sm rounded-2xl p-5 mb-8" style={{ backgroundColor: '#CCC1FF' }}>
        <h2 className="text-base font-bold text-pawrt-navy mb-2">
          Why do we need Singpass?
        </h2>
        <p className="text-sm text-pawrt-navy leading-relaxed">
          As a registered professional, we need to verify your identity and credentials using Singpass — Singapore's national digital identity platform.
        </p>
        <ul className="mt-3 space-y-1 text-sm text-pawrt-navy list-disc list-inside">
          <li>Confirm your professional registration</li>
          <li>Protect pet owners using our platform</li>
          <li>Enable faster certification review</li>
        </ul>
      </div>

      <div className="w-full max-w-sm">
        <SingpassButton onClick={handleSingpass} loading={loading} />
      </div>
    </div>
  )
}
