import dotenv from 'dotenv'

dotenv.config()

export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    token: process.env.FB_TOKEN,
    fb_id: process.env.FB_ID,
    fb_name: process.env.FB_NAME,
    fb_email: process.env.FB_EMAIL
  }
}
