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
import { LoginService } from './services/login.service';
import { ProductService } from './services/product.service';
import { ProductCategoryService } from './services/product-category.service';
import { TitleService } from './services/title.service';
import { UserComponent } from './user/user.component';
import { RoleService } from './services/role.service';
import { TableModule } from './table/table.module';

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
    TableModule,
  ],
  providers: [TitleService, AuthorizationService, LoginService, ProductService, ProductCategoryService, RoleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
