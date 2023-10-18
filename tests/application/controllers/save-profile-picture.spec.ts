import { RequiredFieldError } from '@/application/errors'
import { HttpResponse, badRequest } from '@/application/helpers'

type HttpRequest = { file: { buffer: Buffer, mimeType: string } }
type Model = Error

export class SaveProfilePictureController {
  async handle ({ file }: HttpRequest): Promise<HttpResponse<Model>> {
    if (file === undefined || file === null || file.buffer.length === 0) {
      return badRequest(new RequiredFieldError('file'))
    }

    return badRequest(new InvalidMimeType(['png, jpg, jpeg']))
  }
}

export class InvalidMimeType extends Error {
  constructor (allowed: string[]) {
    super(`Invalid file type.Allowed types: ${allowed.join(', ')}`)
    this.name = 'InvalidMimeType'
  }
}

describe('SaveProfilePictureController', () => {
  let buffer: Buffer
  let mimeType: string
  let sut: SaveProfilePictureController

  beforeAll(() => {
    buffer = Buffer.from('any_buffer')
    mimeType = 'image/png'
  })

  beforeEach(() => {
    sut = new SaveProfilePictureController()
  })

  it('should return 400 if file is not provided', async () => {
    const httpResponse = await sut.handle({ file: undefined as any })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is not provided', async () => {
    const httpResponse = await sut.handle({ file: null } as any)

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file is empty', async () => {
    const httpResponse = await sut.handle({ file: { buffer: Buffer.from(''), mimeType } })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })

  it('should return 400 if file type is invalid', async () => {
    const httpResponse = await sut.handle({ file: { buffer, mimeType: 'invalid_type' } })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new InvalidMimeType(['png, jpg, jpeg'])
    })
  })
})
