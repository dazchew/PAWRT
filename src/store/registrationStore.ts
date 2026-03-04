import { create } from 'zustand'

export type UserRole = 'vet' | 'vet_tech' | 'groomer' | 'pet_owner'

export interface CertDocument {
  role: UserRole
  file: File
  id: string
}

interface RegistrationState {
  name: string
  email: string
  phone: string
  password: string
  faceIdEnabled: boolean
  selectedRoles: UserRole[]
  certDocuments: CertDocument[]

  setField: <K extends keyof Omit<RegistrationState, 'setField' | 'toggleRole' | 'addCertDoc' | 'removeCertDoc' | 'reset' | 'certDocuments' | 'selectedRoles'>>(
    key: K,
    value: RegistrationState[K]
  ) => void
  toggleRole: (role: UserRole) => void
  addCertDoc: (role: UserRole, file: File) => void
  removeCertDoc: (id: string) => void
  reset: () => void
}

const initialState = {
  name: '',
  email: '',
  phone: '',
  password: '',
  faceIdEnabled: false,
  selectedRoles: [] as UserRole[],
  certDocuments: [] as CertDocument[],
}

export const useRegistrationStore = create<RegistrationState>((set) => ({
  ...initialState,

  setField: (key, value) => set({ [key]: value }),

  toggleRole: (role) =>
    set((state) => ({
      selectedRoles: state.selectedRoles.includes(role)
        ? state.selectedRoles.filter((r) => r !== role)
        : [...state.selectedRoles, role],
    })),

  addCertDoc: (role, file) =>
    set((state) => ({
      certDocuments: [
        ...state.certDocuments,
        { role, file, id: `${Date.now()}-${Math.random()}` },
      ],
    })),

  removeCertDoc: (id) =>
    set((state) => ({
      certDocuments: state.certDocuments.filter((d) => d.id !== id),
    })),

  reset: () => set(initialState),
}))
