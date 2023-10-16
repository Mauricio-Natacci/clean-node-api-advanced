import { UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'
import { SaveUserPicture } from '@/domain/contracts/repos'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator, userProfileRepo: SaveUserPicture) => ChangeProfilePicture
type Input = { id: string, file?: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto, userProfileRepo) => async ({ id, file }) => {
  if (file !== undefined) {
    const key = crypto.uuid({ key: id })
    const pictureUrl = await fileStorage.upload({ file, key })
    await userProfileRepo.savePicture({ pictureUrl })
  }
}
