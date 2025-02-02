import { Field } from '@/components/ui/field'
import { Button, Input, Stack } from '@chakra-ui/react'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { auth, googleProvider } from '@/lib/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@chakra-ui/toast'
import { useAuthStore } from '@/store/useAuthStore'

interface FormValues {
  email: string
  password: string
}
const defaultValues: FormValues = {
  email: '',
  password: '',
}
const AuthContent = () => {
  const { login } = useAuthStore()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const isSignUp = searchParams.get('step') === 'register'
  const toast = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({defaultValues})

  const handleAuth = async (data: FormValues) => {
    try {
      setIsLoading(true)
      if (isSignUp) {
        const user = await createUserWithEmailAndPassword(auth, data.email, data.password)
        login({
          id: user.user.uid,
          name: user.user.displayName || '',
          email: user.user.email || '',
          creationTime: user.user.metadata.creationTime || '',
        })
        toast({
          title: '註冊成功',
          status: 'success',
        })
      } else {
        const user = await signInWithEmailAndPassword(auth, data.email, data.password)
        login({
          id: user.user.uid,
          name: user.user.displayName || '',
          email: user.user.email || '',
          creationTime: user.user.metadata.creationTime || '',
        })
        toast({
          title: '登入成功',
          status: 'success',
        })
      }
      router.push('/profile')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: error.message,
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      const user = await signInWithPopup(auth, googleProvider)
      login({
        id: user.user.uid,
        name: user.user.displayName || '',
        email: user.user.email || '',
        creationTime: user.user.metadata.creationTime || '',
      })
      
      toast({
        title: '登入成功',
        status: 'success',
      })
      router.push('/profile')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: error.message,
        status: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full h-[calc(100vh-100px)] max-lg:h-[calc(100vh-64px)] flex justify-center bg-secondary p-6">
      <div className="bg-white rounded-2xl p-12 w-[560px] h-fit">
        <div className="text-size-7 mb-8 font-bold">{isSignUp ? '註冊' : '登入'}</div>
        <form onSubmit={handleSubmit(handleAuth)}>
          <Stack gap="8" align="flex-start" w="full">
            <Field
              label="E-mail"
              invalid={!!errors.email}
              errorText={errors.email?.message}
            >
              <Input
                {...register('email', { required: 'Email is required' })} variant="outline" borderWidth="1px" padding="16px" />
            </Field>
            <Field
              label="Password"
              invalid={!!errors.password}
              errorText={errors.password?.message}
            >
              <Input
                {...register('password', { required: 'Password is required' })} variant="outline" borderWidth="1px" padding="16px" type="password"
              />
            </Field>
            <Button 
              type="submit" 
              variant="solid" 
              className="bg-primary-200 text-white font-bold w-[80%] rounded-2xl mx-auto"
              loading={isLoading}
            >
              {isSignUp ? '註冊' : '登入'}
            </Button>
          </Stack>
        </form>
        <div className="flex items-center justify-between my-8">
          <div className="w-[calc(50%-60px)] h-[1px] bg-[#494A4D]"></div>
          <div className="text-[#494a4D] text-size-1">或</div>
          <div className="w-[calc(50%-60px)] h-[1px] bg-[#494A4D]"></div>
        </div>
        <Button         
          onClick={handleGoogleSignIn}
          variant="outline"
          w="full"
          loading={isLoading}
          className="border-[1px] rounded-2xl"
        >
          {isSignUp ? '使用Google帳號註冊' : '使用Google帳號登入'}
          <FcGoogle />
        </Button>
        <div className="text-center mt-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/auth?step=${isSignUp ? 'login' : 'register'}`)}
          >
            {isSignUp ? '已有帳號？登入' : '還沒有帳號？註冊'}
          </Button>
        </div>
      </div>
    </div>
  )
}
export default AuthContent