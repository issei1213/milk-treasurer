import * as functions from 'firebase-functions'
import { ApolloServer } from 'apollo-server-express'
import { resolvers } from './resolver'
import { typeDefs } from './typeDefs'
import express from 'express'
import * as admin from 'firebase-admin'

admin.initializeApp()
const app = express()

// サーバーを起動する
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
})

server.start().then(() => {
  server.applyMiddleware({ app, path: '/' })
})

exports.graphql = functions.https.onRequest(app)
