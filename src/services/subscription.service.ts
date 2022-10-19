import { ISubscriptionDomain } from './repositories/domain/ISubscriptionDomain';
import { ISubscriptionRepository } from './repositories/interfaces/ISubscriptionRepository';
import { ISubscriptionCreateDto, ISuscriptionUpdateDto } from '../dtos/subscription.dto';
import { ApplicationException } from '../common/exceptions/application.exception';

export class SubscriptionService {

  constructor( private readonly subscriptionRepository: ISubscriptionRepository ){}

  public async all(): Promise<ISubscriptionDomain []> {
    return await this.subscriptionRepository.all();
  }

  public async find(id: number): Promise<ISubscriptionDomain | null > {
    return await this.subscriptionRepository.find(id);
  }

  //* Servicio para crear una subscripción

  public async store(entry: ISubscriptionCreateDto): Promise<void> {
    //* Buscar si existe un usuario asociado a la subscription
    const originalEntry = await this.subscriptionRepository.findByUserIdAndCode(entry.user_id, entry.code);
    console.log(originalEntry);

    if(!originalEntry) {
      await this.subscriptionRepository.store(entry as ISubscriptionDomain);
    } else {
      throw new ApplicationException('User subscription already existis!');
    }
  }

  //* Actualizar
  public async update(id: number, entry: ISuscriptionUpdateDto ): Promise<void> {
    //* vamos a traer la subscription para actualizarla
    const originalEntry = await this.subscriptionRepository.find(id);

    //* existe un subscription, vamos actualizar
    if(originalEntry) {
      originalEntry.code= entry.code;
      originalEntry.amount = entry.amount;
      originalEntry.cron = entry.cron;
      //* Actualizamos
      await this.subscriptionRepository.update(originalEntry);
    } else {
      throw new ApplicationException('Subscription not found');
    }
  }

  //* Eliminar la subscription
  public async remove(id: number): Promise<void> {
    await this.subscriptionRepository.remove(id);
  }
}