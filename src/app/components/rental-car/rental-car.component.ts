import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CustomerService } from 'src/app/services/customer.service';
import { CarService } from 'src/app/services/car.service';
import { CarDetail } from 'src/app/models/carDetail';
import { CustomerDetail } from 'src/app/models/customerDetail';

@Component({
  selector: 'app-rental-car',
  templateUrl: './rental-car.component.html',
  styleUrls: ['./rental-car.component.css'],
  providers: [DatePipe],
})
export class RentalCarComponent implements OnInit {
  customerDetails: CustomerDetail[];
  carDetails: CarDetail
  dataLoaded = false;

  customerId: number;
  rentDate: Date;
  returnDate: Date;
  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;

  constructor(
    private customerService: CustomerService,
    private carService:CarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getByIdCarDetail(params['carId']);
      
      } else {
        console.log('this.getByIdCarDetail(params(carId):  else çalıştı.');
      }
    });

    this.getCustomer();
  }

  getByIdCarDetail(carId: number) {
    this.carService.getByIdCarDetail(carId).subscribe((response) => {
     this.carDetails = response.data[0]
      this.dataLoaded = true;
    });
  }

  getCustomer() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customerDetails = response.data;
      this.dataLoaded = true;
    });
  }

  createRental() {
    let MyRental: Rental = {
      rentDate: this.rentDate,
      returnDate: this.returnDate,
      customerId: this.customerId,
      carId: this.carDetails.id,
    };
    if (MyRental.customerId == undefined || MyRental.rentDate == undefined) {
      this.toastrService.error(
        'Eksik bilgi girdiniz',
        'Bilgilerinizi kontrol edin'
      );
    } else {
      this.router.navigate(['dashboard/payment/', JSON.stringify(MyRental)]);
      this.toastrService.info(
        'Ödeme sayfasına yönlendiriliyorsunuz...',
        'Ödeme İşlemleri'
      );
    }
  }

  startDateEvent(event: any) {
    this.minDate = event.target.value;
    this.firstDateSelected = true;
  }

  // event.toISOString()
  //> "2011-10-05T14:48:00.000Z"
  // event.toISOString().slice(0,10)
  //> "2011-10-05"
  getStartDateToMinDate() {
    this.minDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    return this.minDate;
  }

  getReturnMinDate() {
    if (this.rentDate != undefined) {
      let stringToDate = new Date(this.rentDate);
      let new_date = new Date();
      new_date.setDate(stringToDate.getDate() + 1);
      return new_date.toISOString().slice(0, 10);
    } else {
      return this.rentDate;
    }
  }
  getReturnMaxDate() {
    this.maxDate = this.datePipe.transform(
      new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      'yyyy-MM-dd'
    );
    return this.maxDate;
  }

  setCustomerId(customerId: string) {
    this.customerId = +customerId;
    console.log(this.customerId);
  }
}
