import * as admin from 'firebase-admin'

export const resolvers = {
  Query: {
    async users() {
      const users = await admin.firestore().collection('users').get()
      return users.docs.map((user) => user.data())
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
  },
}
