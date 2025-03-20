import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { MenuRightComponent } from './menu-right/menu-right.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    HeaderComponent,
    MenuRightComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule,
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
