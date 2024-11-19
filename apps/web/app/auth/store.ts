import { create } from "zustand"
import { FormData } from "./types"
import { INITIAL_FORMDATA } from "./constants"

interface AuthFormState {
  formData: FormData
  errors: string | null
  isSubmitting: boolean
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  setFormData: (data: Partial<AuthFormState["formData"]>) => void
  setError: (field: keyof AuthFormState["errors"], message: string) => void
  validateForm: () => boolean
  resetFormData: () => void
  resetErrors: () => void
  setSubmitting: (isSubmitting: boolean) => void
}

export const useAuthStore = create<AuthFormState>((set, get) => ({
  formData: INITIAL_FORMDATA,
  errors: null,
  isSubmitting: false,
  handleChange: (e) => {
    const { id, value } = e.target
    set((state) => ({ formData: { ...state.formData, [id]: value } }))
  },
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  setError: (message) => set(message),
  validateForm: () => {
    let valid = true
    let newErrors = null

    const state = get()

    if (!state.formData.email || !state.formData.password) {
      newErrors = "Email and password are required"
      valid = false
    }

    if (state.formData.confirmPassword && state.formData.password !== state.formData.confirmPassword) {
      newErrors = "Passwords do not match"
      valid = false
    }

    set({ errors: newErrors })
    return valid
  },
  resetFormData: () => set({ formData: INITIAL_FORMDATA }),
  resetErrors: () => set({ errors: null }),
  setSubmitting: (isSubmitting) => set({ isSubmitting }),
}))
