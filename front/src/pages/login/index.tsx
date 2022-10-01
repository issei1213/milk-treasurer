import type { FC } from 'react'
import { Typography, Box, Container } from '@mui/material'
import Image from 'next/image'
import type { NextPage } from 'next'
import { LoginForm } from '~/components/model/auth'
import { Button } from '~/components/ui/Button'
import { Head } from '~/components/ui/Head'
import { Toast } from '~/components/ui/Toast'
import { useLogin } from '~/hooks/pages/useLogin'

const Login: FC = () => {
  const {
    control,
    handleSubmit,
    onSubmit,
    isShowPassword,
    setIsShowPassword,
    status,
    toastState,
    onCloseToast,
  } = useLogin()

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '90vh',
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          width="100%"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box component="div">
            <Image
              src="/logo.png"
              width={200}
              height={150}
              objectFit="contain"
            />
          </Box>

          <Box
            component="section"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="16px"
            width="100%"
          >
            <Typography variant="h6">ログイン</Typography>
            <Box
              component="form"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="16px"
              width="100%"
            >
              <LoginForm
                control={control}
                isShowPassword={isShowPassword}
                onChangePasswordCheckbox={() =>
                  setIsShowPassword(!isShowPassword)
                }
              />

              <Box component="div" marginTop="16px">
                <Button
                  color="primary"
                  variant={'contained'}
                  size="large"
                  type="submit"
                  loading={status === 'loading'}
                  disabled={status === 'loading'}
                >
                  ログイン
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      <Toast
        open={toastState.isOpen}
        onClose={onCloseToast}
        message={toastState.message}
        type={toastState.type}
      />
    </>
  )
}

const Index: NextPage = () => {
  return (
    <>
      <Head title="ログイン" />
      <Login />
    </>
  )
}

export default Index
