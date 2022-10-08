import { firestore } from 'firebase-admin'

export type CreateUserInput = {
  input: {
    name: string
    email: string
  }
}

type CreateUserResponse = {
  name: string
  email: string
}

export const createUser = async (
  _: null,
  { input: { name, email } }: CreateUserInput,
): Promise<CreateUserResponse> => {
  await firestore().collection('users').doc().set({
    name,
    email,
    updated_at: firestore.FieldValue.serverTimestamp(),
    created_at: firestore.FieldValue.serverTimestamp(),
  })

  return { name, email }
}
