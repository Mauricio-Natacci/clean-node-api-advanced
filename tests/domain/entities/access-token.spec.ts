import { AccessToken } from '@/domain/entities'

describe('AccessToken', () => {
  it('should create with a value', async () => {
    const sut = new AccessToken('any_value')

    expect(sut).toEqual({ value: 'any_value' })
  })

  it('should experire in 30 minutes', async () => {
    expect(AccessToken.expirationInMs).toBe(1800000)
  })
})
