import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private autService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private localStorage: LocalStorageService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.autService.loginModel(loginModel).subscribe(
        (response) => {
          this.toastrService.info('Giriş Yapıldı', 'Başarılı');
          this.localStorage.saveToken(response.data.token);
          this.localStorage.saveEmail(this.loginForm.value.email);

          // this.localStorage.saveUserId(response.data.userId.toString());
          this.router.navigate(['cars']);
        },
        (responseError) => {
          console.log(responseError);
          this.toastrService.error(responseError.error);
        }
      );
    } else {
      this.toastrService.error('Form bilgileriniz eksik', 'Hata');
    }
  }
}
