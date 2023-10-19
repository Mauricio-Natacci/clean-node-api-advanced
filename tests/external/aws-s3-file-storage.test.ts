import { AwsS3FileStorage } from '@/infra/gateways'
import { env } from '@/main/config/env'
import axios from 'axios'

describe('Aws S3 Integration Tests', () => {
  let sut: AwsS3FileStorage

  beforeEach(() => {
    sut = new AwsS3FileStorage(
      env.s3.accessKey as string,
      env.s3.secretKey as string,
      env.s3.bucket as string
    )
  })

  it('should upload and delete image from aws s3', async () => {
    const onePixelImage = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjcDFZ+h8AA/oCHWEUQ3kAAAAASUVORK5CYII='
    const key = 'any_key.png'
    const file = Buffer.from(onePixelImage, 'base64')

    const pictureUrl = await sut.upload({ key, file })

    expect((await axios.get(pictureUrl)).status).toBe(200)

    await sut.delete({ key })

    await expect(axios.get(pictureUrl)).rejects.toThrow()
  })
})
