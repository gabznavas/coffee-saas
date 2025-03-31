import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DiningTableService } from '../../services/dining-table.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router,
    private diningTableService: DiningTableService,
  ) { }

  onSubmit(form: NgForm) {
    this.diningTableService.createDiningTable({
      name: form.value.name,
    }).subscribe({
      next: () => {
        this.form.isLoading = false
        this.clearForm(form);
        this.form.messages.info = ['Mesa adicionada.']
        this.form.messages.errors = []
      },
      error: err => {
        this.form.isLoading = false
        if (err instanceof HttpErrorResponse) {
          if (err.error.message && typeof err.error.message === 'string') {
            this.form.messages.errors = [err.error.message]
          } else if (err.error.messages && typeof err.error.messages === 'object') {
            this.form.messages.errors = Object.entries(err.error.messages).map(item => `${item[0]}: ${item[1]}`)
          }
        } else {
          this.form.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
        }
      }
    })
  }

  goToDiningTableList() {
    this.router.navigate(["/dining-table"])
  }


  private clearForm(form?: NgForm) {
    form?.reset({
      id: 0,
      name: '',
    })
  }
}
