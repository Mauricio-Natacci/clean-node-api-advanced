import { AwsS3FileStorage } from '@/infra/gateways'
import { S3, config } from 'aws-sdk'

jest.mock('aws-sdk')

describe('AwsS3FileStorage', () => {
  let accessKey: string
  let secret: string
  let bucket: string
  let sut: AwsS3FileStorage
  let key: string

  beforeAll(() => {
    accessKey = 'any_access_key'
    secret = 'any_secret'
    bucket = 'any_bucket'
    key = 'any_key'
  })

  beforeEach(() => {
    sut = new AwsS3FileStorage(accessKey, secret, bucket)
  })

  it('should config aws credentials on creation', async () => {
    expect(sut).toBeDefined()
    expect(config.update).toHaveBeenCalledWith({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secret
      }
    })
    expect(config.update).toHaveBeenCalledTimes(1)
  })

  describe('upload', () => {
    let file: Buffer
    let putObjectSpy: jest.Mock
    let putObjectPromiseSpy: jest.Mock

    beforeAll(() => {
      file = Buffer.from('any_buffer')
      putObjectPromiseSpy = jest.fn()
      putObjectSpy = jest.fn().mockImplementation(() => ({ promise: putObjectPromiseSpy }))

      jest.mocked(S3).mockImplementation(jest.fn().mockImplementation(() => ({ putObject: putObjectSpy })))
    })

    it('should call putObject with correct input', async () => {
      await sut.upload({ file, key })

      expect(putObjectSpy).toHaveBeenCalledWith({
        Bucket: bucket,
        Key: key,
        Body: file,
        ACL: 'public-read'
      })
      expect(putObjectSpy).toHaveBeenCalledTimes(1)
      expect(putObjectPromiseSpy).toHaveBeenCalledTimes(1)
    })

    it('should return imageUrl', async () => {
      const imageUrl = await sut.upload({ file, key })

      expect(imageUrl).toBe(`https://${bucket}.s3.amazonaws.com/${key}`)
    })

    it('should return encoded imageUrl', async () => {
      const imageUrl = await sut.upload({ file, key: 'any_key with spaces' })

      expect(imageUrl).toBe(`https://${bucket}.s3.amazonaws.com/any_key%20with%20spaces`)
    })

    it('should rethrow if putObject throws', async () => {
      const error = new Error('putObject_error')
      putObjectPromiseSpy.mockRejectedValueOnce(error)

      const promise = sut.upload({ file, key })

      await expect(promise).rejects.toThrow(error)
    })
  })

  describe('delete', () => {
    let deleteObjectSpy: jest.Mock
    let deleteObjectPromiseSpy: jest.Mock

    beforeAll(() => {
      deleteObjectPromiseSpy = jest.fn()
      deleteObjectSpy = jest.fn().mockImplementation(() => ({ promise: deleteObjectPromiseSpy }))

      jest.mocked(S3).mockImplementation(jest.fn().mockImplementation(() => ({ deleteObject: deleteObjectSpy })))
    })

    it('should call deleteObject with correct input', async () => {
      await sut.delete({ key })

      expect(deleteObjectSpy).toHaveBeenCalledWith({
        Bucket: bucket,
        Key: key
      })
      expect(deleteObjectSpy).toHaveBeenCalledTimes(1)
      expect(deleteObjectPromiseSpy).toHaveBeenCalledTimes(1)
    })
  })
})
