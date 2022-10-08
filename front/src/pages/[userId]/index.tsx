import type { FC } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
  Typography,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
} from '@mui/material'
import type { NextPage } from 'next'
import { BaseLayout } from '~/components/model/layout'
import { Button } from '~/components/ui/Button'
import { Head } from '~/components/ui/Head'
import { useTeams } from '~/hooks/pages/useTeams'

type Column = {
  id: 'name' | 'countMember' | 'updatedAt' | 'buttonGroup'
  label: string
  minWidth?: number
  align?: 'right' | 'center' | 'left'
}

const COLUMN_LIST: Column[] = [
  { id: 'name', label: '名前', minWidth: 170, align: 'center' },
  { id: 'countMember', label: 'メンバー数', minWidth: 100, align: 'center' },
  { id: 'updatedAt', label: '最終更新日', minWidth: 170, align: 'center' },
  { id: 'buttonGroup', label: '', minWidth: 100, align: 'center' },
]

const Teams: FC = () => {
  const { theme, isMobile, isLoading, formatTeamsListData } = useTeams()

  return (
    <>
      <BaseLayout>
        <Typography variant={isMobile ? 'h5' : 'h4'} marginBottom="24px">
          チームリスト
        </Typography>

        <Paper sx={{ width: '100%', overflow: 'hidden', padding: '16px' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {COLUMN_LIST.map((column) => (
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
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isLoading
                  ? [...Array(2)].map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton animation="wave" height={60} />
                        </TableCell>
                        <TableCell>
                          <Skeleton animation="wave" height={60} />
                        </TableCell>
                        <TableCell>
                          <Skeleton animation="wave" height={60} />
                        </TableCell>
                        <TableCell>
                          <Skeleton animation="wave" height={60} />
                        </TableCell>
                      </TableRow>
                    ))
                  : formatTeamsListData?.map((row, index) => (
                      // 一行文
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
                    ))}
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
