export interface ISubscriptionDomain {
  id: number;
  user_id: number;
  code: string;
  amount: number;
  cron: string;
  created_at: Date | null;
  updated_at: Date | null;
}

// export class SubcriptionDomain {
//   public id: number;
//   public user_id: number;
//   public code: string;
//   public amount: number;
//   public cron: string;
//   public created_at: Date | null;
//   public updated_at: Date | null;

//   constructor(id: number, user_id: number, code: string, amount: number, cron: string, created_at: Date, updated_at: Date) {
//      this.id = id;
//      this.user_id = user_id;
//      this.code = code;
//      this.amount = amount;
//      this.cron = cron;
//      this.created_at = created_at;
//      this.updated_at = updated_at;
//   }
// }