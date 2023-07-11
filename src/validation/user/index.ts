import Joi from 'joi'
import { UserFields } from '../../types/user/model.'

const patterns = {
  password: /^((\w+[?#&$!+|-]+)|([?#&$!+|-]+\w+)).+$/
}

const userValidationSchema = Joi.object({
  email: Joi.string().email().required().trim(),
  password: Joi.string().regex(patterns.password).required().min(8)
})

export const validateUser = (user: UserFields): void => {
  const { error } = userValidationSchema.validate(user, { abortEarly: false })
  if (error != null) throw new Error(error.details[0].message)
}
