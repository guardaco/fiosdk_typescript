import { Transactions } from '../Transactions'

export abstract class Query<T> extends Transactions {
  abstract ENDPOINT: string

  abstract getData(): any

  decrypt(result: any): any {
  }

  isEncrypted = false

  async execute(publicKey: string, privateKey: string = '', seen?: any[]): Promise<any> {
    this.publicKey = publicKey
    this.privateKey = privateKey
    if (!this.isEncrypted) {
      return this.executeCall(this.getEndPoint(), JSON.stringify(this.getData()))
    } else {
      try {
        let result = await this.executeCall(this.getEndPoint(), JSON.stringify(this.getData()))
        if (seen && Array.isArray(seen) && seen.length > 0) {
          result = this.seenFilter(result, seen)
        }
        return this.decrypt(result)
      } catch (error) {
        throw error
      }
    }
  }

  seenFilter(data: any, seen: any[]) {
    return data;
  }

  getEndPoint(): string {
    return this.ENDPOINT
  }

}
