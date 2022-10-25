import connector from "../../../../common/persistence/mssql.persistence";
import { IMovementRepository } from '../../interfaces/IMovementRepository';
import { IMovementDomain } from '../../domain/IMovementDomain';
//* Conexion a Mysql

export class MovementMSSQLRepository implements IMovementRepository {

  public async find(id: number): Promise<IMovementDomain | null> {
    //* debo esperar la promesa

    const pool = await connector;
    const result = await pool.query`SELECT * FROM wallet_movement WHERE ID = ${id}`;

    if(result.rowsAffected) {
        return result.recordset[0]; //* solo hay un registro debido a que estamos pidiendo por id tomanos el que esta en el indice 0
    }

    return null;
}

public async all(): Promise<IMovementDomain[]> {
    const pool = await connector;
    const result = await pool.query`SELECT * FROM wallet_movement ORDER BY id DESC`;
    return result.recordset;
}

public async store(entry: IMovementDomain): Promise<void> {
    const pool = await connector;
    const now = new Date();
    await pool.query`INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES (${entry.user_id}, ${entry.type}, ${entry.amount}, ${now})`;
}

public async update(entry: IMovementDomain): Promise<void> {
    const pool = await connector;
    const now = new Date();

    await pool.query`UPDATE wallet_movement
                     SET user_id = ${entry.user_id},
                        type = ${entry.type},
                        amount = ${entry.amount}
                        updated_at = ${now}
                     WHERE id = ${entry.id}
                     `;
}

public async remove(id: number): Promise<void> {
    const pool = await connector;
    await pool.query`DELETE FROM wallet_movement WHERE id = ${id}`;
}

}