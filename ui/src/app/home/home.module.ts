import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CommandsModule } from '../commands/commands.module';
import { HomeRoutingModule } from './home-routing.module';
import { MenuLeftComponent } from './menu-left/menu-left.component';
import { MenuCenterComponent } from './menu-center/menu-center.component';



@NgModule({
  declarations: [
    HomeComponent,
    MenuLeftComponent,
    MenuCenterComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommandsModule,
  ]
})
export class HomeModule { }
