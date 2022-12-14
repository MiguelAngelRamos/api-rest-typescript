import connector from "../../../../common/persistence/mssql.persistence";

import { IBalanceDomain } from '../../domain/IBalanceDomain';
import { IBalanceRepository } from '../../interfaces/IBalanceRepository';



export class BalanceMSSQLRepository implements IBalanceRepository {
    public async find(id: number): Promise<IBalanceDomain | null> {
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance WHERE id = ${id}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }

        return null;
    }

    public async findByUserId(userId: number): Promise<IBalanceDomain | null> {
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance WHERE user_id = ${userId}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }

        return null;
    }

    public async all(): Promise<IBalanceDomain[]> {
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance ORDER BY id DESC`;

        return result.recordset;
    }

    public async store(entry: IBalanceDomain): Promise<void> {
        const pool = await connector;
        const now = new Date();

        entry.created_at = now;

        await pool.query`INSERT INTO wallet_balance(user_id, amount, created_at)
             VALUES(${entry.user_id}, ${entry.amount}, ${entry.created_at})`;
    }

    public async update(entry: IBalanceDomain): Promise<void> {
        const pool = await connector;
        const now = new Date();

        entry.updated_at = now;

        await pool.query`UPDATE wallet_balance
             SET user_id = ${entry.user_id},
                 amount = ${entry.amount},
                 updated_at = ${entry.updated_at}
             WHERE id = ${entry.id}`;
    }

    public async remove(id: number): Promise<void> {
        const pool = await connector;

        await pool.query`DELETE FROM wallet_balance WHERE id = ${id}`;
    }
}