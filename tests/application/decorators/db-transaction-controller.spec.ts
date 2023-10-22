import { Controller } from '@/application/controllers'
import { MockProxy, mock } from 'jest-mock-extended'

export class DbTransactionController {
  constructor (
    private readonly decoratee: Controller,
    private readonly db: DbTransaction) {}

  async perform (httpRequest: any): Promise<void> {
    await this.db.openTransaction()
    await this.decoratee.perform(httpRequest)
  }
}

export interface DbTransaction {
  openTransaction: () => Promise<void>
}

describe('DbTransactionController', () => {
  let db: MockProxy<DbTransaction>
  let decoratee: MockProxy<Controller>
  let sut: DbTransactionController

  beforeAll(() => {
    db = mock()
    decoratee = mock()
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
})
