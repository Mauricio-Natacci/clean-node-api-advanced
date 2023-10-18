import { RequiredFieldError } from '@/application/errors'
import { HttpResponse, badRequest } from '@/application/helpers'

type HttpRequest = { file: any }
type Model = Error

export class SaveProfilePictureController {
  async handle ({ file }: HttpRequest): Promise<HttpResponse<Model>> {
    return badRequest(new RequiredFieldError('file'))
  }
}

describe('SaveProfilePictureController', () => {
  it('should return 400 if file is not provided', async () => {
    const sut = new SaveProfilePictureController()

    const httpResponse = await sut.handle({ file: undefined })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new RequiredFieldError('file')
    })
  })
})
