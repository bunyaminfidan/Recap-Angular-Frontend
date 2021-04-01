import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandCrudComponent } from './components/brand-crud/brand-crud.component';
import { CarCrudComponent } from './components/car-crud/car-crud.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarComponent } from './components/car/car.component';
import { ColorCrudComponent } from './components/color-crud/color-crud.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentalComponent } from './components/rental/rental.component';
import { SettingComponent } from './components/setting/setting.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/carDetail/:carId', component: CarDetailComponent },
  { path: 'cars/carImages/:carId', component: CarImageComponent },

  { path: 'cars/filter/:colorId', component: CarComponent },
  { path: 'cars/filter/:brandId/', component: CarComponent },
  { path: 'cars/filter/:brandId/:colorId', component: CarComponent },

  { path: 'cars/add/:carId', component: CarCrudComponent },
  { path: 'cars/add', component: CarCrudComponent },

  { path: 'brands/add', component: BrandCrudComponent },
  { path: 'brands/add/:brandId', component: BrandCrudComponent },

  { path: 'colors/add', component: ColorCrudComponent },
  { path: 'colors/add/:colorId', component: ColorCrudComponent },

  { path: 'rentals', component: RentalComponent },
  { path: 'payment/:rental', component: PaymentComponent },

  { path: 'setting', component: SettingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
