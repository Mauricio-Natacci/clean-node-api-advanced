import { UniqueId } from '@/infra/gateways'
import { reset, set } from 'mockdate'

describe('UniqueId', () => {
  let sut: UniqueId

  beforeAll(() => {
    set(new Date(2021, 9, 3, 10, 10, 10))
    sut = new UniqueId()
  })

  afterAll(() => {
    reset()
  })

  it('should call an unique id', () => {
    const uuid = sut.uuid({ key: 'any_key' })

    expect(uuid).toBe('any_key_20211003101010')
  })
})
