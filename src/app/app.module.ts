import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // api istek için http isteği için gerek
import { FormsModule,ReactiveFormsModule  } from '@angular/forms'; // ngModule kullanmak için. html de girilen texti alabilmek için.
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { ToastrModule } from 'ngx-toastr';//Bildirim işlemleri için. Alertfy gibi

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarImageComponent } from './components/car-image/car-image.component';
import { FilterPipePipe } from './pipes/filter-pipe.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { RentalCarComponent } from './components/rental-car/rental-car.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarCrudComponent } from './components/car-crud/car-crud.component';
import { BrandCrudComponent } from './components/brand-crud/brand-crud.component';
import { ColorCrudComponent } from './components/color-crud/color-crud.component';
import { SettingComponent } from './components/setting/setting.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountComponent } from './components/account/account.component';
import { RegisteredCreditCardComponent } from './components/registered-credit-card/registered-credit-card.component';




@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailComponent,
    CarImageComponent,
    FilterPipePipe,
    CarFilterComponent,
    RentalCarComponent,
    PaymentComponent,
    CarCrudComponent,
    BrandCrudComponent,
    ColorCrudComponent,
    SettingComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    AccountComponent,
    RegisteredCreditCardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, // api istek için http isteği için gerek
    FormsModule, // ngModule kullanmak için. html de girilen texti alabilmek için. benim uygulamama forms ile ilgili çalışmları desteğini ver
    ReactiveFormsModule, //html form kontrolleri için
    BrowserAnimationsModule, //Toastr bildirim için
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }), //Bildirim işlemleri için. Alertfy gibi
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
