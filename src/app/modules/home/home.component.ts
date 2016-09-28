import { Component, OnInit } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
}                           from '@angular/router';

import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {
    if (localStorage.getItem('auth_token') != null)
        this.router.navigate(['/home']);
    else
    {
        this.loginService.Logout();
    }
  }

  ngOnInit() {
  }

}
