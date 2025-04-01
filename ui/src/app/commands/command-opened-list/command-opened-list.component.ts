import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Command } from '../../types/command.type';
import { DiningTable } from '../../types/dining-table.type';
import { PaginatedResponse } from '../../types/paginated-response.type';
import { CommandService } from '../../services/command.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DiningTableService } from '../../services/dining-table.service';

@Component({
  selector: 'command-opened-list',
  templateUrl: './command-opened-list.component.html',
  styleUrl: './command-opened-list.component.scss'
})
export class CommandOpenedListComponent implements OnInit {

  list = {
    data: {} as PaginatedResponse<Command>,
    searchInput: '',
    messages: {
      info: [] as string[],
      errors: [] as string[],
    },
    isLoading: false,

    dinnerTables: [] as DiningTable[]
  }

  constructor(
    private router: Router,
    private commandService: CommandService,
    private diningTableService: DiningTableService
  ) { }

  ngOnInit(): void {
    this.findAllCommandsOpened()
  }


  findAllCommandsOpened(query: string = '', page = 0, size = 5) {
    this.list.isLoading = true
    this.commandService.findAllOpenedCommands(query, page, size)
      .subscribe({
        next: users => {
          this.list.isLoading = false
          this.list.data = users;
          if (this.list.data.content.length === 0) {
            this.list.messages.info = ['Nenhuma comanda listada.']
          } else {
            this.list.messages.info = []
          }

        },
        error: err => {
          this.list.isLoading = false
          if (err instanceof HttpErrorResponse) {
            if (err.error?.message) {
              this.list.messages.errors.push(err.error.message)
            } else if (err.error?.messages) {
              this.list.messages.errors.concat(err.error.messages)
            } else {
              this.list.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
            }
          } else {
            this.list.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
          }
        }
      })
  }


  goToHome() {
    this.router.navigate([""])
  }

  goToCommandForm() {
    this.router.navigate(["/command", "form"])
  }

  goToCloseCommand(arg0: number) {
    throw new Error('Method not implemented.');
  }

  searchByInputQuery() {
    this.findAllCommandsOpened(this.list.searchInput)
  }

  findAllCommands() {
    throw new Error('Method not implemented.');
  }

  showPages(): boolean {
    return this.list.data.totalPages > 1
  }

  getPageCountItems(): number[] {
    return new Array(this.list.data.totalPages).fill('').map((_, index) => index)
  }


  goPage(pageIndex: number) {
    this.findAllCommandsOpened(this.list.searchInput, pageIndex)
  }

  isActualPage(pageIndex: number): boolean {
    return this.list.data.page === pageIndex
  }

  nextPage() {
    this.findAllCommandsOpened(this.list.searchInput, this.list.data.page + 1)
  }

  previousPage() {
    this.findAllCommandsOpened(this.list.searchInput, this.list.data.page - 1)
  }
}
