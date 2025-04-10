import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Command } from '../../types/command.type';
import { CommandService } from '../../services/command.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { CommandItemService } from '../../services/command-item.service';
import { CommandItem } from '../../types/command-item.type';
import { PaginatedResponse } from '../../types/paginated-response.type';
import { PaymentMethodService } from '../../services/payment-method.service';
import { PaymentMethod } from '../../types/payment-method.type';
import { PaymentService } from '../../services/payment.service';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.type';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss'
})
export class PaymentFormComponent implements OnInit, OnDestroy {


  commandData = {
    data: {} as Command,
    messages: {
      errors: [] as string[],
      info: [] as string[],
    },
    isLoading: false,
  }

  paymentMethods = {
    data: [] as PaymentMethod[],
    paymentMethodSelectedId: '0',
    messages: {
      errors: [] as string[],
      info: [] as string[],
    },
    isLoading: false,
  }

  commandItemData = {
    data: {
      content: [],
      page: 0,
      size: 5,
      totalElements: 0,
      totalPages: 0
    } as PaginatedResponse<CommandItem>,
    searchInput: '',
    isLoading: false,
    messages: {
      errors: [] as string[],
      info: [] as string[],
    }
  }

  findCommandByIdSubscribe!: Subscription
  findAllCommandItemsByCommandSubscribe!: Subscription

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commandService: CommandService,
    private commandItemService: CommandItemService,
    private paymentMethodService: PaymentMethodService,
    private paymentService: PaymentService,
    private userService: UserService
  ) {
  }

  ngOnDestroy(): void {
    this.findCommandByIdSubscribe.unsubscribe()
  }

  ngOnInit(): void {
    this.findCommandById()
    this.findAllPaymentMethod()
  }


  goToCommandsList() {
    this.router.navigate([`/command/list`])
  }

  onSubmit(form: NgForm) {
    const user: User | null = this.userService.getUserLocalStorage()
    if (user === null) {
      this.commandData.messages.errors = ['Aconteceu algo. Tente novamente mais tarde.']
      return
    }

    if (Number(this.paymentMethods.paymentMethodSelectedId) <= 0) {
      this.paymentMethods.messages.errors = ['Selecione um método de pagamento.']
      return
    }
    debugger
    this.paymentService.createPayment({
      cashierId: user.id,
      commandId: this.commandData.data.id,
      paymentMethodId: Number(this.paymentMethods.paymentMethodSelectedId)
    }).subscribe({
      next: () => {
        this.paymentMethods.isLoading = false
        this.router.navigate(["/command/list"])
      },
      error: err => {
        this.paymentMethods.isLoading = false
        if (err instanceof HttpErrorResponse && typeof err.error === 'object') {
          if (err.error.message && typeof err.error.message === 'string') {
            this.paymentMethods.messages.errors = [err.error.message]
          } else if (err.error.messages && typeof err.error.messages === 'object') {
            this.paymentMethods.messages.errors = Object.entries(err.error.messages).map(item => `${item[0]}: ${item[1]}`)
          }
        } else {
          this.paymentMethods.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
        }
      }
    })
  }

  showPages() {
    return this.commandItemData.data.page > 1
  }

  previousPage() {
    this.findCommandItemsByCommandId(this.commandData.data.id, this.commandItemData.searchInput, this.commandItemData.data.page - 1, this.commandItemData.data.size)
  }

  nextPage() {
    this.findCommandItemsByCommandId(this.commandData.data.id, this.commandItemData.searchInput, this.commandItemData.data.page + 1, this.commandItemData.data.size)
  }

  goPage(page: number) {
    this.findCommandItemsByCommandId(this.commandData.data.id, this.commandItemData.searchInput, page, this.commandItemData.data.size)
  }

  getPageCountItems() {
    return new Array(this.commandItemData.data.totalPages).map((_, index) => index)
  }

  isActualPage(indexPage: number) {
    return this.commandItemData.data.page === indexPage
  }


  private findAllPaymentMethod() {
    this.paymentMethodService.findAllPaymentMethods()
      .subscribe({
        next: (paymentMethods) => {
          this.paymentMethods.isLoading = false
          this.paymentMethods.data = paymentMethods
          this.paymentMethods.paymentMethodSelectedId = paymentMethods[0].id.toString()
        },
        error: err => {
          this.paymentMethods.isLoading = false
          if (err instanceof HttpErrorResponse && typeof err.error === 'object') {
            if (err.error.message && typeof err.error.message === 'string') {
              this.paymentMethods.messages.errors = [err.error.message]
            } else if (err.error.messages && typeof err.error.messages === 'object') {
              this.paymentMethods.messages.errors = Object.entries(err.error.messages).map(item => `${item[0]}: ${item[1]}`)
            }
          } else {
            this.paymentMethods.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
          }
        }
      })
  }

  private findCommandItemsByCommandId(commandId: number, searchInput: string, page: number, size: number) {
    this.findAllCommandItemsByCommandSubscribe = this.commandItemService.findAllCommandItemsByCommand(commandId, {
      searchInput: searchInput,
      page: page,
      size: size,
      sortBy: 'createdAt',
      orderBy: 'asc'
    })
      .subscribe({
        next: (commandItems) => {
          this.commandData.isLoading = false
          this.commandItemData.data = commandItems
        },
        error: err => {
          this.commandData.isLoading = false
          if (err instanceof HttpErrorResponse && typeof err.error === 'object') {
            if (err.error.message && typeof err.error.message === 'string') {
              this.commandData.messages.errors = [err.error.message]
            } else if (err.error.messages && typeof err.error.messages === 'object') {
              this.commandData.messages.errors = Object.entries(err.error.messages).map(item => `${item[0]}: ${item[1]}`)
            }
          } else {
            this.commandItemData.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
          }
        }
      })
  }

  private findCommandById() {
    this.findCommandByIdSubscribe = this.route.params.subscribe(
      params => {
        const commandId = params["commandId"]
        if (!commandId) {
          return
        }
        this.commandService.findCommandById(commandId)
          .subscribe({
            next: (command) => {
              this.commandData.isLoading = false
              this.commandData.data = command
              this.findCommandItemsByCommandId(commandId, this.commandItemData.searchInput, this.commandItemData.data.page, this.commandItemData.data.size)
            },
            error: err => {
              this.commandData.isLoading = false
              if (err instanceof HttpErrorResponse && typeof err.error === 'object') {
                if (err.error.message && typeof err.error.message === 'string') {
                  this.commandData.messages.errors = [err.error.message]
                } else if (err.error.messages && typeof err.error.messages === 'object') {
                  this.commandData.messages.errors = Object.entries(err.error.messages).map(item => `${item[0]}: ${item[1]}`)
                }
              } else {
                this.commandData.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
              }
            }
          })
      }
    )
  }
}
