import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu/menu.component';
import { PaperComponent } from './paper/paper.component';

@NgModule({
  declarations: [
    MenuItemComponent,
    MenuComponent,
    PaperComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MenuItemComponent,
    MenuComponent,
    PaperComponent,
  ]
})
export class ComponentsModule { }
