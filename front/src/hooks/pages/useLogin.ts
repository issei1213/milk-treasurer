import { useCallback, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import yup from '~/libs/yup/locale'

export type LoginFormType = {
  email: string
  password: string
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
  const { control, handleSubmit } = useForm<LoginFormType>({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<LoginFormType> = useCallback((data) => {
    console.log(data)
  }, [])

  return {
    onSubmit,
    control,
    handleSubmit,
    isShowPassword,
    setIsShowPassword,
  } as const
}
