import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PawrtLogo } from '@/components/PawrtLogo'
import { TextInput } from '@/components/TextInput'
import { PasswordInput } from '@/components/PasswordInput'
import { OrangeButton } from '@/components/OrangeButton'
import { supabase } from '@/lib/supabase'
import { useRegistrationStore } from '@/store/registrationStore'

export default function UniversalSignUp() {
  const navigate = useNavigate()
  const store = useRegistrationStore()

  const [name, setName] = useState(store.name)
  const [email, setEmail] = useState(store.email)
  const [phone, setPhone] = useState(store.phone)
  const [password, setPassword] = useState(store.password)
  const [confirmPassword, setConfirmPassword] = useState('')
  const [faceId, setFaceId] = useState(store.faceIdEnabled)
  const [errors, setErrors] = useState({
    name: false, email: false, phone: false,
    password: false, confirmPassword: false,
  })
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {
      name: !name.trim(),
      email: !email.trim() || !/\S+@\S+\.\S+/.test(email),
      phone: !phone.trim(),
      password: password.length < 8,
      confirmPassword: password !== confirmPassword,
    }
    setErrors(e)
    return !Object.values(e).some(Boolean)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    setServerError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name, phone } },
    })

    setLoading(false)
    if (error) {
      setServerError(error.message)
      return
    }

    store.setField('name', name)
    store.setField('email', email)
    store.setField('phone', phone)
    store.setField('password', password)
    store.setField('faceIdEnabled', faceId)
    navigate('/register/select-role')
  }

  return (
    <div className="min-h-screen bg-pawrt-bg flex flex-col items-center px-6 py-10">
      <PawrtLogo className="w-32 mb-6 mt-4" />

      <h1 className="text-2xl font-bold text-pawrt-navy mb-8">Create Account</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <TextInput
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          autoComplete="name"
        />

        <TextInput
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          autoComplete="email"
        />

        <TextInput
          type="tel"
          placeholder="Mobile Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={errors.phone}
          autoComplete="tel"
        />

        <PasswordInput
          value={password}
          onChange={setPassword}
          placeholder="Password (min 8 characters)"
          error={errors.password}
        />

        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="Confirm Password"
          error={errors.confirmPassword}
        />
        {errors.confirmPassword && (
          <p className="text-pawrt-error text-xs -mt-2">Passwords do not match</p>
        )}

        {/* Face ID toggle */}
        <div className="flex items-center justify-between py-1">
          <span className="text-sm text-pawrt-navy">Enable Face ID</span>
          <button
            type="button"
            onClick={() => setFaceId((v) => !v)}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              faceId ? 'bg-pawrt-blue-ring' : 'bg-pawrt-gray-border'
            }`}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                faceId ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {serverError && (
          <p className="text-pawrt-error text-xs text-center">{serverError}</p>
        )}

        <OrangeButton type="submit" disabled={loading}>
          {loading ? 'Creating account…' : 'Create Account'}
        </OrangeButton>
      </form>

      <p className="mt-8 text-sm text-pawrt-teal">
        Already have an account?{' '}
        <Link to="/signin" className="text-pawrt-navy font-semibold underline">
          Sign In
        </Link>
      </p>
    </div>
  )
}
