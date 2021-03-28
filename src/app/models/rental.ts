export interface Rental {
  id: number;
  carId:number;
  customerId:number
  rentDate:Date;
  returnDate:Date;
  
  brandName: string;
  colorName: string;
  modelYear: number;
  dailyPrice: number;
  description: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;

}
