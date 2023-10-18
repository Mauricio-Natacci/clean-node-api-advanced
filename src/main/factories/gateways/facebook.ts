import { FacebookApi } from '@/infra/gateways'
import { env } from '@/main/config/env'
import { makeAxiosHttpClient } from '@/main/factories/gateways'

export const makeFacebookApi = (): FacebookApi => {
  return new FacebookApi(
    makeAxiosHttpClient(),
    env.facebookApi.clientId as string,
    env.facebookApi.clientSecret as string
  )
}
