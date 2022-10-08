import { firestore } from 'firebase-admin'
import type { ApolloContext } from '../../types/apolloContext'
import { AuthenticationError } from 'apollo-server-express'

type User = {
  id: string
  name: string
  owner_teams: firestore.DocumentReference<Team>[]
  created_at: Date
  updated_at: Date
}

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

type Args = {
  user_id: string
}

export const teams = async (_: null, args: Args, context: ApolloContext) => {
  if (!context.userId || context.userId !== args.user_id) {
    throw new AuthenticationError('未ログインユーザーです')
  }

  const getOwnerTeamRefs = await firestore()
      .collection('users')
      .withConverter<User>({
        toFirestore: (modelObject => modelObject),
        fromFirestore: (snapshot: FirebaseFirestore.QueryDocumentSnapshot<User>) => snapshot.data()
      })
      .doc(args.user_id)
      .get()

  const ownerTeamsRefList = getOwnerTeamRefs.data()?.owner_teams

  if(!ownerTeamsRefList) {
    return []
  }


  const teams = await Promise.all(ownerTeamsRefList.map(async (item) => {
    // ドキュメントの型がリファレンス型なのでget()でそのまま取得ができる
    return await item.get()
  }))

  return teams.map(async (team) => {
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
