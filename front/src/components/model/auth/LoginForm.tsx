import type { FC } from 'react'
import { memo } from 'react'
import { Checkbox, FormControlLabel } from '@mui/material'
import { Control, Controller } from 'react-hook-form'
import { InputWithLabel } from '~/components/ui/Input'
import { LoginFormType } from '~/hooks/pages/useLogin'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<LoginFormType>
  isShowPassword: boolean
  onChangePasswordCheckbox: () => void
}

export const LoginForm: FC<Props> = memo(
  ({ control, isShowPassword, onChangePasswordCheckbox }) => {
    return (
      <>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithLabel
              id="email"
              title="メールアドレス"
              required={true}
              type="email"
              error={!!error?.message}
              errormessage={error?.message}
              autoComplete="on"
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <InputWithLabel
              id="password"
              title="パスワード"
              required={true}
              type={isShowPassword ? 'text' : 'password'}
              error={!!error?.message}
              errormessage={error?.message}
              autoComplete="on"
              {...field}
            >
              <FormControlLabel
                control={<Checkbox defaultChecked checked={isShowPassword} />}
                label="パスワードを表示する"
                onChange={onChangePasswordCheckbox}
              />
            </InputWithLabel>
          )}
        />
      </>
    )
  },
)

LoginForm.displayName = 'LoginForm'
