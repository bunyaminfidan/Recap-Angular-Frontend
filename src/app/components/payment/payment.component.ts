import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { FakeCard } from 'src/app/models/fakeCard';
import { RegisteredCreditCard } from 'src/app/models/registeredCreditCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FakeCardService } from 'src/app/services/fake-card.service';
import { RentalService } from 'src/app/services/rental.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisteredCreditCardService } from 'src/app/services/registered-credit-card.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;

  rental: Rental;
  carDetails: CarDetail;
  customeDetails: CustomerDetail;

  getCustomerId: number;
  currentUserId: number;

  registeredCardCheck: boolean;

  amountOfPayment: number = 0;
  isCardCorrect: boolean;

  fakeCard: FakeCard;
  registeredCreditCard: RegisteredCreditCard;

  currentRegisteredCreditCard: RegisteredCreditCard;

  constructor(
    private activateRoute: ActivatedRoute,
    private carService: CarService,
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private fakeCardService: FakeCardService,
    private formBuilder: FormBuilder,
    private registeredCreditCardService: RegisteredCreditCardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId;
        this.getCustomerDetailById(this.getCustomerId);
        this.getCarDetail();
        this.currentUserId = this.authService.getUserId();
      }
    });
    this.createPaymentForm();
  }
  createPaymentForm() {
    this.paymentForm = this.formBuilder.group({
      nameOnTheCard: ['', Validators.required],
      number: ['', Validators.required],
      cvv: ['', Validators.required],
      expirationDate: ['', Validators.required],
    });
  }

  getRegisteredComponentCurrentCardOutPut(
    currentRegisteredCreditCard: RegisteredCreditCard
  ) {
    this.paymentForm.patchValue(currentRegisteredCreditCard);
  }

  getCustomerDetailById(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((response) => {
      this.customeDetails = response.data;
    });
  }

  getCarDetail() {
    this.carService
      .getByIdCarDetail(this.rental.carId)
      .subscribe((response) => {
        this.carDetails = response.data[0];
        this.paymentCalculator();
      });
  }

  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      //zamanFark değişkeni ile elde edilen saati güne çevirmek için aşağıdaki yöntem kullanılabilir.
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));

      this.amountOfPayment = numberOfDays * this.carDetails.dailyPrice;
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['cars']);
        this.toastrService.error(
          'Araç listesine yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
    }
  }

  async rentACar() {
    if (this.paymentForm.valid) {
      this.createFakeCard();
      this.createRegisteredCreditCard();
      this.isCardExist();
      this.checkIsCardOrSaveCard(this.isCardCorrect);
      this.checkIsCardInfo(this.isCardCorrect);
    }
  }

  createFakeCard() {
    this.fakeCard = {
      nameOnTheCard: this.paymentForm.value.nameOnTheCard,
      number: this.paymentForm.value.number,
      expirationDate: this.paymentForm.value.expirationDate,
      cvv: this.paymentForm.value.cvv,
    };
  }

  createRegisteredCreditCard() {
    this.registeredCreditCard = Object.assign({}, this.paymentForm.value);
    this.registeredCreditCard.userId = this.currentUserId;
    this.registeredCreditCard.isActive = true;
    console.log(this.registeredCreditCard);
  }

  checkIsCardOrSaveCard(isCard: boolean) {
    if (isCard) {
      if (this.registeredCardCheck) {
        this.registeredCreditCardService
          .isRegisteredCreditCard(this.registeredCreditCard)
          .subscribe(
            (response) => {
              this.toastrService.info(
                'Kartınız sistemde zaten kayıtlı',
                'Bilgi'
              );
            },
            (responseError) => {
              this.registeredCreditCardService
                .add(this.registeredCreditCard)
                .subscribe((response) => {
                  this.toastrService.success(response.message, 'Başarılı');
                });
            }
          );
      }
    }
  }

  isHaveCardMoneyAndSell() {
    if (this.fakeCard.moneyInTheCard >= this.amountOfPayment) {
      this.fakeCard.moneyInTheCard =
        this.fakeCard.moneyInTheCard - this.amountOfPayment;
    } else {
      this.toastrService.error(
        'Kartınızda yeterli miktar bulunmamaktadır',
        'Bakiye Yetersiz'
      );
    }
  }

  fakeCardUpdate(fakeCard: FakeCard) {
    this.fakeCardService.updateCard(this.fakeCard).subscribe((response) => {});
  }

  addRental() {
    this.rentalService.addRental(this.rental).subscribe((response) => {
      if (response.success) {
        this.toastrService.success(response.message, 'Işlem başarılı');
      } else {
        this.toastrService.error('Kiralama işlemi hatalı', 'Hata');
      }
    });
  }
  async checkIsCardInfo(check: boolean) {
    if (check) {
      this.fakeCard = (
        await this.fakeCardService
          .getCardByNumber(this.paymentForm.value.number)
          .toPromise()
      ).data[0];

      this.isHaveCardMoneyAndSell();
      this.fakeCardUpdate;
      this.addRental();
    }
  }

  isCardExist() {
    this.fakeCardService.isCardExist(this.fakeCard).subscribe(
      (response) => {
        this.isCardCorrect = true;
      },
      (responseError) => {
        this.toastrService.error(
          'Kart bilgileri hatalı, kontrol ediniz',
          'Hata'
        );

        this.isCardCorrect = false;
      }
    );
  }

  registeredCard(event: any) {
    if (event.target.checked) {
      this.registeredCardCheck = true;
    } else {
      this.registeredCardCheck = false;
    }
  }
}
