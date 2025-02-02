'use client'

import { Suspense } from 'react'
import AuthContent from './auth-content'

const Auth = () => {
  
  return (
    <Suspense fallback={null}> 
      <AuthContent />
    </Suspense>)
}
export default Auth