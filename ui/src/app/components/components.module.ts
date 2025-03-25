import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu/menu.component';
import { PaperComponent } from './paper/paper.component';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  declarations: [
    MenuItemComponent,
    MenuComponent,
    PaperComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MenuItemComponent,
    MenuComponent,
    PaperComponent,
    ConfirmComponent,
  ]
})
export class ComponentsModule { }
