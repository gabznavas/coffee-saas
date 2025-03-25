import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'paper',
  templateUrl: './paper.component.html',
  styleUrl: './paper.component.scss',
})
export class PaperComponent {


  @Input() leftTitle: string = ''
  @Input() leftMaterialIcon: string = ''
  @Output() headerLeftClick = new EventEmitter()

  @Input() centerTitle: string = ''
  @Input() centerMaterialIcon: string = ''

  headerLeftOnClick() {
    this.headerLeftClick.emit()
  }

  paperHeaderIsCenter() {
    const hasCenterThink = !!this.centerTitle || !!this.centerMaterialIcon
    const hasLeftThink = !!this.leftTitle || !!this.leftMaterialIcon

    if (hasCenterThink && !hasLeftThink) {
      return 'center'
    }
    else if (!hasCenterThink && hasLeftThink) {
      return 'center'
    }
    return 'space-between'
  }
}
