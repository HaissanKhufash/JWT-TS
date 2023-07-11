import { Document, Model } from 'mongoose'

export interface UserModel extends Document {
  email: string
  password: string
}

export type UserFields = Pick<UserModel, 'email' | 'password'>

export interface StaticUserModel extends Model<UserModel> {
  login: ({ email, password }: UserFields) => Promise<UserModel>
}
