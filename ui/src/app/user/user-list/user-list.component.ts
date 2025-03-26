import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResponse } from '../../types/paginated-response.type';
import { User } from '../../types/user.type';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserRole } from '../../types/user-role.type';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  protected isShowConfirmDelete = false;

  protected list = {
    data: {} as PaginatedResponse<User>,
    searchInput: '',
    messages: {
      errors: [] as string[],
      info: [] as string[],
    },
    isLoading: false,
  }


  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.findAllUsers()
  }

  protected toggleIsShowConfirmDelete() {
    this.isShowConfirmDelete = !this.isShowConfirmDelete
  }

  protected goToHome() {
    this.router.navigate([""])
  }

  protected deleteUserSelected() {

  }

  protected searchByInputQuery() {

  }

  protected goToUserForm() {
    throw new Error('Method not implemented.');
  }

  protected findAllUsers(query: string = '', page: number = 0, size = 5) {
    this.list.isLoading = true
    this.userService.findAllUsers(query, page, size)
      .subscribe({
        next: users => {
          this.list.data = users;
          if (this.list.data.content.length === 0) {
            this.list.messages.info = ['Nenhum usuário listado.']
          } else {
            this.list.messages.info = []
          }
          this.list.isLoading = false
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

  protected getRolesNames(user: User) {
    return user.roles.map(role => role.translate()).join(", ")
  }

  protected openModalToDelete(user: User) {
    throw new Error('Method not implemented.');
  }

  protected goToUpdateUser(arg0: number) {
    throw new Error('Method not implemented.');
  }

  protected showPages(): boolean {
    return true
  }

  protected nextPage() {
    throw new Error('Method not implemented.');
  }

  protected isActualPage(indexPage: Number): boolean {
    return true;
  }

  protected goPage(page: number) {
    throw new Error('Method not implemented.');
  }

  protected getPageCountItems(): number[] {
    return [1]
  }

  protected previousPage(): void {

  }
}
