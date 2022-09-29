
import * as admin from 'firebase-admin'

admin.initializeApp({
  credential: admin.credential.cert(
      {
        projectId: "milk-treasurer",
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCVXgdZ28ntxRoN\nLEYv6Ol0sjzTMchYEDmGkIUpM5HP3iGj8oRIpHcoiQZxqSqPEQs9T47JbiVBUTYi\nxOVths3lapv3dA+VGntIUrmBNpS3voIYiOl2axhanlyqAbGfg5F5oQohpZAhexiV\n9qwA53MqIzi2CXmOyTASy+tqYsXa7tnxvmx74pnNPP/WfriS9JbBATCfuUiG4uiw\nwY7UGciXoiDq1TUn7ufyxnaqRzagQBEe9AfSgICqfFjfjnzCwn7oJYDq48anzEti\npPeH7AKlYQ5wG9Dvc9HrCliqBEbHnQxbxA5u1uIefbq3RuDfkuDfzxE0nRXIBuDQ\nAE6uuPPJAgMBAAECggEAAnDh797+ossYzORPVVMaFZUgF1d17bJ+LivIcU7tcBcy\nN4qsDL/bTqdGmq7oCiR+KYdWTwZkx3d7SgAru6l7Ted7GwUjiA1BvIHVlD3/Gi2b\n1KjQH+ZKJJj37LNQYsn0o6c1Ei2xeEqZsUGxt+YQZLzknVz0RpgVGAmLFFb+4sAE\nGkxQwSzCnv+EHaSYiy59wRuGf8UU0HtRaYcC2uFZXb6tiQg8pYX30Yft42QHR7DR\nHBipGNS3/ug8BweZD48oCrzZ1isr7QkMSerdmyBaPTWWcV+hD6MeQOaKfY1CXr03\nAb6vFPPsGp7cF7f5fOynHTWQXH4i+dtFgEIo350zrQKBgQDQYyFts533887jPt+9\ngHJzOugvUBqt+f1MsK05BD97YPBHoa1psXC+prYI2eEgzp8uVoZZNgzHHMDS9V1g\nd592yaXJ94QP3Y5UIfDFPn36lpCEimn9Pa1kGDjW4ZrmYetf/JOr5LqMkYG8hiTL\nY+MFH+u5ITz2xVYHaKVSGjsCRwKBgQC3frzGA+b7Tc3vYLaZmgeIQDv/VAW5fVQQ\n7COKqcxhB9Wi20GvyvZPqViD956TIx06hv1K0Y9+XSeUbrQTpqINKf91Non/4iaz\n2tc1ZWf36JyDc+ZPNW/tOLGfZng3C63o2xR1v6b1F6E7AYzhZiQEat7nt/KIqbaA\nHohe4AHRbwKBgQClohWA96KY4d5Qu7nlCwJtWqYQbTA3lpth6JBW4GyA6aUymmyW\ntOXzc9j+ogeSJwlZMIbqw85WOSF+zG4i7hH+vfqb1LPQVH77mlqgvLIviptl7gqe\nsfZut9391iZj9fK7QawylcQ9VK51JX57d3KLsTqQ1L17O5DMpL26y4SZowKBgQCr\nlOUsPEXmw/BHYKYep3tXmsj/ji/0LQ9I66aoaPJl4Q+Rw3h+y0jbYL0WWZt8dp9E\nNSnwpliJjs4N7B6TKYPqz1TC5AbSsUQDdiU7FuHLXUXNXbkEZDGPHy5ooUbUIiWy\n0fklydpy4G+xX1e/BOW1A8H/52/w/tFaqDJYlRreHQKBgQCRjlEUGi3brWQu9HxS\nXf63Xm3tKAA50YheGGxc6PcoMDmadb0vrCcOM6WMr95RRAjO99XvvbYuUy6Jd0nx\n8jlPQAPsfsyDqqzk7L32jnKviX1/E5GH1RnO2kj0jrV5BlaXZNEvKyV1NnApmT+s\nOAEqxqWsPxCcrNWdqHwcutRG1w==\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-ckflq@milk-treasurer.iam.gserviceaccount.com",
      }
  )
})


import * as functions from 'firebase-functions'
import { ApolloServer } from 'apollo-server-express'
import { resolvers } from './resolver'
import { typeDefs } from './typeDefs'
import express from 'express'
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
