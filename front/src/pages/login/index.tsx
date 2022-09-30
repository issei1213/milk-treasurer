import { NextPage } from 'next'
import type { FC } from 'react'
import Image from 'next/image'
import { Box, Container } from '@mui/system'
import { TextField, Typography } from '@mui/material'
import { Button } from '~/components/ui/Button'

import { Head } from '~/components/ui/Head'

const Login: FC = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
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
        <Typography variant="h5" marginBottom="28px">
          管理画面
        </Typography>

        <Box
          component="section"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="16px"
          width={'100%'}
          marginBottom="16px"
        >
          <Typography variant="h6" marginBottom="16px">
            ログイン
          </Typography>
          <Box
            component="form"
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap="16px"
          >
            <TextField
              id="email"
              type="email"
              label="メールアドレス"
              InputLabelProps={{ shrink: true }}
              required={true}
              fullWidth={true}
            />
            <TextField
              id="password"
              type="password"
              label="パスワード"
              InputLabelProps={{ shrink: true }}
              required={true}
              fullWidth={true}
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
