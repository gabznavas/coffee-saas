import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CommandsModule } from '../commands/commands.module';
import { HomeRoutingModule } from './home-routing.module';
import { MenuCenterComponent } from './menu-center/menu-center.component';
import { ComponentsModule } from "../components/components.module";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HomeComponent,
    MenuCenterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    CommandsModule,
    ComponentsModule
  ]
})
export class HomeModule { }
