import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule } from '@angular/forms';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-route.module';
import { ComponentsModule } from '../components/components.module';
import { SecurityComponent } from './security/security.component';


@NgModule({
  declarations: [
    ProfileComponent,
    SettingsComponent,
    SecurityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SettingsRoutingModule,
    ComponentsModule,
  ]
})
export class SettingsModule { }
