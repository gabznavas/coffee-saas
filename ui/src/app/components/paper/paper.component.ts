import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'paper',
  templateUrl: './paper.component.html',
  styleUrl: './paper.component.scss',
})
export class PaperComponent {
  @Input() title: string = '';
  @Input() materialIconsTitle: string = '';
}
