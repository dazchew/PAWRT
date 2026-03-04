import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Introduction from '@/pages/Introduction'
import UniversalSignIn from '@/pages/UniversalSignIn'
import UniversalSignUp from '@/pages/register/UniversalSignUp'
import SelectRole from '@/pages/register/SelectRole'
import ProfessionalsVerify from '@/pages/register/ProfessionalsVerify'
import ProfessionalsComplete from '@/pages/register/ProfessionalsComplete'
import OwnerVerify from '@/pages/register/OwnerVerify'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Introduction />} />
        <Route path="/signin" element={<UniversalSignIn />} />
        <Route path="/register" element={<UniversalSignUp />} />
        <Route path="/register/select-role" element={<SelectRole />} />
        <Route path="/register/verify-pro" element={<ProfessionalsVerify />} />
        <Route path="/register/complete-pro" element={<ProfessionalsComplete />} />
        <Route path="/register/verify-owner" element={<OwnerVerify />} />
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
