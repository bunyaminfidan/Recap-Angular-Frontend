import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  users: User;
  isLogin: boolean;
  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    if (!this.users) {
      this.getUser();
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
  }

  getUser() {
    let email = this.localStorage.getEmail();
    this.userService.getUserByEmail(email).subscribe((response) => {
      this.localStorage.saveUserId(response.data.id.toString());
      this.users = response.data;
    });
  }
}
