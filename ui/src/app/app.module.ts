import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { AuthorizationService } from './services/authorization.service';
import { HomeModule } from './home/home.module';
import { HeaderModule } from "./header/header.module";
import { RouterModule } from '@angular/router';
import { StockModule } from './stock/stock.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HeaderModule,
    HomeModule,
    LoginModule,
    StockModule
  ],
  providers: [AuthorizationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
