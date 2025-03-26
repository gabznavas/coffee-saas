import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserRoutingModule } from './user-route.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ComponentsModule
  ]
})
export class UserModule { }
