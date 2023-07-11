export interface UserError {
  email: string
  password: string
}

export interface TokenError {
  invalid_token: string
  expired_token: string
}
