import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SplashComponent } from './components/splash/splash/splash.component';
import { LoginComponent } from './components/login/component/login.component';
import { HomeComponent } from './components/portal/home/home.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { EtransferComponent } from './components/etransfer/etransfer.component';
import { ChequeComponent } from './components/cheque/cheque.component';

const routes: Routes = [
  { path: '', component: SplashComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'portal', component: HomeComponent },
  { path: 'transfers', component: TransfersComponent },
  { path: 'account', component: AccountDetailsComponent },
  { path: 'etransfers', component: EtransferComponent },
  { path: 'cheque', component: ChequeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
