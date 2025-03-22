import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    MenuItemComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MenuItemComponent,
    MenuComponent,
  ]
})
export class ComponentsModule { }
