import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'
import { ApolloServer } from 'apollo-server-express'
import { mutations, queries, schemas } from './graphql'
import express from 'express'
import { getUserIdFromGraphqlAuth } from './helpers/apolloContext'
import type { ApolloContext } from './types/apolloContext'
import serviceAccountKey from '../serviceAccountKey.json'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { scalarTypes } from './graphql/scalarTypes'
import {
  typeDefs as scalarTypeDefs,
  resolvers as scalarResolvers,
} from 'graphql-scalars'

admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: serviceAccountKey.client_email,
    privateKey: serviceAccountKey.private_key,
    projectId: serviceAccountKey.project_id,
  }),
})
admin.firestore().settings({ ignoreUndefinedProperties: true })

const app = express()
const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs: [...scalarTypeDefs, schemas],
    resolvers: [
      scalarResolvers,
      {
        ...scalarTypes,
        Query: queries,
        Mutation: mutations,
      },
    ],
  }),
  introspection: true,
  csrfPrevention: true,
  cache: 'bounded',
  // @ref: https://javascript.plainenglish.io/building-a-graphql-api-using-firebase-functions-and-apollo-9fd56649e556
  context: async ({ req }): Promise<ApolloContext> => {
    const userId = await getUserIdFromGraphqlAuth(req)

    return {
      userId,
    }
  },
})

server.start().then(() => {
  server.applyMiddleware({
    app,
    path: '/' ,
    cors: {
      origin: [process.env.FRONT_URL ?? ''],
      credentials: true
    },
  }
  )})

exports.graphql = functions
    .region('asia-northeast1')
    .https.onRequest(app)
