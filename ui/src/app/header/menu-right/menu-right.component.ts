import { Component } from '@angular/core';

@Component({
  selector: 'menu-right',
  templateUrl: './menu-right.component.html',
  styleUrl: './menu-right.component.scss'
})
export class MenuRightComponent {
  imageProfileUrl = "https://avatars.githubusercontent.com/u/24739714?v=4"

  employee = {
    name: 'Gabriel Navas'
  }
}
