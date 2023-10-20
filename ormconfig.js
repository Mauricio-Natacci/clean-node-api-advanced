module.exports = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  entities: [
    `${process.env.TS_NODE_DEV === undefined ? 'dist' : 'src'}/infra/repos/postgres/entities/index.{js,ts}`
  ]
}