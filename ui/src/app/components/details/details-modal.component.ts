import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'details-modal',
  templateUrl: './details-modal.component.html',
  styleUrl: './details-modal.component.scss'
})
export class DetailsModalComponent {

  @Input() isShow = false;

  @Input() headerTitle = 'Detalhes';

  @Input() buttonCloseText = 'Fechar';
  @Output() onClose = new EventEmitter<string>()

  onCloseClick() {
    this.onClose.emit()
  }
}
