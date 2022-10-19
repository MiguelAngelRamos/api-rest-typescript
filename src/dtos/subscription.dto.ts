export interface ISubscriptionCreateDto {
  code: string;
  user_id: number;
  amount: number;
  cron: string;
}

export interface ISuscriptionUpdateDto {
  code: string;
  amount: number;
  cron: string;
}