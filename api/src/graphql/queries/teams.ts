import { firestore } from 'firebase-admin'
import type { ApolloContext } from '../../types/apolloContext'
import { AuthenticationError } from 'apollo-server-express'

type TeamMember = {
  name: string
  created_at: Date
  updated_at: Date
}

type Team = {
  name: string
  members: TeamMember[]
  created_at: Date
  updated_at: Date
}

export const teams = async (_a: null, _b: null, context: ApolloContext) => {
  if (!context.userId) {
    throw new AuthenticationError('未ログインユーザーです')
  }
  const teams = await firestore()
    .collection('teams')
    .withConverter<Team>({
      toFirestore: (modelObject) => modelObject,
      fromFirestore: (snapshot: firestore.QueryDocumentSnapshot<Team>) =>
        snapshot.data(),
    })
    .get()

  return teams.docs.map(async (team) => {
    const getMembersSnapshot = await firestore()
      .collection(`teams/${team.id}/members`)
      .withConverter<TeamMember>({
        toFirestore: (modelObject) => modelObject,
        fromFirestore: (
          snapshot: firestore.QueryDocumentSnapshot<TeamMember>,
        ) => snapshot.data(),
      })
      .get()

    const members = getMembersSnapshot.docs.map((member) => ({
      id: member.id,
      ...member.data(),
    }))

    return {
      id: team.id,
      ...team.data(),
      members,
    }
  })
}
