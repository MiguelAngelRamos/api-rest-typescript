import connector from "../../../../common/persistence/mysql.persistence";
import { ISubscriptionDomain } from '../../domain/ISubscriptionDomain';
import { ISubscriptionRepository } from '../../interfaces/ISubscriptionRepository';

export class SubscriptionMySQLRepository implements ISubscriptionRepository {
  
  public async all(): Promise<ISubscriptionDomain[]> {
    //* acceso al primer elemento con indice 0
    const [rows] = await connector.execute(
      'SELECT * FROM wallet_subscription ORDER BY id DESC'
    );
    return rows as ISubscriptionDomain[];
    //TODO: IMPLEMENTAR EL TRYCATCH en el servicio
  }

  public async find(id: number): Promise<ISubscriptionDomain | null> {

    const [rows]: any [] = await connector.execute(
      'SELECT * FROM wallet_subscription WHERE id = ?', [id]
    );

    if(rows.length) {
      return rows[0] as ISubscriptionDomain;
    } else {
      return null;
    }
   
  }
  public async findByUserIdAndCode(user_id: number, code: string): Promise<ISubscriptionDomain | null> {

    const [rows]: any [] = await connector.execute(
      'SELECT * FROM wallet_subscription WHERE user_id = ? AND code = ?', [user_id, code]
    );

    if(rows.length) {
      return rows[0] as ISubscriptionDomain;
    }
    return null;
  }

  public async store(entry: ISubscriptionDomain): Promise<void> {
    const nowDate = new Date();
    await connector.execute(
      'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES (?, ?, ?, ?, ?)',
      [entry.user_id, entry.code, entry.amount, entry.cron, nowDate]
    );
  }

  public async update(entry: ISubscriptionDomain): Promise<void> {
    const nowDate = new Date();
    await connector.execute(
      'UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ?, WHERE id = ?',
      [entry.user_id, entry.code, entry.amount, entry.cron, nowDate, entry.id]
    );
    //* El ultimo parametro hace referencia al where id (entry.id)
  }
  public async remove(id: number): Promise<void> {
    await connector.execute(
      'DELETE FROM wallet_subscription WHERE id = ?', [id]
    );
  }
}
