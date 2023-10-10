import { FacebookApi } from '@/infra/apis'
import { AxiosHttpClient } from '@/infra/http'
import { env } from '@/main/config/env'

describe('Facebook Api Integration Tests', () => {
  let axiosClient: AxiosHttpClient
  let sut: FacebookApi

  beforeEach(() => {
    axiosClient = new AxiosHttpClient()
    sut = new FacebookApi(
      axiosClient,
      env.facebookApi.clientId as string,
      env.facebookApi.clientSecret as string
    )
  })

  it('should return a Facebook User if token is valid', async () => {
    const facebookUser = await sut.loadUser({ token: env.facebookApi.token as string })

    expect(facebookUser).toEqual({
      facebookId: env.facebookApi.fb_id as string,
      email: env.facebookApi.fb_email as string,
      name: env.facebookApi.fb_name as string
    })
  })

  it('should return undefined if token is invalid', async () => {
    const fbUser = await sut.loadUser({ token: 'invalid' })

    expect(fbUser).toBeUndefined()
  })
})
