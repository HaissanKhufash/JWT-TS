import { Schema, model } from 'mongoose'
import { StaticUserModel, UserFields, UserModel } from '../../types/user/model.'

const UserSchema = new Schema<UserFields>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, { versionKey: false })

UserSchema.pre('save', async function () {
  const { genSalt, hash } = await import('bcrypt')
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
})

UserSchema.statics.login = async function ({ email, password }: UserFields): Promise<UserModel | null> {
  const { compare } = await import('bcrypt')
  const existingUser: UserModel | null = await this.findOne({ email })
  if (existingUser !== null) {
    const { password: hashedPwd } = existingUser
    return await compare(password, hashedPwd) ? existingUser : null
  }

  throw new Error('Not found user')
}

export default model<UserModel, StaticUserModel>('user', UserSchema)
