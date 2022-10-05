import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

export const userSchema: DocumentNode = gql`
  type User {
    id: String
    name: String
    email: String
  }

  input CreateUserInput {
    name: String!
    email: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    addTest(text: String!): User
    createUser(input: CreateUserInput!): User
  }
`
