import { Car } from './car';
import { ResponseModel } from './responseModel';

export interface CarResponseModule extends ResponseModel {
  data: Car[];
}
