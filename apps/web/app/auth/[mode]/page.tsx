'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import InputField from '@/components/shared/input-field'
import AuthFooter from './authFooter'
import { Spinner } from '@/components/shared/spinner'
import { useAuthStore } from '../store'
import NotFound from '@/app/not-found'

const AuthPage: React.FC = () => {
  const params = useParams()
  const mode: string = Array.isArray(params?.['mode'])
    ? params['mode'][0]
    : params?.['mode'] || 'signin'
  const router = useRouter()

  const {
    formData,
    errors,
    isSubmitting,
    handleChange,
    setSubmitting,
    validateForm,
    resetErrors,
    resetFormData,
  } = useAuthStore()

  const isSignup: boolean = mode === 'signup'

  useEffect(() => {
    resetErrors()
    resetFormData()
  }, [mode, resetErrors, resetFormData])

  if (mode !== 'signup' && mode !== 'signin') return <NotFound />

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setSubmitting(true)

    setTimeout(() => {
      console.log(formData)
      setSubmitting(false)
      resetFormData()
      router.push('/tasks-list')
    }, 2000)
  }

  const toggleAuthMode = () => {
    router.push(`/auth/${isSignup ? 'signin' : 'signup'}`)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md flex flex-col">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="text-center text-2xl font-bold">
            {isSignup ? 'Create an Account' : 'Sign In'}
          </CardTitle>
        </CardHeader>

        <div className="flex flex-col">
          <CardContent className="space-y-4">
            <InputField
              id="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {isSignup && (
              <InputField
                id="confirmPassword"
                label="Confirm Password"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            )}
            {errors && (
              <div className="text-red-500 text-center text-xs">{errors}</div>
            )}
          </CardContent>

          {/* Bottom Footer */}
          <CardFooter className="flex flex-col items-center space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <div className="flex justify-center items-center">
                  <Spinner size="sm" />
                </div>
              ) : isSignup ? (
                'Sign Up'
              ) : (
                'Sign In'
              )}
            </Button>
            <AuthFooter isSignup={isSignup} toggleAuthMode={toggleAuthMode} />
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}

export default AuthPage
