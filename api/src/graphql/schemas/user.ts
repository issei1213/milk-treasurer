import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

export const userSchema: DocumentNode = gql`
  extend type Query {
    users: [User]
  }
  
  extend type Mutation {
      addTest(text: String!): User
      createUser(input: CreateUserInput!): User
  }

  type User {
    id: String
    name: String
    email: String
    updated_at: Timestamp
    created_at: Timestamp
  }

  input CreateUserInput {
    name: String!
    email: String!
    updated_at: Timestamp
    created_at: Timestamp
  }


`
