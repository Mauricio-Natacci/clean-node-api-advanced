import { DbTransaction } from '@/application/contracts'
import { ConnectionNotFoundError, TransactionNotFoundError } from '@/infra/repos/postgres/helpers'
import {
  Connection,
  ObjectLiteral,
  ObjectType,
  QueryRunner,
  Repository,
  createConnection,
  getConnection,
  getConnectionManager,
  getRepository
} from 'typeorm'

export class PgConnection implements DbTransaction {
  private static instance?: PgConnection
  private query?: QueryRunner
  private connection?: Connection

  private constructor () {}

  static getInstance (): PgConnection {
    if (PgConnection.instance === undefined) {
      PgConnection.instance = new PgConnection()
    }

    return PgConnection.instance
  }

  async connect (): Promise<void> {
    const connectionManager = getConnectionManager().has('default')

    if (connectionManager) {
      this.connection = getConnection()
      return
    }

    this.connection = await createConnection()
  }

  async disconnect (): Promise<void> {
    if (this.connection === undefined) {
      throw new ConnectionNotFoundError()
    }

    const connection = getConnection()

    await connection.close()
    this.query = undefined
    this.connection = undefined
  }

  async openTransaction (): Promise<void> {
    if (this.connection === undefined) {
      throw new ConnectionNotFoundError()
    }

    this.query = this.connection.createQueryRunner()

    await this.query.startTransaction()
  }

  async closeTransaction (): Promise<void> {
    if (this.query === undefined) {
      throw new TransactionNotFoundError()
    }

    await this.query.release()
  }

  async commit (): Promise<void> {
    if (this.query === undefined) {
      throw new TransactionNotFoundError()
    }

    await this.query.commitTransaction()
  }

  async rollback (): Promise<void> {
    if (this.query === undefined) {
      throw new TransactionNotFoundError()
    }

    await this.query.rollbackTransaction()
  }

  getRepository<Entity extends ObjectLiteral> (entity: ObjectType<Entity>): Repository<Entity> {
    if (this.connection === undefined) {
      throw new ConnectionNotFoundError()
    }

    if (this.query !== undefined) {
      return this.query.manager.getRepository(entity)
    }

    return getRepository(entity)
  }
}
