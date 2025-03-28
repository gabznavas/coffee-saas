import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TitleService } from '../services/title.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(
    private titleService: TitleService,
    private router: Router
  ) {
    this.titleService.setTitle("Home");
  }

  goToStock() {
    this.router.navigate(['/stock'])
  }

  goToUsers() {
    this.router.navigate(['/user'])
  }

  goToTables() {
    this.router.navigate(['/table'])
  }
}
