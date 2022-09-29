import { gql } from '@apollo/client'

// TEST
export const GET_USER = gql`
  query GET_USERS {
    users {
      id
      name
    }
  }
`

export interface UserList {
  users: string[]
}
