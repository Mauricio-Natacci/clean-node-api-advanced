import { PgUser } from '@/infra/repos/postgres/entities'
import { app } from '@/main/config/app'
import { env } from '@/main/config/env'
import { makeFakeDb } from '@/tests/infra/repos/postgres/mocks'
import { sign } from 'jsonwebtoken'
import { IBackup } from 'pg-mem'
import request from 'supertest'
import { Repository, getConnection, getRepository } from 'typeorm'

describe('User Routes', () => {
  let backup: IBackup
  let pgUserRepo: Repository<PgUser>

  beforeAll(async () => {
    const db = await makeFakeDb([PgUser])
    backup = db.backup()
    pgUserRepo = getRepository(PgUser)
  })

  afterAll(async () => {
    await getConnection().close()
  })

  beforeEach(() => {
    backup.restore()
  })

  describe('DELETE /users/picture', () => {
    it('should return 403 if authorization header is not set', async () => {
      const { status } = await request(app)
        .delete('/api/users/picture')

      expect(status).toBe(403)
    })

    it('should return 204 on success', async () => {
      const { id } = await pgUserRepo.save({ email: 'any_email', name: 'John Doe' })
      const authorization = sign({ key: id }, env.jwtSecret as string)

      const { status, body } = await request(app)
        .delete('/api/users/picture')
        .set({ authorization })

      expect(status).toBe(200)
      expect(body).toEqual({ pictureUrl: undefined, initials: 'JD' })
    })
  })

  describe('PUT /users/picture', () => {
    it('should return 403 if authorization header is not set', async () => {
      const { status } = await request(app)
        .put('/api/users/picture')

      expect(status).toBe(403)
    })
  })
})
