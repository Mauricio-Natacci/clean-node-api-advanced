import { ConnectionNotFoundError } from '@/infra/repos/postgres/helpers'
import { ObjectLiteral, ObjectType, QueryRunner, Repository, createConnection, getConnection, getConnectionManager } from 'typeorm'

export class PgConnection {
  private static instance?: PgConnection
  private query?: QueryRunner

  private constructor () {}

  static getInstance (): PgConnection {
    if (PgConnection.instance === undefined) {
      PgConnection.instance = new PgConnection()
    }

    return PgConnection.instance
  }

  async connect (): Promise<void> {
    const connectionManager = getConnectionManager()
    const hasConnection = connectionManager.has('default')

    if (!hasConnection) {
      await createConnection()
    }

    const connection = getConnection()

    this.query = connection.createQueryRunner()
  }

  async disconnect (): Promise<void> {
    if (this.query === undefined) {
      throw new ConnectionNotFoundError()
    }

    const connection = getConnection()

    await connection.close()
    this.query = undefined
  }

  async openTransaction (): Promise<void> {
    if (this.query === undefined) {
      throw new ConnectionNotFoundError()
    }

    await this.query.startTransaction()
  }

  async closeTransaction (): Promise<void> {
    if (this.query === undefined) {
      throw new ConnectionNotFoundError()
    }

    await this.query.release()
  }

  async commit (): Promise<void> {
    if (this.query === undefined) {
      throw new ConnectionNotFoundError()
    }

    await this.query.commitTransaction()
  }

  async rollback (): Promise<void> {
    if (this.query === undefined) {
      throw new ConnectionNotFoundError()
    }

    await this.query.rollbackTransaction()
  }

  getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
    if (this.query === undefined) {
      throw new ConnectionNotFoundError()
    }

    return this.query.manager.getRepository(entity)
  }
}
