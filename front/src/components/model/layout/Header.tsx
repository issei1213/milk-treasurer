import { FC, memo } from 'react'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material'
import { red } from '@mui/material/colors'
import Image from 'next/image'
import Link from 'next/link'
import { useHeader } from '~/hooks/model/layout/useHeader'

const NAV_LIST = ['']

export const Header: FC = memo(() => {
  const { logOut, anchorElUser, handleOpenUserMenu, handleCloseUserMenu } =
    useHeader()

  const userMenuList = [
    {
      title: 'ログアウト',
      onClick: async () => {
        await logOut()
        handleCloseUserMenu()
      },
    },
  ]

  return (
    <Box component="header">
      <AppBar component="nav" sx={{ background: red[100] }} position="relative">
        <Toolbar>
          <Box component="div" sx={{ flexGrow: 1 }}>
            <Link href="/teams">
              <a>
                <Image
                  src="/header_logo.png"
                  alt=""
                  width={150}
                  height={30}
                  objectFit="contain"
                />
              </a>
            </Link>
          </Box>
          <Box>
            {NAV_LIST.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/user_for_avatar.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenuList.map(({ title, onClick }, index) => (
                <MenuItem key={index} onClick={onClick}>
                  <Typography textAlign="center">{title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
})

Header.displayName = 'Header'
