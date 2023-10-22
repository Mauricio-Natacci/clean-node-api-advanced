import { Controller } from '@/application/controllers'
import { HttpResponse } from '@/application/helpers'
import { MockProxy, mock } from 'jest-mock-extended'

export class DbTransactionController {
  constructor (
    private readonly decoratee: Controller,
    private readonly db: DbTransaction) {}

  async perform (httpRequest: any): Promise<HttpResponse | undefined> {
    await this.db.openTransaction()

    try {
      const httpReponse = await this.decoratee.perform(httpRequest)
      await this.db.commit()
      await this.db.closeTransaction()
      return httpReponse
    } catch {
      await this.db.rollback()
      await this.db.closeTransaction()
    }
  }
}

export interface DbTransaction {
  openTransaction: () => Promise<void>
  closeTransaction: () => Promise<void>
  commit: () => Promise<void>
  rollback: () => Promise<void>
}

describe('DbTransactionController', () => {
  let db: MockProxy<DbTransaction>
  let decoratee: MockProxy<Controller>
  let sut: DbTransactionController

  beforeAll(() => {
    db = mock()
    decoratee = mock()
    decoratee.perform.mockResolvedValue({ statusCode: 204, data: null })
  })

  beforeEach(() => {
    sut = new DbTransactionController(decoratee, db)
  })

  it('should openTransaction ', async () => {
    await sut.perform({ any: 'any' })

    expect(db.openTransaction).toHaveBeenCalledTimes(1)
    expect(db.openTransaction).toHaveBeenCalledWith()
  })

  it('should execute decoratee with correct value', async () => {
    await sut.perform({ any: 'any' })

    expect(decoratee.perform).toHaveBeenCalledWith({ any: 'any' })
    expect(decoratee.perform).toHaveBeenCalledTimes(1)
  })

  it('should commit and closeTransaction if decoratee succeeds', async () => {
    await sut.perform({ any: 'any' })

    expect(db.commit).toHaveBeenCalledWith()
    expect(db.commit).toHaveBeenCalledTimes(1)
    expect(db.rollback).not.toHaveBeenCalled()
    expect(db.closeTransaction).toHaveBeenCalledWith()
    expect(db.closeTransaction).toHaveBeenCalledTimes(1)
  })

  it('should call rollback and closeTransaction if decoratee fails', async () => {
    decoratee.perform.mockRejectedValueOnce(new Error('decoratee_error'))

    await sut.perform({ any: 'any' })

    expect(db.commit).not.toHaveBeenCalled()
    expect(db.rollback).toHaveBeenCalledWith()
    expect(db.rollback).toHaveBeenCalledTimes(1)
    expect(db.closeTransaction).toHaveBeenCalledWith()
    expect(db.closeTransaction).toHaveBeenCalledTimes(1)
  })

  it('should return same result as decoratee on success', async () => {
    const httpResponse = await sut.perform({ any: 'any' })

    expect(httpResponse).toEqual({ statusCode: 204, data: null })
  })
})
