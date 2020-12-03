import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService, Credentials } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  creds: Credentials;
  error: string;

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
    this.creds = {} as Credentials;
  }

  ngOnInit(): void {
    const sess = this.auth.validate;
    if (sess && !!sess.token) {
      this.routeToApp();
    } else {
      this.creds = {} as Credentials;
    }
  }

  async login() {
    this.error = undefined;
    const {success, error} = await this.auth.login(this.creds);
    if (success) {
      this.routeToApp();
    } else {
      this.error = error;
    }
  }


  routeToApp() {
    this.router.navigate(['portal'])
  }

}
