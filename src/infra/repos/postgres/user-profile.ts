import { LoadUserProfile, SaveUserPicture } from '@/domain/contracts/repos'
import { PgRepository } from '@/infra/repos/postgres'
import { PgUser } from '@/infra/repos/postgres/entities'

export class PgUserProfileRepository extends PgRepository implements SaveUserPicture {
  async savePicture ({ id, pictureUrl, initials }: SaveUserPicture.Input): Promise<void> {
    const pgUserRepo = this.getRepository(PgUser)

    await pgUserRepo.update({ id: Number(id) }, { pictureUrl, initials })
  }

  async load ({ id }: LoadUserProfile.Input): Promise<LoadUserProfile.Output> {
    const pgUserRepo = this.getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ id: Number(id) })

    if (pgUser !== undefined) {
      return { name: pgUser.name ?? undefined }
    }
  }
}
