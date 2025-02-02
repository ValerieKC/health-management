'use client'

import { Suspense } from 'react'
import AuthContent from './auth-content'

const Auth = () => {
  
  return (
    <Suspense fallback={<div>...Loading</div>}> 
      <AuthContent />
    </Suspense>)
}
export default Auth