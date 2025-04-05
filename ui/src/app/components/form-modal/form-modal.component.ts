import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'form-modal',
  templateUrl: './form-modal.component.html',
  styleUrl: './form-modal.component.scss'
})
export class FormModalComponent {

  @Input() isShow = false;

  @Input() headerTitle = 'Detalhes';

  @Input() buttonCancelText = 'Fechar';
  @Input() buttonCancelIcon = 'cancel';
  @Output() onCancel = new EventEmitter<string>()

  @Input() buttonConfirmText = 'Confirmar';
  @Input() buttonConfirmIcon = 'check';
  @Output() onConfirm = new EventEmitter<string>()

  onCancelClick() {
    this.onCancel.emit()
  }

  onConfirmClick() {
    this.onConfirm.emit()
  }
}
