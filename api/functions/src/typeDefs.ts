import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

export const typeDefs: DocumentNode = gql`
  """
  ミスチル
  """
  type Test {
    name: String!
  }

  type Query {
    users: [Test]
  }

  type Mutation {
    addTest(text: String!): Test
  }
`
