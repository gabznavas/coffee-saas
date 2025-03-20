import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() title: string = ''
  @Input() materialIcon: string = ''

  @Output('click') click = new EventEmitter()

  onClick() {
    this.click.emit()
  }
}
