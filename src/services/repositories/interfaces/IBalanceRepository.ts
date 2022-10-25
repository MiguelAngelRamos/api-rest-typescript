import { IBalanceDomain } from "../domain/IBalanceDomain";

export interface IBalanceRepository {

  find(id: number): Promise<IBalanceDomain | null>;
  
  findByUserId(userId: number): Promise<IBalanceDomain | null>;

  all(): Promise<IBalanceDomain[]>;

  store(entry: IBalanceDomain): Promise<void>;

  update(entry: IBalanceDomain): Promise<void>;

  remove(id: number): Promise<void>;
}