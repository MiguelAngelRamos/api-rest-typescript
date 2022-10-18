import { ISubscriptionDomain } from './repositories/domain/ISubscriptionDomain';
import { ISubscriptionRepository } from './repositories/interfaces/ISubscriptionRepository';
import { ISubscriptionCreateDto } from '../dtos/subscription.dto';

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
    }
  }
}