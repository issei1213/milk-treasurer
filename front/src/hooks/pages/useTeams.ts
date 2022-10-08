import { useMediaQuery, useTheme } from '@mui/material'
import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import {
  GET_TEAMS,
  GetTeamsQuery,
  GetTeamsQueryArgs,
} from '~/graphql/query/getTeams.query'
import { isString } from '~/utils/isString'

export const useTeams = () => {
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const { data: teamsListData, loading: isLoading } = useQuery<
    GetTeamsQuery,
    GetTeamsQueryArgs
  >(GET_TEAMS, {
    variables: {
      user_id: isString(router.query.userId) ? router.query.userId : '',
    },
  })

  const formatTeamsListData = teamsListData?.teams.map(
    ({ id, name, updated_at, members }) => ({
      id,
      name,
      updatedAt: updated_at,
      countMember: members.length,
    }),
  )

  return {
    theme,
    isMobile,
    isLoading,
    formatTeamsListData,
  }
}
