import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CommandsModule } from '../commands/commands.module';
import { OptionsComponent } from './options/options.component';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    OptionsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CommandsModule,
  ]
})
export class HomeModule { }
