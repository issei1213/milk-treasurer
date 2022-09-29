import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

export const typeDefs: DocumentNode = gql`
  """
  ミスチル
  """
  type User {
    id: String
    name: String
    email: String
  }

  type Query {
    users: [User]
  }

  input CreateUserInput {
    name: String!
    email: String!
  }


  type Mutation {
    addTest(text: String!): User
    createUser(input: CreateUserInput!): User
  }
`
