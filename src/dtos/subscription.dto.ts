export interface ISubscriptionCreateDto {
  code: string;
  user_id: number;
  amount: number;
  cron: string;
}