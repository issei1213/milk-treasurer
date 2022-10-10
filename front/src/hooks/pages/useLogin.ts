import { useCallback, useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from '@firebase/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { AlertColor } from '@mui/material'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import { app } from '~/libs/firebase'
import yup from '~/libs/yup/locale'
import { isFirebaseError } from '~/types/firebase'
import { setLocalStorage } from '~/utils/localstorage'

export type LoginFormType = {
  email: string
  password: string
}

type StatusType = 'loading' | undefined

type SnackStateType = {
  isOpen: boolean
  type?: AlertColor
  message: string
}

const loginFormSchema = yup
  .object()
  .required()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().min(8).required(),
  })

export const useLogin = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  const [status, setStatus] = useState<StatusType>(undefined)
  const { replace } = useRouter()
  const [toastState, setToastState] = useState<SnackStateType>({
    isOpen: false,
    type: 'error',
    message: '',
  })
  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const auth = getAuth(app)

  const onSubmit: SubmitHandler<LoginFormType> = useCallback(
    async ({ email, password }) => {
      setStatus('loading')

      try {
        const {
          user: { uid: userId },
        } = await signInWithEmailAndPassword(auth, email, password)
        const token = await auth.currentUser?.getIdToken(true)

        if (!token) return
        await setLocalStorage('token', token)

        await replace({
          pathname: `/${userId}`,
        })

      } catch (error) {
        if (!(error instanceof Error && isFirebaseError(error))) return

        let message = ''
        switch (error.code) {
          case 'auth/invalid-email':
            message = 'メールアドレスが間違っています'
            break
          case 'auth/user-not-found':
            message = 'ユーザーが存在しません'
            break
          case 'auth/wrong-password':
            message = 'パスワードが誤っています'
            break
          case 'auth/too-many-requests':
            message = 'パスワードの上限回数に達しました。管理者にご連絡ください'
            break
          default:
            message = '不具合が発生しました。管理者にご連絡ください。'
        }

        setToastState({
          isOpen: true,
          type: 'error',
          message,
        })
      } finally {
        // 成功・失敗にかかわらずローディング処理を解除
        setStatus(undefined)
      }
    },
    [auth, replace],
  )

  const onCloseToast = useCallback(() => {
    setToastState({
      isOpen: false,
      type: undefined,
      message: '',
    })
  }, [])

  return {
    onSubmit,
    control,
    handleSubmit,
    isShowPassword,
    setIsShowPassword,
    status,
    setStatus,
    toastState,
    onCloseToast,
  } as const
}
