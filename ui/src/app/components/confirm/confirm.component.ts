import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.scss'
})
export class ConfirmComponent {

  @Input() isShow = false;
  @Input() title = 'Confirmação';
  @Input() description = 'Tem certeza que deseja continuar?';
  @Input() confirmTitle = 'Confirmar';
  @Input() cancelTitle = 'Cancelar';

  @Output() onConfirm = new EventEmitter<string>()
  @Output() onCancel = new EventEmitter<string>()

  onConfirmClick() {
    this.onConfirm.emit()
  }

  onCancelClick() {
    this.isShow = !this.isShow
    this.onCancel.emit()
  }
}
