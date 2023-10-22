import { mock } from 'jest-mock-extended'

export class DbTransactionController {
  constructor (private readonly db: DbTransaction) {}

  async perform (httpRequest: any): Promise<void> {
    await this.db.openTransaction()
  }
}

export interface DbTransaction {
  openTransaction: () => Promise<void>
}

describe('DbTransactionController', () => {
  it('should openTransaction ', async () => {
    const db = mock<DbTransaction>()
    const sut = new DbTransactionController(db)

    await sut.perform({ any: 'any' })

    expect(db.openTransaction).toHaveBeenCalledTimes(1)
    expect(db.openTransaction).toHaveBeenCalledWith()
  })
})
