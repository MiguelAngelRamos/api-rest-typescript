import { IMovementDomain } from "../domain/IMovementDomain";

export interface IMovementRepository {
  
  find(id: number): Promise<IMovementDomain | null>;
  
  all(): Promise<IMovementDomain[]>;
  
  store(entry: IMovementDomain): Promise<void>;

  update(entry: IMovementDomain): Promise<void>;

  remove(id: number): Promise<void>;
}