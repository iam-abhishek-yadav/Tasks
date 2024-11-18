// components/AuthFooter.tsx
import { FC } from 'react'
import { Button } from '@/components/ui/button'

interface AuthFooterProps {
  isSignup: boolean
  toggleAuthMode: () => void
}

const AuthFooter: FC<AuthFooterProps> = ({ isSignup, toggleAuthMode }) => (
  <div className="mt-4 text-sm text-center">
    {isSignup ? (
      <>
        Already have an account?{' '}
        <Button variant="link" onClick={toggleAuthMode} className="p-0">
          Sign In
        </Button>
      </>
    ) : (
      <>
        Don&#39;t have an account?{' '}
        <Button variant="link" onClick={toggleAuthMode} className="p-0">
          Create one
        </Button>
      </>
    )}
  </div>
)

export default AuthFooter
