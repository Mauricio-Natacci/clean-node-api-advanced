import { adaptExpressRoute as adapt } from '@/main/adapters'
import { auth } from '@/main/middlewares'
import { Router } from 'express'
import { makeDeleteProfilePictureController } from '../factories/application/controllers'

export default (router: Router): void => {
  router.delete('/users/picture', auth, adapt(makeDeleteProfilePictureController()))
}
