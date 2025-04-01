import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Command } from '../../types/command.type';
import { DiningTable } from '../../types/dining-table.type';
import { PaginatedResponse } from '../../types/paginated-response.type';
import { CommandService } from '../../services/command.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommandState } from '../../types/command-state.type';
import { FindAllCommandsFiltersComponent } from './types';
import { DateCustomService } from '../../services/date-custom.service';

@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrl: './command-list.component.scss'
})
export class CommandListComponent implements OnInit {

  list = {
    messages: {
      info: [] as string[],
      errors: [] as string[],
    },
    isLoading: false,

    dinnerTables: [] as DiningTable[],
    states: [{
      key: 'OPENED' as CommandState,
      value: 'Abertas'
    }, {
      key: 'CLOSE' as CommandState,
      value: 'Fechadas'
    }],

    data: {} as PaginatedResponse<Command>,

    filters: {
      searchInput: '',
      state: "OPENED",
      minDate: '',
      maxDate: '',
      page: 0,
      size: 5,
      sortBy: 'clientName',
      orderBy: 'asc'
    } as FindAllCommandsFiltersComponent,
  }

  constructor(
    private router: Router,
    private commandService: CommandService,
    private dateCustomService: DateCustomService,
  ) { }

  ngOnInit(): void {
    this.configureFilters()
    this.findAllCommandsInitital()
  }


  findAllCommandsInitital() {
    this.list.isLoading = true
    this.commandService.findAllCommands({
      searchInput: this.list.filters.searchInput,
      minDate: this.list.filters.minDate,
      maxDate: this.list.filters.maxDate,
      state: this.list.filters.state,
      page: this.list.filters.page,
      size: this.list.filters.size,
      sortBy: this.list.filters.sortBy,
      orderBy: this.list.filters.orderBy,
    }).subscribe({
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


  findAllCommandsGoPage(pageIndex: number) {
    this.list.isLoading = true
    this.commandService.findAllCommands({
      searchInput: this.list.filters.searchInput,
      minDate: this.list.filters.minDate,
      maxDate: this.list.filters.maxDate,
      state: this.list.filters.state,
      page: pageIndex,
      size: this.list.filters.size,
      sortBy: this.list.filters.sortBy,
      orderBy: this.list.filters.orderBy,
    }).subscribe({
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

  showPages(): boolean {
    return this.list.data.totalPages > 1
  }

  getPageCountItems(): number[] {
    return new Array(this.list.data.totalPages).fill('').map((_, index) => index)
  }


  isActualPage(pageIndex: number): boolean {
    return this.list.data.page === pageIndex
  }


  goPage(pageIndex: number) {
    this.findAllCommandsGoPage(pageIndex)
  }

  nextPage() {
    this.findAllCommandsGoPage(this.list.filters.page + 1)
  }

  previousPage() {
    this.findAllCommandsGoPage(this.list.filters.page - 1)
  }

  private configureFilters() {
    const yesterDay = new Date(this.dateCustomService.getUTCDateString())
    const twoDays = 2
    yesterDay.setDate(yesterDay.getDate() - twoDays)
    this.list.filters.minDate = yesterDay.toISOString()
    this.list.filters.minDate = this.dateCustomService.removeMilliseconds(this.list.filters.minDate)

    this.list.filters.maxDate = this.dateCustomService.getUTCDateString()
    this.list.filters.maxDate = this.dateCustomService.removeMilliseconds(this.list.filters.maxDate)

    console.log(this.list.filters.maxDate);
  }
}
