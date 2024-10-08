import { RequiredFieldError } from '@/application/errors'
import { Required, RequiredBuffer, RequiredString } from '@/application/validation'

describe('Required', () => {
  it('should return RequiredFieldError if value is null', async () => {
    const sut = new Required(null as any, 'any_field')
    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return RequiredFieldError if value is undefined', async () => {
    const sut = new Required(undefined as any, 'any_field')
    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return undefined if value is not empty', async () => {
    const sut = new Required('any_value', 'any_field')
    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})

describe('RequiredString', () => {
  it('should extends Required', async () => {
    const sut = new RequiredString('')

    expect(sut).toBeInstanceOf(Required)
  })

  it('should return RequiredFieldError if value is empty', async () => {
    const sut = new RequiredString('', 'any_field')
    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return undefined if value is not empty', async () => {
    const sut = new RequiredString('any_value', 'any_field')
    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})

describe('RequiredBuffer', () => {
  it('should extends Required', async () => {
    const sut = new RequiredBuffer(Buffer.from(''))

    expect(sut).toBeInstanceOf(Required)
  })

  it('should return RequiredFieldError if value is empty', async () => {
    const sut = new RequiredBuffer(Buffer.from(''))
    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError())
  })

  it('should return undefined if value is not empty', async () => {
    const sut = new RequiredBuffer(Buffer.from('any_value'))
    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
