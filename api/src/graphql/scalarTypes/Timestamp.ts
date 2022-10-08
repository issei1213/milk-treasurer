// @ref: https://github.com/cobraz/firestore-graphql-scalars/blob/master/src/resolvers/Timestamp.ts
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Kind, GraphQLError, GraphQLScalarType, ValueNode } from 'graphql'
import { Timestamp as FirestoreTimestamp } from '@google-cloud/firestore'

// NOTE: Firestoreのtimestamp用のカスタムScalar
export const Timestamp = new GraphQLScalarType({
  name: 'Timestamp',

  description: '',

  serialize(value) {
    let v = value

    if (
      !(v instanceof FirestoreTimestamp) &&
      typeof v !== 'object' &&
      typeof v.toDate === 'function' &&
      typeof v !== 'string' &&
      typeof v !== 'number'
    ) {
      throw new TypeError(
        `Value is not an instance of Date, Date string or number: ${JSON.stringify(
          v,
        )}`,
      )
    }

    if (typeof v === 'string') {
      const date = new Date()
      date.setTime(Date.parse(value))
      try {
        v = FirestoreTimestamp.fromDate(date)
      } catch (e) {
        throw new TypeError(`Value is not a valid Date: ${JSON.stringify(v)}`)
      }
    } else if (typeof v === 'number') {
      v = FirestoreTimestamp.fromMillis(v)
    }

    if (Number.isNaN(v.seconds)) {
      throw new TypeError(`Value is not a valid Date: ${JSON.stringify(v)}`)
    }

    return v.toDate()
  },

  parseValue(value: string): FirestoreTimestamp {
    const date = new Date(value)

    if (Number.isNaN(date.getTime())) {
      throw new GraphQLError(
        `Value is not a valid Date: ${JSON.stringify(value)}`,
      )
    }

    return FirestoreTimestamp.fromDate(date)
  },

  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.INT) {
      return FirestoreTimestamp.fromDate(new Date(parseInt(ast.value, 10)))
    } else if (ast.kind === Kind.STRING) {
      if (this.parseValue) {
        return this.parseValue(ast.value)
      }
    }

    return null
  },
})
