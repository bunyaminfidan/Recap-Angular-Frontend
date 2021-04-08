export interface RegisteredCreditCard {
  id: number;
  userId: number;
  nameOnTheCard: string;
  number: string;
  cvv: string;
  expirationDate: string;
  isActive: boolean;
}
