// @ref: https://www.sunapro.com/type-predicate-firebase-error/
export type FirebaseError = {
  code: string
  message: string
  name: string
}

export const isFirebaseError = (e: Error): e is FirebaseError => {
  return 'code' in e && 'message' in e
}
