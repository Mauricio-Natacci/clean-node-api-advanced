import { InvalidMimeTypeError } from '@/application/errors'

type Extensions = 'png' | 'jpg' | 'jpeg'

export class AllowedMimeTypes {
  constructor (
    private readonly allowed: Extensions[],
    private readonly mimeType: string) {}

  validate (): Error | undefined {
    if (this.allowed.includes('png') && this.mimeType !== 'image/png') {
      return new InvalidMimeTypeError(['png'])
    }
  }
}
