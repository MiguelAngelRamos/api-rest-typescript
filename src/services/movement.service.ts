import { IMovementCreateDto } from '../dtos/movement.dto';
import { IMovementDomain } from './repositories/domain/IMovementDomain';
import { MovementMySQLRepository } from './repositories/impl/mysql/movement.repository';
import { BalanceMysqlRepository } from './repositories/impl/mysql/balance.repository';
import { MovementType } from '../enums/movement-type';
import { ApplicationException } from '../common/exceptions/application.exception';
import { IBalanceDomain } from './repositories/domain/IBalanceDomain';

//* Los servicios son los encargados de satisfacer la logica de negocio
export class MovementService {

  constructor(
    private readonly movementRepository: MovementMySQLRepository,
    private readonly balanceRepository: BalanceMysqlRepository
    ) {}

    public async find(id: number): Promise<IMovementDomain | null> {
      return await this.movementRepository.find(id);
    }

    public async all(): Promise<IMovementDomain[]> {
      return await this.movementRepository.all();
    }

    public async store(entry: IMovementCreateDto): Promise<void> {
      //* puede ser un ingreso o puede ser una salida
      //* Cuando realizemos un movimiento se debera actualizar nuestro balance actual
      //* TRAER EL BALANCE ACTUAL
      const balance = await this.balanceRepository.findByUserId(entry.user_id);

      if(entry.type === MovementType.income) {
        await this.income(entry, balance);
      } else if (entry.type === MovementType.outcome) {
        await this.outcome(entry, balance);
      } else {
        throw new ApplicationException('Invalida movement type supplied');
      }
    }


    private async income(entry: IMovementCreateDto, balance: IBalanceDomain | null) {
      if(!balance) {
        await this.balanceRepository.store({
          amount: entry.amount,
          user_id: entry.user_id
        } as IBalanceDomain);
      } else {
        balance.amount += entry.amount; //* le pasamos el monto que se esta intentando ingresar
        //* Luego hacemos un update al balance
        await this.balanceRepository.update(balance);
      }
      //* Registrar el movimiento
     await this.movementRepository.store(entry as IMovementDomain);
    }

    private async outcome(entry: IMovementCreateDto, balance: IBalanceDomain | null) {
      // * si no existe el balance o si el monto que se quiere retirar es mayor al del balance
      if(!balance || balance.amount < entry.amount) {
        throw new ApplicationException('User does not have enough balance.');
        // El usuario no tiene saldo suficiente
      } else {
         //* Actualizar el balance actual del usuario
         balance.amount -= entry.amount;
         //* Actualizamos en balance
         await this.balanceRepository.update(balance);
         await this.movementRepository.store(entry as IMovementDomain);
      }
    }
}