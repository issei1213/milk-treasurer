import * as admin from 'firebase-admin'

admin.firestore().settings({ ignoreUndefinedProperties: true })

export const resolvers = {
  Query: {
    async users() {
      const users = await admin.firestore().collection('users').get()

      return users.docs.map((user) => {
        console.log(user.id)
        return {
          id: user.id,
          ...user.data()
        }
      })
    },
  },
  Mutation: {
    addTest: async (_: null, { text }: { text: string }) => {
      const uid = 'asdfasdf' // これは適当にご自身で作るなりライブラリ使うなりしてください

      await admin.firestore().collection('tests').doc(uid).set({
        name: text,
      })

      const testDoc = await admin.firestore().doc(`tests/${uid}`).get()
      const test = await testDoc.data()
      return test
    },

    createUser: async (_: null, {input: {name, email}}: {input: CreateUserInput}) => {

      await admin.firestore().collection('users').doc().set({
        name,
        email
      })

      return {
        name,
        email
      }
    }
  },
}


export type CreateUserInput = {
  name: string
  email: string
}
