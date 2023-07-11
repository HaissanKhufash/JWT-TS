import { Request, Response } from 'express'
import User from './model/User'
import { UserFields, UserModel } from '../types/user/model.'
import { validateUser } from '../validation/user'
import { userErrorValidator } from '../validation/user/errors'
import { createSignature } from '../helpers/jwt'

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: UserFields = req.body

    validateUser({ email, password })

    const user: UserModel = await User.create({ email, password })

    if (user !== null) {
      const token = createSignature({ _id: user._id })
      res.cookie('auth-jwt', token)
      res.status(200).json({ email, token })
    }
  } catch (err) {
    const error = err as Error
    res.status(400).json({ error: userErrorValidator(error) })
  }
}

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: UserFields = req.body

    validateUser({ email, password })

    const approvedUser: UserModel = await User.login({ email, password })

    if (approvedUser !== null) {
      const token = createSignature({ _id: approvedUser._id })
      res.cookie('auth-jwt', token)
      res.status(200).json({ email, token })
    } else throw new Error('Provided password is wrong')
  } catch (err) {
    const error = err as Error
    res.status(400).json({ error: userErrorValidator(error) })
  }
}
