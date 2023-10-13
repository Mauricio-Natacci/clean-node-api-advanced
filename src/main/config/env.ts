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
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD
  }
}
