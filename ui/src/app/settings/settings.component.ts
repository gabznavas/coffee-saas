import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {


  constructor(
    private router: Router
  ) { }

  goToProfile() {
    this.router.navigate(['/settings'])
  }
  goToSecurity() {
    this.router.navigate(['/settings/security'])
  }
}
