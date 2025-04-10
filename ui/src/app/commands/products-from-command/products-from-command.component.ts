import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginatedResponse } from '../../types/paginated-response.type';
import { CommandItem } from '../../types/command-item.type';
import { Command } from '../../types/command.type';
import { CommandService } from '../../services/command.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommandItemService } from '../../services/command-item.service';

@Component({
  selector: 'products-from-command',
  templateUrl: './products-from-command.component.html',
  styleUrl: './products-from-command.component.scss'
})
export class ProductsFromCommandComponent implements OnInit {

  list = {
    command: {} as Command,
    filters: {
      searchInput: '',
    },
    messages: {
      errors: [] as string[],
      info: [] as string[],
    },
    isLoading: false,
    data: {} as PaginatedResponse<CommandItem>
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private commandService: CommandService,
    private commandItemService: CommandItemService
  ) {
    this.route.params.subscribe(
      params => {
        const commandId = params['commandId']
        if (commandId) {
          this.list.command.id = commandId
        }
      }
    )
  }

  ngOnInit(): void {
    this.commandService.findCommandById(this.list.command.id)
      .subscribe({
        next: command => {
          this.list.isLoading = false
          this.list.command = command;
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
    this.commandItemService.findAllCommandItemsByCommand(this.list.command.id, {
      searchInput: '',
      page: 0,
      size: 10,
      sortBy: 'createdAt',
      orderBy: 'ASC',
    })
      .subscribe({
        next: paginetedResponsecommandItem => {
          this.list.isLoading = false
          this.list.data = paginetedResponsecommandItem;
          if (this.list.data.content.length === 0) {
            this.list.messages.info = ['Nenhum produto listado.']
          } else {
            this.list.messages.info = []
          }
          this.list.messages.errors = []
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

  goToCloseCommand() {
    this.router.navigate([`command/${this.list.command.id}/payment/form`])
  }

  goToCommandList() {
    this.router.navigate(["/command/list"])
  }

  findAllProductsByCommand() {

  }

  goToSelectProduct() {
    this.router.navigate([`/command/${this.list.command.id}/select-product`])
  }

  removeProduct(commandId: number, productId: number) {
    alert(commandId + " " + productId)
  }

  showPages(): boolean {
    return this.list.data.totalPages > 1
  }

  previousPage() {

  }

  nextPage() {

  }

  goPage(index: number) {

  }

  isActualPage(indexPage: number) {
    return this.list.data.page === indexPage
  }

  getPageCountItems() {
    return new Array(this.list.data.totalPages).fill('')
      .map((_, index) => index)
  }
}
