import { FC } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { Typography, useMediaQuery, useTheme, Stack } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { NextPage } from 'next'
import { BaseLayout } from '~/components/model/layout'
import { Button } from '~/components/ui/Button'
import { Head } from '~/components/ui/Head'

type Column = {
  id: 'name' | 'countMember' | 'updateAt' | 'buttonGroup'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

const COLUMN_LIST: Column[] = [
  { id: 'name', label: '名前', minWidth: 170, align: 'center' },
  { id: 'countMember', label: 'メンバー数', minWidth: 100, align: 'center' },
  { id: 'updateAt', label: '最終更新日', minWidth: 170, align: 'center' },
  { id: 'buttonGroup', label: '', minWidth: 100, align: 'center' },
]

const ROW_LIST = [
  {
    id: '1',
    name: 'Aチームメンバー',
    countMember: 30,
    updateAt: '2020/12/31 18:00',
  },
  {
    id: '2',
    name: 'Bチームメンバー',
    countMember: 10,
    updateAt: '2020/12/31 18:00',
  },
  {
    id: '3',
    name: 'Cチームメンバー',
    countMember: 9,
    updateAt: '2020/12/31 18:00',
  },
]

const Teams: FC = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <BaseLayout>
        <Typography variant={isMobile ? 'h5' : 'h4'} marginBottom="24px">
          クラブチームリスト一覧
        </Typography>
        <Paper sx={{ width: '100%', overflow: 'hidden', padding: '16px' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {COLUMN_LIST.map((column) => (
                    <>
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          background: theme.palette.common.white,
                        }}
                      >
                        {column.label}
                      </TableCell>
                    </>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {/* 一行毎 */}
                {ROW_LIST.map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {COLUMN_LIST.map((column) => {
                        // ButtonGroupは共通化のための、このループでは表示しない
                        if (column.id === 'buttonGroup') return null

                        // カラムの内容からrowsのどの値かを取り出す
                        const value = row[column.id]

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        )
                      })}

                      <TableCell key="buttonGroup">
                        <Stack
                          spacing={1}
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            endIcon={<ArrowRightIcon />}
                          >
                            会計画面
                          </Button>
                          <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            endIcon={<ArrowRightIcon />}
                          >
                            メンバー一覧
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </BaseLayout>
    </>
  )
}

const Index: NextPage = () => {
  return (
    <>
      <Head title="クラブチームリスト" />
      <Teams />
    </>
  )
}

export default Index
