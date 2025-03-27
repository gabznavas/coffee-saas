import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResponse } from '../../types/paginated-response.type';
import { User } from '../../types/user.type';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TitleService } from '../../services/title.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  protected isShowConfirmDelete = false;
  protected userSelected: User | null = null


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
    private titleService: TitleService,
    private router: Router,
    private userService: UserService,
  ) {
    this.titleService.setTitle("Usuários")
  }

  ngOnInit(): void {
    this.findAllUsers()
  }

  protected toggleIsShowConfirmDelete() {
    this.isShowConfirmDelete = !this.isShowConfirmDelete
  }

  protected goToHome() {
    this.router.navigate([""])
  }

  protected goToUpdateUser(userId: number) {
    this.router.navigate(["/user", "form", userId])
  }

  protected deleteUserSelected() {
    if (!this.userSelected) {
      return
    }

    this.userService.deleteUserById(this.userSelected)
      .subscribe({
        next: () => {
          this.list.isLoading = false;
          this.isShowConfirmDelete = false;
          this.findAllUsers(this.list.searchInput, 0, 10);
        },
        error: (err: HttpErrorResponse) => {
          this.list.isLoading = false;
          this.isShowConfirmDelete = false;

          if (err.error?.message) {
            this.list.messages.errors = [err.error.message];
          } else if (err.error?.messages) {
            this.list.messages.errors = err.error.messages;
          } else {
            this.list.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.'];
          }
        }
      });
  }

  protected searchByInputQuery() {
    this.findAllUsers(this.list.searchInput)
  }

  protected goToUserForm() {
    this.router.navigate(["/user/form"])
  }

  protected findAllUsers(query: string = '', page: number = 0, size = 5) {
    this.list.isLoading = true
    this.userService.findAllUsers(query, page, size)
      .subscribe({
        next: users => {
          this.list.isLoading = false
          this.list.data = users;
          if (this.list.data.content.length === 0) {
            this.list.messages.info = ['Nenhum usuário listado.']
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

  protected getRolesNames(user: User) {
    return user.roles.map(role => role.translate()).join(", ")
  }

  protected openModalToDelete(user: User) {
    this.isShowConfirmDelete = true
    this.userSelected = user
  }


  protected showPages(): boolean {
    return this.list.data.page > 0 && !this.list.isLoading
  }

  protected nextPage() {
    this.findAllUsers(this.list.searchInput, this.list.data.page + 1)
  }

  protected previousPage(): void {
    this.findAllUsers(this.list.searchInput, this.list.data.page - 1)
  }

  protected isActualPage(indexPage: Number): boolean {
    return this.list.data.page === indexPage;
  }

  protected goPage(page: number) {
    this.findAllUsers(this.list.searchInput, page)
  }

  protected getPageCountItems(): number[] {
    return new Array(this.list.data.page).fill('').map((_, index) => index)
  }
}
