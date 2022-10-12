import { useCallback, useState, MouseEvent } from 'react'
import { getAuth, signOut } from '@firebase/auth'
import { useRouter } from 'next/router'
import { toastStateVar } from '~/graphql/cache'
import { app } from '~/libs/firebase'
import { removeLocalStorage } from '~/utils/localstorage'

export const useHeader = () => {
  const auth = getAuth(app)
  const { push, query } = useRouter()
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const logOut = useCallback(async () => {
    try {
      await removeLocalStorage('token')
      await signOut(auth)
      await push({ pathname: '/login' })
      toastStateVar({
        isOpen: true,
        type: 'success',
        message: 'ログアウトしました',
      })
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

  const onClickLogo = useCallback(async () => {
    await push({
      pathname: `/${query.userId}`,
    })
  }, [push])

  return {
    logOut,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    onClickLogo,
  } as const
}
