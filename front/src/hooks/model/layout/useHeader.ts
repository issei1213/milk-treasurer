import { useCallback, useState, MouseEvent } from 'react'
import { getAuth, signOut } from '@firebase/auth'
import { useRouter } from 'next/router'
import { app } from '~/libs/firebase'

export const useHeader = () => {
  const auth = getAuth(app)
  const { push } = useRouter()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const logOut = useCallback(async () => {
    try {
      await signOut(auth)
      await push('/login')
    } catch (error) {
      console.error(error)
    }
  }, [auth, push])

  const handleOpenUserMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }, [])

  const handleCloseUserMenu = useCallback(() => {
    setAnchorElUser(null)
  }, [])

  return {
    logOut,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
  } as const
}
