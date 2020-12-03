import { Component, OnInit } from '@angular/core';
import { Profile, AuthService } from '../login/service/auth.service';
import { QuickActionsService, Action } from '../portal/home/quick-actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cheque',
  templateUrl: './cheque.component.html',
  styleUrls: ['./cheque.component.scss']
})
export class ChequeComponent implements OnInit {
  
  loading = true;
  profile: Profile;
  name = 'Cheque Deposit';
  
  constructor(
    private quick: QuickActionsService,
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

  routeToAuth() {
    this.router.navigate(['auth']);
  }

  addToActions() {
    const action: Action = {name: this.name, link: '/cheque'};
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
