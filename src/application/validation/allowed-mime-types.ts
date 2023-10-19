import { InvalidMimeTypeError } from '@/application/errors'

export type Extension = 'png' | 'jpg' | 'jpeg'

export class AllowedMimeTypes {
  constructor (
    private readonly allowed: Extension[],
    private readonly mimeType: string) {}

  validate (): Error | undefined {
    if (this.allowed.includes('png') && this.mimeType !== 'image/png') {
      return new InvalidMimeTypeError(['png'])
    }
  }
}
