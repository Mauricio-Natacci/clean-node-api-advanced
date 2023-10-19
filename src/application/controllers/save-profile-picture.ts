import { Controller } from '@/application/controllers'
import { InvalidMimeTypeError, MaxFileSizeError, RequiredFieldError } from '@/application/errors'
import { HttpResponse, badRequest, ok } from '@/application/helpers'
import { ChangeProfilePicture } from '@/domain/use-cases'

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = { initials?: string, pictureUrl?: string } | Error

export class SaveProfilePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    if (file === undefined || file === null || file.buffer.length === 0) {
      return badRequest(new RequiredFieldError('file'))
    }

    const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

    if (!allowedTypes.includes(file.mimeType)) {
      return badRequest(new InvalidMimeTypeError(['png, jpg, jpeg']))
    }

    if (file.buffer.length > 5 * 1024 * 1024) {
      return badRequest(new MaxFileSizeError(5))
    }

    const data = await this.changeProfilePicture({ id: userId, file: file.buffer })

    return ok(data)
  }
}
