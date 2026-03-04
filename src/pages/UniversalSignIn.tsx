import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PawrtLogo } from '@/components/PawrtLogo'
import { TextInput } from '@/components/TextInput'
import { PasswordInput } from '@/components/PasswordInput'
import { OrangeButton } from '@/components/OrangeButton'
import { supabase } from '@/lib/supabase'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EB4335"/>
    </svg>
  )
}

export default function UniversalSignIn() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: false, password: false })
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = { email: !email.trim(), password: !password.trim() }
    setErrors(e)
    return !e.email && !e.password
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setServerError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setServerError(error.message)
    } else {
      navigate('/dashboard')
    }
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }

  const handleApple = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'apple',
      options: { redirectTo: `${window.location.origin}/dashboard` },
    })
  }

  return (
    <div className="min-h-screen bg-pawrt-bg flex flex-col items-center px-6 py-10">
      <PawrtLogo className="w-32 mb-6 mt-4" />

      <h1 className="text-2xl font-bold text-pawrt-navy mb-8">Sign In</h1>

      <form onSubmit={handleSignIn} className="w-full max-w-sm space-y-4">
        <TextInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />

        <PasswordInput
          value={password}
          onChange={setPassword}
          error={errors.password}
        />

        {serverError && (
          <p className="text-pawrt-error text-xs text-center">{serverError}</p>
        )}

        <OrangeButton type="submit" disabled={loading}>
          {loading ? 'Signing in…' : 'Sign In'}
        </OrangeButton>

        <div className="text-center">
          <Link to="/forgot-password" className="text-xs text-pawrt-teal underline">
            Forgot password?
          </Link>
        </div>

        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-pawrt-gray" />
          <span className="text-xs text-pawrt-gray">OR</span>
          <div className="flex-1 h-px bg-pawrt-gray" />
        </div>

        <button
          type="button"
          onClick={handleGoogle}
          className="flex items-center justify-center gap-3 w-full h-10 rounded-lg border border-pawrt-gray bg-white text-pawrt-navy text-sm font-medium active:opacity-80"
        >
          <GoogleIcon />
          Continue with Google
        </button>

        <button
          type="button"
          onClick={handleApple}
          className="flex items-center justify-center gap-3 w-full h-10 rounded-lg border border-pawrt-gray bg-white text-pawrt-navy text-sm font-medium active:opacity-80"
        >
          <img src="/apple-logo.png" alt="Apple" className="w-4 h-4 object-contain" />
          Continue with Apple
        </button>
      </form>

      <p className="mt-8 text-sm text-pawrt-teal">
        Don't have an account?{' '}
        <Link to="/register" className="text-pawrt-navy font-semibold underline">
          Create account
        </Link>
      </p>
    </div>
  )
}
