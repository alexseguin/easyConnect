import { Component, OnInit } from '@angular/core';
import { Profile, AuthService } from '../login/service/auth.service';
import { QuickActionsService, Action } from '../portal/home/quick-actions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfers',
  templateUrl: './transfers.component.html',
  styleUrls: ['./transfers.component.scss']
})
export class TransfersComponent implements OnInit {
  
  date: string;
  loading = true;
  profile: Profile;
  name = 'Transfers ...';
  
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
    const action: Action = {name: this.name, link: '/transfers'};
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
