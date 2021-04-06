import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandCrudComponent } from './components/brand-crud/brand-crud.component';
import { CarCrudComponent } from './components/car-crud/car-crud.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarComponent } from './components/car/car.component';
import { ColorCrudComponent } from './components/color-crud/color-crud.component';
import { LoginComponent } from './components/login/login.component';
import { NaviComponent } from './components/navi/navi.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentalComponent } from './components/rental/rental.component';
import { SettingComponent } from './components/setting/setting.component';
import { LoginGuard } from './guards/login.guard';

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

  {
    path: 'cars/add/:carId',
    component: CarCrudComponent,
    canActivate: [LoginGuard],
  },
  { path: 'cars/add', component: CarCrudComponent, canActivate: [LoginGuard] },

  {
    path: 'brands/add',
    component: BrandCrudComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'brands/add/:brandId',
    component: BrandCrudComponent,
    canActivate: [LoginGuard],
  },

  {
    path: 'colors/add',
    component: ColorCrudComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'colors/add/:colorId',
    component: ColorCrudComponent,
    canActivate: [LoginGuard],
  },

  { path: 'rentals', component: RentalComponent },
  {
    path: 'payment/:rental',
    component: PaymentComponent,
    canActivate: [LoginGuard],
  },

  { path: 'setting', component: SettingComponent, canActivate: [LoginGuard] },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
