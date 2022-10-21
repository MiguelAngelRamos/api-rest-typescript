import connector from "../../../../common/persistence/mssql.persistence";
import { ISubscriptionDomain } from "../../domain/ISubscriptionDomain";
import { ISubscriptionRepository } from '../../interfaces/ISubscriptionRepository';

export class SubscriptionMSSQLRepository implements ISubscriptionRepository {

  public async all(): Promise<ISubscriptionDomain[]> {
    const pool = await connector;
    const result = await pool.query`SELECT * FROM wallet_subscription ORDER BY id DESC`;
    return result.recordset;
  }

  public async find(id: number): Promise<ISubscriptionDomain | null> {
    throw new Error("Method not implemented.");
  }

  public async findByUserIdAndCode(user_id: number, code: string): Promise<ISubscriptionDomain | null> {
    throw new Error("Method not implemented.");
  }

  public async store(entry: ISubscriptionDomain): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async update(entry: ISubscriptionDomain): Promise<void> {
    throw new Error("Method not implemented.");
  }
  public async remove(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }

}