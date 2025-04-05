import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Command } from '../../types/command.type';
import { DiningTable } from '../../types/dining-table.type';
import { PaginatedResponse } from '../../types/paginated-response.type';
import { CommandService } from '../../services/command.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommandState } from '../../types/command-state.type';
import { FindAllCommandsFiltersComponent } from './types';
import { CurrencyService } from '../../services/currency.service';

import { format, subDays } from "date-fns";

@Component({
  selector: 'app-command-list',
  templateUrl: './command-list.component.html',
  styleUrl: './command-list.component.scss'
})
export class CommandListComponent implements OnInit {


  protected list = {
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
    }, {
      key: 'CANCELED' as CommandState,
      value: 'Canceladas'
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
    private currencyService: CurrencyService
  ) { }

  ngOnInit(): void {
    this.configureFilters()
    this.findAllCommandsInitital()
  }

  goToPaymentCommand(commandId: number) {
    this.router.navigate([`command/${commandId}/form`])
  }

  goToAddProductToCommand(commandId: number) {
    this.router.navigate([`/command/${commandId}/products`])
  }

  formatCurrency(value: number | null): string {
    return this.currencyService.formatCurrencyToPtBr(value);
  }

  updatePrice(event: Event, field: 'minPrice' | 'maxPrice') {
    const input = event.target as HTMLInputElement;
    let rawValue = input.value.replace(/\D/g, ''); // Remove tudo que não for número

    if (!rawValue) {
      this.list.filters[field] = 0;
      return;
    }

    // Adiciona duas casas decimais automaticamente
    // 0.002 para 0.02
    let numericValue = parseFloat(rawValue) / 100;
    this.list.filters[field] = numericValue;

    // Atualiza visualmente sem perder a posição do cursor
    // ✅ Aguarda o processamento antes de atualizar o input
    setTimeout(() => {
      // Mantém o cursor no final
      // usado pra selecionar o texto
      input.setSelectionRange(input.value.length, input.value.length);
    });
  }

  protected findAllCommandsInitital() {
    this.list.isLoading = true
    this.commandService.findAllCommands({
      searchInput: this.list.filters.searchInput,
      minDate: this.list.filters.minDate,
      maxDate: this.list.filters.maxDate,
      minPrice: this.list.filters.minPrice,
      maxPrice: this.list.filters.maxPrice,
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

  protected findAllCommandsGoPage(pageIndex: number) {
    this.list.isLoading = true
    this.commandService.findAllCommands({
      searchInput: this.list.filters.searchInput,
      minDate: this.list.filters.minDate,
      maxDate: this.list.filters.maxDate,
      minPrice: this.list.filters.minPrice,
      maxPrice: this.list.filters.maxPrice,
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

  protected goToHome() {
    this.router.navigate([""])
  }

  protected goToCommandForm() {
    this.router.navigate(["/command", "form"])
  }

  protected goToCloseCommand(arg0: number) {
    throw new Error('Method not implemented.');
  }

  protected showPages(): boolean {
    return this.list.data.totalPages > 1
  }

  protected getPageCountItems(): number[] {
    return new Array(this.list.data.totalPages).fill('').map((_, index) => index)
  }

  protected isActualPage(pageIndex: number): boolean {
    return this.list.data.page === pageIndex
  }

  protected goPage(pageIndex: number) {
    this.findAllCommandsGoPage(pageIndex)
  }

  protected nextPage() {
    this.findAllCommandsGoPage(this.list.filters.page + 1)
  }

  protected previousPage() {
    this.findAllCommandsGoPage(this.list.filters.page - 1)
  }

  private configureFilters() {
    const formatDate = "yyyy-MM-dd'T'HH:mm"
    const now: Date = new Date()

    const twoDaysAgo: string = format(subDays(now, 2), formatDate);
    this.list.filters.minDate = twoDaysAgo

    const nowStr: string = format(now, formatDate);
    this.list.filters.maxDate = nowStr

    this.list.filters.minPrice = 0.00
    this.list.filters.maxPrice = 10_000
  }
}
