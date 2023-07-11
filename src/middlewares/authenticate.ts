import { NextFunction, Request, Response } from 'express'
import { decryptToken } from '../helpers/jwt'
import { tokenErrorValidator } from '../validation/user/errors'

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  try {
    let token: string
    if (req.headers.authorization !== undefined) token = ridOfBearer(req.headers.authorization) as string
    else return res.status(400).redirect('/failure')

    if (token !== null) {
      req.user = decryptToken(token)._id
      return next()
    }

    req.user = undefined
    res.redirect('/failure')
  } catch (err) {
    const error = err as Error
    if (err instanceof Error && err.message.toLocaleLowerCase().includes('token')) res.status(400).json({ error: tokenErrorValidator(error) })
  }
}

const ridOfBearer = (authorizationStr: string): string | null => {
  const [bearer, token]: [string, string] = authorizationStr.split(' ') as [string, string]
  if (bearer !== undefined) {
    if (bearer.toLocaleLowerCase() === 'bearer') return token
  }
  return null
}
