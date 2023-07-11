import { UserError, TokenError } from '../../types/user/error'

export const userErrorValidator = (err: Error): UserError => {
  const error: UserError = {
    email: '',
    password: ''
  }

  if (err.message.includes('email') || err.message.includes('user')) {
    if (err.message.includes('valid')) error.email = 'Be ensured of type a valid email'
    if (err.message.includes('found')) error.email = 'There is no user related to the typed email, sign up to get access'
    if (err.message.includes('E11000')) error.email = 'This user already exists, login in to continue'
  }

  if (err.message.includes('password')) {
    if (err.message.includes('pattern')) error.password = 'Your password is not enough stronger, please add some allowed characters like (?, |, #, $)'
    if (err.message.includes('length')) error.password = 'Your password is too short, minimum characters are at least eight (8)'
    if (err.message.includes('wrong')) error.password = 'Provided password does not match with the one belonging to this user'
  }

  return error
}

export const tokenErrorValidator = (err: Error): TokenError => {
  const error: TokenError = {
    invalid_token: '',
    expired_token: ''
  }

  if (err.name === 'JsonWebTokenError') error.invalid_token = 'Token is invalid, please send a valid one'
  if (err.name === 'TokenExpiredError') error.expired_token = 'Your token life has expired, login in to access'

  return error
}
