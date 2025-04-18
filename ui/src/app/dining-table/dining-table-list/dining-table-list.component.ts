import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResponse } from '../../types/paginated-response.type';
import { DiningTable } from '../../types/dining-table.type';
import { HttpErrorResponse } from '@angular/common/http';
import { DiningTableService } from '../../services/dining-table.service';


@Component({
  selector: 'app-dining-table-list',
  templateUrl: './dining-table-list.component.html',
  styleUrl: './dining-table-list.component.scss'
})
export class DiningTableListComponent implements OnInit {

  protected isShowConfirmDelete: boolean = false;
  protected tableSelected: DiningTable | null = null;

  protected list = {
    data: {} as PaginatedResponse<DiningTable>,
    searchInput: '',
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

  ngOnInit(): void {
    this.findAllTables()
  }

  protected findAllTables(query: string = '', page: number = 0, size: number = 10) {
    this.diningTableService.findAllDiningTables(query, page, size)
      .subscribe({
        next: tables => {
          this.list.data = tables;
          if (this.list.data.content.length === 0) {
            this.list.messages.info = ['Nenhuma mesa listado.']
          } else {
            this.list.messages.info = []
          }
          this.list.isLoading = false
        },
        error: err => {
          this.list.isLoading = false
          if (err instanceof HttpErrorResponse) {
            if (err.error.message) {
              this.list.messages.errors.push(err.error.message)
            } else if (err.error.messages) {
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

  getPageCountItems(): number[] {
    return new Array(this.list.data.totalPages).fill('').map((_, index) => index)
  }

  protected goToHome() {
    this.router.navigate([""])
  }

  protected goToTableForm() {
    this.router.navigate(["/dining-table", "form"])
  }

  protected deleteTableSelected(): void {
    if (!this.tableSelected) {
      this.list.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
      return
    }

    this.isShowConfirmDelete = false
    this.diningTableService.deleteDiningTableById(this.tableSelected.id)
      .subscribe({
        next: () => {
          this.list.isLoading = false
          this.list.messages.info = ['Mesa deleta.']
          this.isShowConfirmDelete = false
          this.findAllTables(this.list.searchInput)
        },
        error: err => {
          this.list.isLoading = false
          this.isShowConfirmDelete = false
          if (err instanceof HttpErrorResponse) {
            if (err.error.message) {
              this.list.messages.errors.push(err.error.message)
            } else if (err.error.messages) {
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

  protected toggleIsShowConfirmDelete() {
    this.isShowConfirmDelete = !this.isShowConfirmDelete
  }

  protected searchByInputQuery() {
    this.findAllTables(this.list.searchInput)
  }

  protected previousPage() {
    this.findAllTables(this.list.searchInput, this.list.data.page - 1)
  }

  protected showPages(): boolean {
    return this.list.data.totalPages > 1
  }

  protected openModalToDelete(table: DiningTable) {
    this.tableSelected = table
    this.isShowConfirmDelete = true
  }

  protected goToUpdateTable(tableId: number) {
    this.router.navigate(["/dining-table", "form", tableId])
  }

  protected isActualPage(index: Number): any {
    return this.list.data.page === index
  }

  protected nextPage() {
    this.findAllTables(this.list.searchInput, this.list.data.page + 1)
  }

  protected goPage(page: number) {
    this.findAllTables(this.list.searchInput, page)
  }

}
