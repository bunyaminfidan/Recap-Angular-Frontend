import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: User;
  currentCustomer: Customer;
  currentUserId: number;

  userForm: FormGroup;
  customerForm: FormGroup;

  constructor(
    private toastrService: ToastrService,
    private autService: AuthService,
    private userService: UserService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.autService.getUserId();
    this.getUserDetail();
    this.getCustomer();
    this.createUserForm();
    this.createCustomerForm();
  }

  getUserDetail() {
    if (this.currentUserId) {
      this.userService.getUserById(this.currentUserId).subscribe((response) => {
        this.user = response.data;
        this.userForm.patchValue(this.user);
        console.log('getUserDetail ' + this.user.findeksScore);
      });
    }
  }

  getCustomer() {
    this.customerService
      .getCustomerByUserId(this.currentUserId)
      .subscribe((response) => {
        this.currentCustomer = response.data;

        this.customerForm.patchValue(this.currentCustomer);
      });
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      findeksScore: ['', Validators.required],
    });
  }

  createCustomerForm() {
    this.customerForm = this.formBuilder.group({
      companyName: ['', Validators.required],
    });
  }

  userUpdate() {
    if (this.userForm.valid) {
      let newUser = Object.assign({}, this.userForm.value);
      newUser.id = this.currentUserId;

      console.log(newUser);

      this.userService.update(newUser).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    }
  }

  customerUpdate() {
    if (this.customerForm.valid) {
      let newCustomer = Object.assign(
        { id: this.currentCustomer.id, userId: this.currentCustomer.userId },
        this.customerForm.value
      );
      this.customerService.update(newCustomer).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error.message);
        }
      );
    }
  }

  findeksScorePercentageRate() {
    if (this.user?.findeksScore > 0) {
      let findeksFullScore = 1900;

      var result = this.user.findeksScore / findeksFullScore;
      var userFindeksPercentageRate = result * 100;

      return 'width: ' + userFindeksPercentageRate + '%';
    }
    return 'width: 0%';
  }
}
