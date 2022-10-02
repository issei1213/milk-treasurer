import { FC, memo, ReactNode } from 'react'
import { Box, Container } from '@mui/material'
import { Header } from '~/components/model/layout/Header'

type Props = {
  children?: ReactNode
}

export const BaseLayout: FC<Props> = memo(({ children }) => {
  return (
    <>
      <Header />
      <Box component="main" sx={{ p: 3 }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </>
  )
})

BaseLayout.displayName = 'BaseLayout'
