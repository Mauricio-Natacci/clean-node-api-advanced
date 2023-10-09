import { TokenGenerator } from '@/data/contracts/crypto'
import jwt from 'jsonwebtoken'

export class JwtTokenGenerator implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken (params: TokenGenerator.Params): Promise<TokenGenerator.Result> {
    const expirationInSeconds = params.expirationInMs / 1000
    return jwt.sign({ key: 'any_key' }, this.secret, { expiresIn: `${expirationInSeconds}` })
  }
}
