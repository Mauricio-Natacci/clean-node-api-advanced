import { TokenGenerator } from '@/data/contracts/crypto'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken')

class JwtTokenGenerator implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = params.expirationInMs / 1000
    return jwt.sign({ key: 'any_key' }, this.secret, { expiresIn: `${expirationInSeconds}` })
  }
}

describe('JwtTokenGenerator', () => {
  let sut: JwtTokenGenerator
  let fakeJwt: jest.Mocked<typeof jwt>

  beforeAll(() => {
    fakeJwt = jwt as jest.Mocked<typeof jwt>
    fakeJwt.sign.mockImplementation(() => 'any_token')
  })

  beforeEach(() => {
    sut = new JwtTokenGenerator('any_secret')
  })

  it('should call sign with correct params', async () => {
    await sut.generateToken({ key: 'value', expirationInMs: 1000 })

    expect(fakeJwt.sign).toHaveBeenCalledWith({ key: 'any_key' }, 'any_secret', { expiresIn: '1' })
  })

  it('should return a token on sign success', async () => {
    const token = await sut.generateToken({ key: 'value', expirationInMs: 1000 })

    expect(token).toBe('any_token')
  })

  it('should rethrow if sign throws', async () => {
    fakeJwt.sign.mockImplementationOnce(() => { throw new Error('token_error') })

    const promise = sut.generateToken({ key: 'value', expirationInMs: 1000 })

    await expect(promise).rejects.toThrow(new Error('token_error'))
  })
})
