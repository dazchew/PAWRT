import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, Upload, Camera, FileText } from 'lucide-react'
import { PawrtLogo } from '@/components/PawrtLogo'
import { OrangeButton } from '@/components/OrangeButton'
import { useRegistrationStore, type UserRole } from '@/store/registrationStore'
import { cn } from '@/lib/utils'

const ROLES: { id: UserRole; label: string; isProfessional: boolean }[] = [
  { id: 'pet_owner', label: 'Pet Owner', isProfessional: false },
  { id: 'vet', label: 'Vet', isProfessional: true },
  { id: 'vet_tech', label: 'Vet Technician', isProfessional: true },
  { id: 'groomer', label: 'Pet Groomer', isProfessional: true },
]

const ACCEPTED_TYPES = '.pdf,.jpg,.jpeg,.png,.heic,.tiff'
const MAX_FILE_SIZE_MB = 10
const MAX_FILES_PER_ROLE = 5

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

interface DocUploadProps {
  role: UserRole
}

function DocUpload({ role }: DocUploadProps) {
  const { certDocuments, addCertDoc, removeCertDoc } = useRegistrationStore()
  const roleDocs = certDocuments.filter((d) => d.role === role)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (files: FileList | null) => {
    if (!files) return
    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`"${file.name}" exceeds ${MAX_FILE_SIZE_MB} MB limit.`)
        return
      }
      if (roleDocs.length >= MAX_FILES_PER_ROLE) {
        alert(`Maximum ${MAX_FILES_PER_ROLE} documents per role.`)
        return
      }
      addCertDoc(role, file)
    })
  }

  return (
    <div className="mt-3 ml-12 space-y-3">
      <p className="text-xs text-pawrt-teal">
        Upload your certification documents (PDF, JPG, PNG, HEIC, TIFF — max {MAX_FILE_SIZE_MB} MB each, up to {MAX_FILES_PER_ROLE} files)
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-pawrt-blue text-pawrt-blue text-xs font-medium"
        >
          <Upload size={14} />
          Upload File
        </button>
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-pawrt-blue text-pawrt-blue text-xs font-medium"
        >
          <Camera size={14} />
          Take Photo
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {roleDocs.length > 0 && (
        <div className="space-y-1.5">
          {roleDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 border border-pawrt-gray"
            >
              <FileText size={14} className="text-pawrt-blue shrink-0" />
              <span className="text-xs text-pawrt-navy truncate flex-1">{doc.file.name}</span>
              <span className="text-xs text-pawrt-gray shrink-0">{formatFileSize(doc.file.size)}</span>
              <button
                type="button"
                onClick={() => removeCertDoc(doc.id)}
                className="text-pawrt-error shrink-0"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function SelectRole() {
  const navigate = useNavigate()
  const { selectedRoles, toggleRole } = useRegistrationStore()

  const hasSelection = selectedRoles.length > 0
  const hasProfessionalRole = selectedRoles.some((r) => r !== 'pet_owner')

  const handleContinue = () => {
    if (hasProfessionalRole) {
      navigate('/register/verify-pro')
    } else {
      navigate('/register/verify-owner')
    }
  }

  return (
    <div className="min-h-screen bg-pawrt-bg flex flex-col items-center px-6 py-10">
      <PawrtLogo className="w-32 mb-6 mt-4" />

      <h1 className="text-2xl font-bold text-pawrt-navy mb-2">Select Your Role</h1>
      <p className="text-sm text-pawrt-teal mb-6 text-center">
        You can select multiple roles
      </p>

      <div className="w-full max-w-sm space-y-3">
        {ROLES.map((role) => {
          const selected = selectedRoles.includes(role.id)
          return (
            <div key={role.id}>
              <button
                type="button"
                onClick={() => toggleRole(role.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-colors text-left',
                  selected
                    ? 'border-pawrt-blue bg-pawrt-blue/10'
                    : 'border-pawrt-gray-border bg-white'
                )}
              >
                {/* Checkbox */}
                <div
                  className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors',
                    selected ? 'bg-pawrt-blue border-pawrt-blue' : 'border-pawrt-gray'
                  )}
                >
                  {selected && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>

                <span className="text-sm font-medium text-pawrt-navy flex-1">{role.label}</span>

                {role.isProfessional && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-pawrt-blue-role text-pawrt-navy font-medium">
                    Professional
                  </span>
                )}
              </button>

              {selected && role.isProfessional && <DocUpload role={role.id} />}
            </div>
          )
        })}

        <div className="pt-4">
          <OrangeButton onClick={handleContinue} disabled={!hasSelection}>
            Continue
          </OrangeButton>
        </div>
      </div>
    </div>
  )
}
