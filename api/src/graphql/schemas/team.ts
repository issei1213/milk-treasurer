import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

export const teamSchema: DocumentNode = gql`
  scalar Timestamp

  type TeamMembers {
    id: String
    name: String
    updated_at: Timestamp
    created_at: Timestamp
  }

  type Team {
    id: String
    name: String
    members: [TeamMembers]
    updated_at: Timestamp
    created_at: Timestamp
  }

  type Query {
    teams: [Team]
  }
`
