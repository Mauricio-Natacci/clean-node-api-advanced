import dotenv from 'dotenv'

dotenv.config()

export const env = {
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID,
    clientSecret: process.env.FB_CLIENT_SECRET,
    token: process.env.FB_TOKEN,
    fb_id: process.env.FB_ID,
    fb_name: process.env.FB_NAME,
    fb_email: process.env.FB_EMAIL
  },
  s3: {
    accessKey: process.env.AWS_S3_ACCESS_KEY,
    secretKey: process.env.AWS_S3_SECRET_KEY,
    bucket: process.env.AWS_S3_BUCKET
  }
}
