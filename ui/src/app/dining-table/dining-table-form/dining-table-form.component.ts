import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dining-table-form',
  templateUrl: './dining-table-form.component.html',
  styleUrl: './dining-table-form.component.scss'
})
export class DiningTableFormComponent {
  form = {
    data: {
      id: 0,
      name: '',
    },
    isUpdate: false,
    isLoading: false,
    messages: {
      errors: [] as string[],
      info: [] as string[],
    }
  }

  onSubmit(form: NgForm) {
    alert(JSON.stringify(form.value))
  }

  goToDiningTableList() {
    throw new Error('Method not implemented.');
  }
}
