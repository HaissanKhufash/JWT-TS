import { Request, Response, Router } from 'express'
const router = Router()

router
  .post('/signup', (req: Request, res: Response) => {
    import('./user.controller')
      .then(controller => {
        controller.signup(req, res).catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  })
  .post('/login', (req: Request, res: Response) => {
    import('./user.controller')
      .then(controller => {
        controller.login(req, res).catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  })

export default router
