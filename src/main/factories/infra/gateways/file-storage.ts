import { AwsS3FileStorage } from '@/infra/gateways'
import { env } from '@/main/config/env'

export const makeAwsS3FileStorage = (): AwsS3FileStorage => {
  return new AwsS3FileStorage(
    env.s3.accessKey as string,
    env.s3.secretKey as string,
    env.s3.bucket as string
  )
}
