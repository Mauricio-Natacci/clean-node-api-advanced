import { Controller } from '@/application/controllers'
import { HttpResponse, ok } from '@/application/helpers'
import {
  ValidationBuilder as Builder,
  Validator
} from '@/application/validation'
import { ChangeProfilePicture } from '@/domain/use-cases'

type HttpRequest = { file: { buffer: Buffer, mimeType: string }, userId: string }
type Model = { initials?: string, pictureUrl?: string } | Error

export class SaveProfilePictureController extends Controller {
  constructor (private readonly changeProfilePicture: ChangeProfilePicture) {
    super()
  }

  async perform ({ file, userId }: HttpRequest): Promise<HttpResponse<Model>> {
    const data = await this.changeProfilePicture({ id: userId, file })

    return ok(data)
  }

  override buildValidators ({ file }: HttpRequest): Validator[] {
    return [
      ...Builder.of({ value: file, fieldName: 'file' })
        .required()
        .image({ allowed: ['png', 'jpg', 'jpeg'], maxSizeInMb: 5 })
        .build()
    ]
  }
}
