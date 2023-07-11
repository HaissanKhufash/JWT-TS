import jwt from 'jsonwebtoken'
import { env } from '../config/env'

const { envJwt } = env

export const createSignature = (payload: object): string => {
  return jwt.sign(payload, envJwt.secret, { expiresIn: '12h' })
}

export const decryptToken = (token: string): jwt.JwtPayload => {
  return jwt.verify(token, envJwt.secret) as jwt.JwtPayload
}
