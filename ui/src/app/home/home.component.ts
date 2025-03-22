import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router) {

  }

  goToStock() {
    this.router.navigate(['/stock'])
  }

  goToEmployers() { }

  goToTables() { }
}
