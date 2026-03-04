import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PawrtLogo } from '@/components/PawrtLogo'

export default function Introduction() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/signin', { replace: true })
    }, 2500)
    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-pawrt-bg flex items-center justify-center">
      <PawrtLogo className="w-52" />
    </div>
  )
}
