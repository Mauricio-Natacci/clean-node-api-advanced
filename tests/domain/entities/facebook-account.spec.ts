import { FacebookAccount } from '@/domain/entities'

describe('FacebookAccount', () => {
  const fbData = {
    name: 'any_fb_name',
    email: 'any_fb_email',
    facebookId: 'any_fb_id'
  }

  it('should create with facebook data only', async () => {
    const sut = new FacebookAccount(fbData)

    expect(sut).toEqual(fbData)
  })

  it('should update name if its empty', async () => {
    const accountData = { id: 'any_id' }
    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: accountData.id,
      name: fbData.name,
      email: fbData.email,
      facebookId: fbData.facebookId
    })
  })

  it('should not update name if its not empty', async () => {
    const accountData = { id: 'any_id', name: 'any_name' }
    const sut = new FacebookAccount(fbData, accountData)

    expect(sut).toEqual({
      id: accountData.id,
      name: accountData.name,
      email: fbData.email,
      facebookId: fbData.facebookId
    })
  })
})
