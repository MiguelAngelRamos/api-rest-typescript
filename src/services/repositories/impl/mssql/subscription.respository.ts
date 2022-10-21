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
    const pool = await connector;
    const result = await pool.query`SELECT * FROM wallet_subscription WHERE id = ${id}`;

    if(result.rowsAffected) {
      return result.recordset[0];
    }
    return null;
  }

  public async findByUserIdAndCode(user_id: number, code: string): Promise<ISubscriptionDomain | null> {
    const pool = await connector;
    const result = await pool.query`SELECT * FROM wallet_subscription WHERE user_id = ${user_id} AND code = ${code}`;

    if(result.rowsAffected) {
      return result.recordset[0];
    }
    return null;
  }

  public async store(entry: ISubscriptionDomain): Promise<void> {

    const pool = await connector;
    const now = new Date();
    entry.created_at = now;
    await pool.query`INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(${entry.user_id},${entry.code},${entry.amount},${entry.cron}, ${entry.created_at})`;
  }

  public async update(entry: ISubscriptionDomain): Promise<void> {

    const pool = await connector;
    const now = new Date();
    entry.updated_at = now;

    await pool.query`UPDATE wallet_subscription
          SET user_id = ${entry.user_id},
              code = ${entry.code},
              amount = ${entry.amount},
              cron = ${entry.cron}, 
              updated_at = ${entry.updated_at}
          WHERE id = ${entry.id}`;
  }

  public async remove(id: number): Promise<void> {

    const pool = await connector;
    await pool.query`DELETE FROM wallet_subscription WHERE id = ${id}`;

  }

}