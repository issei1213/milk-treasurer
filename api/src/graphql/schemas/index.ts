import { userSchema } from './user'
import { teamSchema } from './team'
import {DocumentNode} from "graphql";
import {gql} from "apollo-server-express";

export const rootSchema: DocumentNode = gql`
    scalar Timestamp
    type Query 
    type Mutation 
`

export const schemas = [rootSchema, userSchema, teamSchema]
