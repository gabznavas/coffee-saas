import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-right',
  templateUrl: './menu-right.component.html',
  styleUrl: './menu-right.component.scss'
})
export class MenuRightComponent {

  showMenuItems = false

  imageProfileUrl = "https://avatars.githubusercontent.com/u/24739714?v=4"

  employee = {
    name: 'Gabriel Navas'
  }

  constructor(
    private router: Router
  ) { }

  toggleShowMenuItems(): void {
    this.showMenuItems = !this.showMenuItems
  }

  goToSettings() {
    this.toggleShowMenuItems();
    this.router.navigate(['/settings'])
  }
}
