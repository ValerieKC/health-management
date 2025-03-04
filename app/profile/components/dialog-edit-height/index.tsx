import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from '@/components/ui/dialog'
import HMButton from '@/components/ui/HMButton'
import HMText from '@/components/ui/HMText'
import { useUserInfoStore } from '@/store/useUserInfoStore'
import { DialogCloseTrigger, Stack } from '@chakra-ui/react'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useAuthStore } from '@/store/useAuthStore'
interface DialogEditHeightProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}
const DialogEditHeight = ({isOpen, setIsOpen}: DialogEditHeightProps) => {
  const { userInfo, setUserInfo } = useUserInfoStore()
  const { auth } = useAuthStore()
  const [height, setHeight] = useState(userInfo?.height || '')
  const userRef = useMemo(() => {
    return auth?.uid ? doc(db, 'users', auth.uid) : null
  }, [auth?.uid])
  const handleInputHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setHeight(value)
    }
  }
  const handleUpdateHeight = async () => {
    if(!userRef) return
    try {
      await updateDoc(userRef, {
        height: height,
      })
      setUserInfo({...userInfo, height})
    } catch (error) {
      console.error('Error updating height:', error)
    }
  }
  const isDisabledBtn = useMemo(() => {
    return height === userInfo?.height
  }, [height, userInfo?.height])
  return (
    <DialogRoot lazyMount open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-size-3 font-bold'>Complete Your Body Data</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap="4">
            <div>
              <HMText level={2}className="mb-2" fontWeight="600">Height(cm)</HMText>
              <input type="text" value={height} onChange={handleInputHeight} className='w-full' />
            </div>          
          </Stack>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <HMButton theme="primary" onClick={handleUpdateHeight} disabled={isDisabledBtn}>Save</HMButton>
          </DialogActionTrigger>
          <HMButton theme="outline" onClick={() => setIsOpen(false)}>Cancel</HMButton>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
export default DialogEditHeight