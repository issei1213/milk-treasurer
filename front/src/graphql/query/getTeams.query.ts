import { gql } from '@apollo/client'

// TEST
export const GET_TEAMS = gql`
    query GET_TEAMS($user_id: String!) {
        teams (user_id: $user_id) {
            id
            name
            updated_at
            created_at
            members {
                id
                name
                updated_at
                created_at
            } 
        }
    }
`

type Member = {
    id: string
    name: string
    updated_at: string
    created_at: string
}

type Team  = {
    id: string
    name: string
    updated_at: string
    created_at: string
    members: Member[]
}


export type GetTeamsQueryArgs = {
    user_id: string
}

export type GetTeamsQuery = {
    teams: Team[]
}
