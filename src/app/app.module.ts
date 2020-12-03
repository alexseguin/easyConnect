import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashComponent } from './components/splash/splash/splash.component';
import { LoginComponent } from './components/login/component/login.component';
import { HomeComponent } from './components/portal/home/home.component';
import { AccountDetailsComponent } from './components/account-details/account-details.component';
import { TransfersComponent } from './components/transfers/transfers.component';
import { ChequeComponent } from './components/cheque/cheque.component';
import { EtransferComponent } from './components/etransfer/etransfer.component';

@NgModule({
  declarations: [
    AppComponent,
    SplashComponent,
    LoginComponent,
    HomeComponent,
    AccountDetailsComponent,
    TransfersComponent,
    ChequeComponent,
    EtransferComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
