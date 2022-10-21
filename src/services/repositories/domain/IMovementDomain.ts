import { MovementType } from "../../../enums/movement-type";

export interface IMovementDomain {
  id: number;
  user_id: number;
  type: MovementType;
  amount: number;
  created_at: Date | null;
  updated_at: Date | null;
}