import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  user: User;
  currentUserId: number;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUserId = this.authService.getUserId();
    if (this.currentUserId) {
      this.getUserDetail();
    }
  }

  getUserDetail() {
    this.userService.getUserById(this.currentUserId).subscribe((response) => {
      this.user = response.data;
    });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
  logOut() {
    this.localStorageService.clean();
    this.router.navigate(['']);
  }
}
