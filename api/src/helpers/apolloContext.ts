import { Request } from 'express'
import * as admin from 'firebase-admin'

const getAuthToken = async (request: Request): Promise<undefined | string> => {
  if (!request.headers.authorization) {
    return undefined
  }

  return request.headers.authorization.replace(/^Bearer\s/, '')
}

export const getUserIdFromGraphqlAuth = async (
  request: Request,
): Promise<undefined | string> => {
  try {
    const token = await getAuthToken(request)
    if (!token) {
      return undefined
    }

    const payload = await admin.auth().verifyIdToken(token)

    return payload.uid
  } catch (err) {
    return undefined
  }
}
