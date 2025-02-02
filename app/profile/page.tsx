'use client'

import { useAuthStore } from '@/store/useAuthStore'

const ProfilePage = () => {
  const { user } = useAuthStore()

  return (<div>
    <div>Name: {user?.name}</div>
    <div>Email: {user?.email}</div>
    <div>Creation Time: {user?.creationTime}</div>
  </div>)
}

export default ProfilePage
