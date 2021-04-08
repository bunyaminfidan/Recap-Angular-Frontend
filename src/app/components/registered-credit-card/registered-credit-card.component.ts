import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RegisteredCreditCard } from 'src/app/models/registeredCreditCard';
import { AuthService } from 'src/app/services/auth.service';
import { RegisteredCreditCardService } from 'src/app/services/registered-credit-card.service';

@Component({
  selector: 'app-registered-credit-card',
  templateUrl: './registered-credit-card.component.html',
  styleUrls: ['./registered-credit-card.component.css'],
})
export class RegisteredCreditCardComponent implements OnInit {
  registeredCreditCards: RegisteredCreditCard[] = [];

  @Output() cardSend: EventEmitter<RegisteredCreditCard> = new EventEmitter();

  constructor(
    private toastrService: ToastrService,
    private registeredCreditCardService: RegisteredCreditCardService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getAll();
    this.getByUserId();
  }

  getAll() {
    this.registeredCreditCardService.getAll().subscribe((response) => {
      this.registeredCreditCards = response.data;
    });
  }

  getByUserId() {
    this.registeredCreditCardService
      .getByUserId(this.authService.getUserId())
      .subscribe((response) => {
        this.registeredCreditCards = response.data;
      });
  }

  currentCreditCard(card: RegisteredCreditCard) {
    return this.cardSend.emit(card);
  }
}
