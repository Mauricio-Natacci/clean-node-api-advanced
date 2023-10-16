import { UUIDGenerator, UploadFile } from '@/domain/contracts/gateways'

type Setup = (fileStorage: UploadFile, crypto: UUIDGenerator) => ChangeProfilePicture
type Input = { id: string, file: Buffer }
export type ChangeProfilePicture = (input: Input) => Promise<void>

export const setupChangeProfilePicture: Setup = (fileStorage, crypto) => async ({ id, file }) => {
  const key = crypto.uuid({ key: id })
  await fileStorage.upload({ file, key })
}
