import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu/menu.component';
import { PaperComponent } from './paper/paper.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DetailsModalComponent } from './details/details-modal.component';

@NgModule({
  declarations: [
    MenuItemComponent,
    MenuComponent,
    PaperComponent,
    ConfirmComponent,
    DetailsModalComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    MenuItemComponent,
    MenuComponent,
    PaperComponent,
    ConfirmComponent,
    DetailsModalComponent,
  ]
})
export class ComponentsModule { }
