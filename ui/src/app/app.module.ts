import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { AuthorizationService } from './services/authorization.service';
import { HomeModule } from './home/home.module';
import { HeaderModule } from "./header/header.module";
import { RouterModule } from '@angular/router';
import { StockModule } from './stock/stock.module';
import { LoginService } from './services/login.service';
import { ProductService } from './services/product.service';
import { ProductCategoryService } from './services/product-category.service';
import { TitleService } from './services/title.service';
import { UserComponent } from './user/user.component';
import { RoleService } from './services/role.service';
import { DiningTableModule } from './dining-table/dining-table.module';
import { DiningTableService } from './services/dining-table.service';
import { CommandService } from './services/command.service';
import { DateCustomService } from './services/date-custom.service';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { CurrencyService } from './services/currency.service';

registerLocaleData(localePt, 'pt');

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HeaderModule,
    HomeModule,
    LoginModule,
    StockModule,
    DiningTableModule
  ],
  providers: [TitleService,
    DateCustomService,
    CurrencyService,
    AuthorizationService,
    LoginService,
    ProductService,
    ProductCategoryService,
    RoleService,
    DiningTableService,
    CommandService,
    {
      provide: LOCALE_ID,
      useValue: 'pt'
    }, {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL'
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
