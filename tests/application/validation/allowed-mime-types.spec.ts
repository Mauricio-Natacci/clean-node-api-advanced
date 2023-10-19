import { InvalidMimeTypeError } from '@/application/errors'

type Extensions = 'png' | 'jpg' | 'jpeg'

class AllowedMimeTypes {
  constructor (
    private readonly allowed: Extensions[],
    private readonly mimeType: string) {}

  validate (): Error | undefined {
    if (this.allowed.includes('png') && this.mimeType !== 'image/png') {
      return new InvalidMimeTypeError(['png'])
    }
  }
}

describe('AllowedMimeTypes', () => {
  it('should return InvalidMimeType if mime type is not allowed', () => {
    const sut = new AllowedMimeTypes(['png'], 'image/jpg')
    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })

  it('should return undefined if mime type is allowed with png', () => {
    const sut = new AllowedMimeTypes(['png'], 'image/png')
    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if mime type is allowed with jpg', () => {
    const sut = new AllowedMimeTypes(['jpg'], 'image/jpg')
    const error = sut.validate()

    expect(error).toBeUndefined()
  })

  it('should return undefined if mime type is allowed with jpeg', () => {
    const sut = new AllowedMimeTypes(['jpeg'], 'image/jpeg')
    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
