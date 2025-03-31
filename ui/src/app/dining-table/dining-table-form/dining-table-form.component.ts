import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DiningTableService } from '../../services/dining-table.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dining-table-form',
  templateUrl: './dining-table-form.component.html',
  styleUrl: './dining-table-form.component.scss'
})
export class DiningTableFormComponent implements OnInit {
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
    private route: ActivatedRoute,
    private diningTableService: DiningTableService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        const diningTableId = params["diningTableId"]
        if (!diningTableId) {
          return
        }
        this.diningTableService.findDiningTableById(Number(diningTableId))
          .subscribe({
            next: (diningTable) => {
              this.form.isLoading = false
              this.form.isUpdate = true
              this.form.data.id = diningTable.id
              this.form.data.name = diningTable.name
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
    )
  }

  protected onSubmit(form: NgForm) {
    if (this.form.isUpdate) {
      this.onSubmitUpdateTable(form)
    } else {
      this.onSubmitCreateTable(form)
    }
  }

  protected goToDiningTableList() {
    this.router.navigate(["/dining-table"])
  }

  private onSubmitCreateTable(form: NgForm) {
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

  private onSubmitUpdateTable(form: NgForm) {
    this.diningTableService.updateDiningTable(
      this.form.data.id, {
      name: form.value.name,
    }).subscribe({
      next: () => {
        this.form.isLoading = false
        this.router.navigate(["/dining-table"])
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

  private clearForm(form?: NgForm) {
    form?.reset({
      id: 0,
      name: '',
    })
  }
}
