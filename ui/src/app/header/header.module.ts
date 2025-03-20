import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuRightComponent } from './menu-right/menu-right.component';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuRightComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
