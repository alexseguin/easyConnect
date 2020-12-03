import { Component, OnInit } from '@angular/core';
import { AuthService, Profile } from '../login/service/auth.service';
import { Router } from '@angular/router';
import { QuickActionsService, Action } from '../portal/home/quick-actions.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  
  account = 'MASTER CHECKINGS';
  name = 'MASTER CHECKINGS (Account details)';
  
  loading = true;
  profile: Profile;

  _transactions;
  transactions = [
    {
      name: 'Pmt divers',
      origin: 'Hydro',
      amount: 123.12,
      date: '2020-10-10'
    },
    {
      name: 'Pmt facture',
      origin: 'Telus',
      amount: 54.43,
      date: '2020-10-10'
    },
    {
      name: 'Bill of sale',
      origin: 'Leon\'s',
      amount: 432.50,
      date: '2020-10-10'
    },
    {
      name: 'Online purchase',
      origin: 'Blizzard Inc.',
      amount: 20.00,
      date: '2020-10-10'
    },
  ];

  constructor(
    private quick: QuickActionsService,
    private auth: AuthService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this._transactions = JSON.parse(JSON.stringify(this.transactions));
    const { token, profile } = this.auth.validate;
    if(token && profile) {
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
    const action: Action = {name: this.name, link: '/account'};
    if(!this.actionsHaveThis) {
      this.quick.add(action);
    } else {
      this.quick.remove(action);
    }
  }

  get actionsHaveThis() {
    return this.quick.actions.find(q => q.name === this.name); 
  }

  searchTransactions(val) {
    this._transactions = this.transactions.filter(t => JSON.stringify(t).toLowerCase().trim().includes(val.toLowerCase().trim()));
  }

  transferFrom() {
    this.router.navigate(['transfers'])
  }

  sendMoney() {
    this.router.navigate(['etransfers']);
  }

  cashCheque() {
    this.router.navigate(['cheque']);
  }
  
  backToPortal() {
    this.router.navigate(['portal'])
  }
}
