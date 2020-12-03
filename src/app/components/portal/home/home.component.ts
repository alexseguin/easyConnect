import { Component, OnInit } from '@angular/core';
import { validate } from 'json-schema';
import { Router } from '@angular/router';
import { AuthService, Profile } from '../../login/service/auth.service';
import { QuickActionsService } from './quick-actions.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profile: Profile;
  loading = true;

  constructor(
    public quick: QuickActionsService,
    private auth: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    const { token, profile } = this.auth.validate;
    if(token && profile) {
      this.profile = profile;
    } else {
      this.routeToAuth();
    }
    this.loading = false;
  }

  routeToPersonalInfo() {
    this.router.navigate(['personal']);
  }

  routeToPayees() {
    this.router.navigate(['payees']);
  }

  routeToBills() {
    this.router.navigate(['bills']);
  }

  routeToTransfers() {
    this.router.navigate(['transfers']);
  }

  routeToETransfers() {
    this.router.navigate(['etransfers']);
  }

  routeToCheque() {
    this.router.navigate(['cheque']);
  }

  routeToAcctDets() {
    this.router.navigate(['account']);
  }

  signOut(): void {
    this.auth.session = undefined;
    this.routeToAuth();
  }

  routeToAuth() {
    this.router.navigate(['auth']);
  }
}
