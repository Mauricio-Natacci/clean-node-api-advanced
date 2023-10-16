import { TokenGenerator } from '@/domain/contracts/crypto'
import jwt from 'jsonwebtoken'

type Params = TokenGenerator.Params
type Result = TokenGenerator.Result

export class JwtTokenHandler implements TokenGenerator {
  constructor (private readonly secret: string) {}

  async generateToken ({ expirationInMs, key }: Params): Promise<Result> {
    const expirationInSeconds = expirationInMs / 1000
    return jwt.sign({ key: 'any_key' }, this.secret, { expiresIn: `${expirationInSeconds}` })
  }
}
