import { TokenGenerator, TokenValidator } from '@/domain/contracts/crypto'
import jwt from 'jsonwebtoken'

export class JwtTokenHandler implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken ({ expirationInMs, key }: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = expirationInMs / 1000
    return jwt.sign({ key: 'any_key' }, this.secret, { expiresIn: `${expirationInSeconds}` })
  }

  async validateToken ({ token }: TokenValidator.Params): Promise<void> {
    jwt.verify(token, this.secret)
  }
}
