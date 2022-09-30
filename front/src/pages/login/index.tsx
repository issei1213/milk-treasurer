import { NextPage } from 'next'
import type { FC } from 'react'
import Image from 'next/image'
import { Box, Container } from '@mui/system'
import { TextField, Typography } from '@mui/material'
import { Button } from '~/components/ui/Button'

import { Head } from '~/components/ui/Head'
import { InputWithLabel } from '~/components/ui/Input'
import { grey } from '@mui/material/colors'

const Login: FC = () => {
  return (
    <Container
      maxWidth="sm"
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
      >
        <Box component="div">
          <Image src="/logo.png" width={200} height={150} objectFit="contain" />
        </Box>
        <Typography variant="h5" marginBottom="32px">
          管理画面
        </Typography>

        <Box
          component="section"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="16px"
          width={'100%'}
          marginBottom="32px"
        >
          <Typography variant="h6">ログイン</Typography>
          <Box
            component="form"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="16px"
          >
            <InputWithLabel
              id="email"
              title="メールアドレス"
              required={true}
              type="email"
              error={true}
            />
            <InputWithLabel
              id="password"
              title="パスワード"
              required={true}
              type="password"
            />
          </Box>
        </Box>
        <Button
          color="primary"
          variant={'contained'}
          size="large"
          disabled={false}
          loading={false}
        >
          ログイン
        </Button>
      </Box>
    </Container>
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
