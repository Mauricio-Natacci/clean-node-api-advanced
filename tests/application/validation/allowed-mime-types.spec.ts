import { InvalidMimeTypeError } from '@/application/errors'

type Extensions = 'png' | 'jpg' | 'jpeg'

class AllowedMimeTypes {
  constructor (
    private readonly allowed: Extensions[],
    private readonly mimeType: string) {}

  validate (): Error | undefined {
    return new InvalidMimeTypeError(this.allowed)
  }
}

describe('AllowedMimeTypes', () => {
  it('should return InvalidMimeType if mime type is not allowed', () => {
    const sut = new AllowedMimeTypes(['png'], 'image/jpg')

    const error = sut.validate()

    expect(error).toEqual(new InvalidMimeTypeError(['png']))
  })
})
