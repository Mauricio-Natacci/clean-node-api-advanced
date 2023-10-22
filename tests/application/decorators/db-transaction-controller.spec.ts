import { MockProxy, mock } from 'jest-mock-extended'

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
  let db: MockProxy<DbTransaction>
  let sut: DbTransactionController

  beforeAll(() => {
    db = mock<DbTransaction>()
  })

  beforeEach(() => {
    sut = new DbTransactionController(db)
  })

  it('should openTransaction ', async () => {
    await sut.perform({ any: 'any' })

    expect(db.openTransaction).toHaveBeenCalledTimes(1)
    expect(db.openTransaction).toHaveBeenCalledWith()
  })
})
