import { Component, OnInit } from '@angular/core';
import { QuickActionsService, Action } from '../portal/home/quick-actions.service';
import { AuthService, Profile } from '../login/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etransfer',
  templateUrl: './etransfer.component.html',
  styleUrls: ['./etransfer.component.scss']
})
export class EtransferComponent implements OnInit {

  loading = true;
  profile: Profile;
  date: string;
  name = "Email Transfers";

  constructor(
    private quick: QuickActionsService,
    private auth: AuthService,
    private router: Router,
  ) {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    this.date = yyyy + '-' + mm + '-' + dd;
  }

  ngOnInit(): void {
    const { token, profile } = this.auth.validate;
    if (token && profile) {
      this.profile = profile;
    } else {
      this.routeToAuth();
    }
    this.loading = false;
  }

  routeToAuth() {
    this.router.navigate(['auth']);
  }

  addToActions() {
    const action: Action = {name: this.name, link: '/etransfers'};
    if(!this.actionsHaveThis) {
      this.quick.add(action);
    } else {
      this.quick.remove(action);
    }
  }

  get actionsHaveThis() {
    return this.quick.actions.find(q => q.name === this.name); 
  }
  
  backToPortal() {
    this.router.navigate(['portal'])
  }
}
