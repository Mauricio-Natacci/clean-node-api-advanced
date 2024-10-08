import { LoadUserAccount, SaveFacebookAccount } from '@/domain/contracts/repos'
import { PgRepository } from '@/infra/repos/postgres'
import { PgUser } from '@/infra/repos/postgres/entities'

type LoadParams = LoadUserAccount.Params
type LoadResult = LoadUserAccount.Result
type SaveParams = SaveFacebookAccount.Params
type SaveResult = SaveFacebookAccount.Result

export class PgUserAccountRepository extends PgRepository implements LoadUserAccount, SaveFacebookAccount {
  async load ({ email }: LoadParams): Promise<LoadResult> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email })

    if (pgUser !== undefined) {
      return {
        id: pgUser.id.toString(),
        name: pgUser?.name ?? undefined
      }
    }
  }

  async saveWithFacebook ({ id, name, email, facebookId }: SaveParams): Promise<SaveResult> {
    const pgUserRepo = this.getRepository(PgUser)
    let resultId: string

    if (id === undefined) {
      const pgUser = await pgUserRepo.save({ email, name, facebookId })

      resultId = pgUser.id.toString()
    } else {
      resultId = id

      await pgUserRepo.update({ id: Number(id) }, { name, facebookId })
    }
    return { id: resultId }
  }
}
