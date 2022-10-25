import connector from "../../../../common/persistence/mysql.persistence";
import { IBalanceDomain } from '../../domain/IBalanceDomain';
import { IBalanceRepository } from '../../interfaces/IBalanceRepository';

export class BalanceMysqlRepository implements IBalanceRepository {
    public async find(id: number): Promise<IBalanceDomain | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_balance WHERE id = ?',
            [id]
        );

        if (rows.length) {
            return rows[0];
        }

        return null;
    }

    public async findByUserId(userId: number): Promise<IBalanceDomain | null> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_balance WHERE user_id = ?',
            [userId]
        );

        if (rows.length) {
            return rows[0];
        }

        return null;
    }

    public async all(): Promise<IBalanceDomain[]> {
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_balance ORDER BY id DESC'
        );

        return rows as IBalanceDomain[];
    }

    public async store(entry: IBalanceDomain): Promise<void> {
        const now = new Date();

        await connector.execute(
            'INSERT INTO wallet_balance(user_id, amount, created_at) VALUES(?, ?, ?)',
            [entry.user_id, entry.amount, now]
        );
    }

    public async update(entry: IBalanceDomain): Promise<void> {
        const now = new Date();

        await connector.execute(
            'UPDATE wallet_balance SET user_id = ?, amount = ?, updated_at = ? WHERE id = ?',
            [entry.user_id, entry.amount, now, entry.id]
        );
    }

    public async remove(id: number): Promise<void> {
        await connector.execute(
            'DELETE FROM wallet_balance WHERE id = ?',
            [id]
        );
    }
}