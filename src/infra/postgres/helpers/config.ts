import { env } from '@/main/config/env'
import { ConnectionOptions } from 'typeorm'

export const config: ConnectionOptions = {
  type: 'postgres',
  host: env.connection.host,
  port: Number(env.connection.port),
  username: env.connection.username,
  database: env.connection.database,
  password: env.connection.password,
  entities: ['dist/infra/postgres/entities/index.js']
}
