import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDetail } from 'src/app/models/carDetail';
import { Customer } from 'src/app/models/customer';
import { CustomerDetail } from 'src/app/models/customerDetail';
import { FakeCard } from 'src/app/models/fakeCard';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FakeCardService } from 'src/app/services/fake-card.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  rental: Rental;
  carDetails: CarDetail;
  customeDetails: CustomerDetail;
  getCustomerId: number;
  amountOfPayment: number = 0;
  nameOnTheCard: string;
  cardNumber: string;
  cardCvv: string;
  expirationDate: string;
  fakeCard: FakeCard;
  cardExist: Boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private carService: CarService,
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private fakeCardService: FakeCardService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId;
        this.getCustomerDetailById(this.getCustomerId);
        this.getCarDetail();
      }
    });
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
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Araç listesine yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
    }
  }

  async rentACar() {
    let fakeCard: FakeCard = {
      nameOnTheCard: this.nameOnTheCard,
      number: this.cardNumber,
      expirationDate: this.expirationDate,
      cvv: this.cardCvv,
    };
    this.cardExist = await this.isCardExist(fakeCard);
    console.log(this.cardExist);
    if (this.cardExist) {
      this.fakeCard = await this.getFakeCardByCardNumber(this.cardNumber);
      if (this.fakeCard.moneyInTheCard >= this.amountOfPayment) {
        this.fakeCard.moneyInTheCard =
          this.fakeCard.moneyInTheCard - this.amountOfPayment;
        this.updateCard(fakeCard);

        this.rentalService.addRental(this.rental).subscribe((response) => {
          if (response.success) {
            this.toastrService.success(response.message, 'Işlem başarılı');
          } else {
            this.toastrService.error('Kiralama işlemi hatalı', 'Hata');
          }
        });
      } else {
        this.toastrService.error(
          'Kartınızda yeterli para bulunmamaktadır',
          'Hata'
        );
      }
    } else {
      this.toastrService.error('Bankanız bilgilerinizi onaylamadı', 'Hata');
    }
  }

  async isCardExist(fakeCard: FakeCard) {
    return (await this.fakeCardService.isCardExist(fakeCard).toPromise())
      .success;
  }

  async getFakeCardByCardNumber(cardNumber: string) {
    return (await this.fakeCardService.getCardByNumber(cardNumber).toPromise())
      .data[0];
  }

  updateCard(fakeCard: FakeCard) {
    this.fakeCardService.updateCard(fakeCard);
  }
}
