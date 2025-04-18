import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DiningTable } from '../../types/dining-table.type';
import { Router } from '@angular/router';
import { DiningTableService } from '../../services/dining-table.service';
import { CommandService } from '../../services/command.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Command } from '../../types/command.type';
import { Location } from '@angular/common';

@Component({
  selector: 'command-form',
  templateUrl: './command-form.component.html',
  styleUrl: './command-form.component.scss'
})
export class CommandFormComponent implements OnInit {
  form = {
    data: {
      id: '0',
      clientName: '',
      diningTableId: 0,
      attendentId: 0,
    },
    isUpdate: false,
    isLoading: false,

    diningTables: [] as DiningTable[],

    messages: {
      errors: [] as string[],
      info: [] as string[],
    },
  }

  constructor(
    private location: Location,
    private userService: UserService,
    private diningTableService: DiningTableService,
    private commandService: CommandService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.findAllDiningTable();
    this.setLoggedUserId()
  }

  protected setLoggedUserId() {
    const userLogged = this.userService.getUserLocalStorage()
    if (!userLogged) {
      return
    }
    this.form.data.attendentId = userLogged.id
  }

  protected onSubmit(form: NgForm) {
    this.commandService.createCommand({
      clientName: this.form.data.clientName,
      attendentId: this.form.data.attendentId,
      diningTableId: this.form.data.diningTableId,
    })
      .subscribe({
        next: command => {
          // mostrar um modal com os dados da comanda
          this.form.isLoading = false
          this.clearForm(form);
          this.form.messages.errors = []
          this.router.navigate([`/command/${command.id}/products`])
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

  protected goBack() {
    this.location.back()
  }

  protected isFormValid(f: NgForm): boolean {
    return !!f.valid
      && this.form.data.clientName.length < 45
      && !this.form.isLoading
  }

  private findDinigTableById(diningTableId: number) {
    return this.form.diningTables.find(dt => dt.id === diningTableId)
  }

  private findAllDiningTable() {
    this.diningTableService.findAllDiningTablesByBusy(false)
      .subscribe({
        next: diningTablesNotBusy => {
          this.form.diningTables = diningTablesNotBusy;
          this.form.data.diningTableId = diningTablesNotBusy[0].id;
        },
        error: err => {
          console.log(err);

        }
      });
  }

  private clearForm(form?: NgForm) {
    form?.reset({
      clientName: '',
      diningTableId: this.form.diningTables[0].id,
    })
  }
}
