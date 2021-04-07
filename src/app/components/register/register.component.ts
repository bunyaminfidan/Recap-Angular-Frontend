import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.createRegister();
  }

  createRegister() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      let registerModel = Object.assign({}, this.registerForm.value);

      this.authService.registerModel(registerModel).subscribe(
        (response) => {
          this.toastrService.success('Tebrikler, kayıt oldunuz', 'Başarılı');
          this.localStorageService.saveToken(response.data.token);
       //   this.localStorageService.saveEmail(this.registerForm.value.email);
          this.router.navigate(['dashboard/cars']);
        },
        (responseError) => {
          this.toastrService.error(responseError.error, 'Hata');
        }
      );
    } else {
      this.toastrService.error('Form eksik kontrol ediniz', 'Hata');
    }
  }
}
