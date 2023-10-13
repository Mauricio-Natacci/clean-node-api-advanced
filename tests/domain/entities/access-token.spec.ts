import { AccessToken } from '@/domain/entities'

describe('AccessToken', () => {
  it('should expire in 30 mins', () => {
    expect(AccessToken.expirationInMs).toBe(1800000)
  })
})
