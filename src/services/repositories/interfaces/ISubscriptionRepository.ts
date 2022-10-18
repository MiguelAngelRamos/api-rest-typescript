import { ISubscriptionDomain } from "../domain/ISubscriptionDomain";

export interface ISubscriptionRepository {

  all(): Promise<ISubscriptionDomain[]>;

  find(id: number): Promise<ISubscriptionDomain | null>;

  findByUserIdAndCode(user_id: number, code: string): Promise<ISubscriptionDomain | null>;

  store(entry: ISubscriptionDomain): Promise<void>;

  update(entry: ISubscriptionDomain): Promise<void>;

  remove(id: number): Promise<void>;

}