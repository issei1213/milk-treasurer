import { firestore } from 'firebase-admin'
import type { ApolloContext } from '../../types/apolloContext'
import { AuthenticationError } from 'apollo-server-express'

type User = {
  name: string
  email: string
  created_at: Date
  updated_at: Date
}

export const users = async (_a: null, _b: null, context: ApolloContext) => {
  if (!context.userId) {
    throw new AuthenticationError('未ログインユーザーです')
  }

  const users = await firestore()
    .collection('users')
    .withConverter<User>({
      toFirestore: (modelObject) => modelObject,
      fromFirestore: (snapshot: firestore.QueryDocumentSnapshot<User>) =>
        snapshot.data(),
    })
    .get()

  return users.docs.map((user) => ({
    id: user.id,
    ...user.data(),
  }))
}
