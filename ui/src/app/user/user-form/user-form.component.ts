import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from '../../services/role.service';
import { Role } from '../../types/user-role.type';
import { map, of, pipe } from 'rxjs';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnInit {
  form = {
    isUpdate: false,
    isLoading: false,
    data: {
      id: 0,
      fullName: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      rolesSelected: [] as Role[],
    },
    messages: {
      errors: [] as string[],
      info: [] as string[],
    },
    roleSelectedId: "0",
    roles: [] as Role[]
  }

  constructor(
    private titleService: TitleService,
    private router: Router,
    private roleService: RoleService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.findRoles()
    this.route.params.subscribe(
      params => {
        const userId = params["userId"]
        if (userId) {
          this.form.isUpdate = true
          this.findUserByIdToUpdate(Number(userId))
          this.titleService.setTitle("Atualizar usuário")
        } else {
          this.titleService.setTitle("Novo usuário")
        }
      }
    )
  }

  protected findUserByIdToUpdate(userId: number) {
    this.userService.findUserById(userId)
      .subscribe({
        next: user => {
          this.form.isLoading = false

          this.form.data.id = user.id
          this.form.data.email = user.email
          this.form.data.fullName = user.fullName
          this.form.data.rolesSelected = user.roles
        },
        error: err => {
          this.form.isLoading = false
          if (err instanceof HttpErrorResponse) {
            if (err.error?.message && typeof err.error.message === 'string') {
              this.form.messages.errors = [err.error.message]
            } else if (err.error?.messages && typeof err.error.messages === 'object') {
              this.form.messages.errors = Object.entries(err.error.messages).map(item => `${item[0]}: ${item[1]}`)
            }
          } else {
            this.form.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
          }
        }
      })
  }

  protected goToUserList() {
    this.router.navigate(['/user'])
  }

  protected addRoleSelected() {
    debugger
    if (!this.form.roleSelectedId) {
      return
    }

    const role = this.form.roles
      .find(role => role.id === Number(this.form.roleSelectedId))

    if (!role) {
      return
    }

    const alreadyExists = this.form.data
      .rolesSelected.find(roleSelected => roleSelected.id === Number(this.form.roleSelectedId))
    if (alreadyExists !== undefined) {
      return
    }

    this.form.data.rolesSelected.push(role)
  }

  protected removeRoleFromList(roleId: number) {
    if (!this.form.roleSelectedId) {
      return
    }

    const role = this.form.roles
      .find(role => role.id === Number(this.form.roleSelectedId))

    if (!role) {
      return
    }

    const roleSelected = this.form.data.rolesSelected.find(role => role.id === roleId)
    if (!roleSelected) {
      return
    }

    this.form.data.rolesSelected = this.form.data.rolesSelected.filter(role => role.id !== roleId)
  }

  protected onSubmit(form: NgForm) {
    if (this.form.isUpdate) {
      this.onSubmitUpdateUser(form)
    } else {
      this.onSubmitRegisterUser(form)
    }
  }

  private onSubmitUpdateUser(form: NgForm) {
    this.form.isLoading = true
    this.userService.updateUser(this.form.data.id, {
      email: this.form.data.email,
      fullName: this.form.data.fullName,
      roleIds: this.form.data.rolesSelected.map(role => role.id)
    }).subscribe({
      next: () => {
        this.form.isLoading = false

        const userFromLocalStorage = this.userService.getUserLocalStorage()
        if (userFromLocalStorage && userFromLocalStorage.id === this.form.data.id) {
          const newUserToLocalStorage = {
            ...userFromLocalStorage,
            email: this.form.data.email.trim(),
            fullName: this.form.data.fullName.trim(),
            roles: this.form.data.rolesSelected,
          }
          this.userService.setUserLocalStorage(newUserToLocalStorage)
        }

        this.clearForm(form);
        this.router.navigate(["/user"])
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

  private onSubmitRegisterUser(form: NgForm) {
    if (!this.isPasswordsEquals(form)) {
      this.form.messages.errors = ['Senha e confirmação de senha estão diferentes.']
      return
    }

    this.form.isLoading = true
    this.userService.registerUser({
      email: this.form.data.email,
      fullName: this.form.data.fullName,
      password: this.form.data.password,
      passwordConfirmation: this.form.data.passwordConfirmation,
      roleIds: this.form.data.rolesSelected.map(role => role.id)
    }).subscribe({
      next: user => {
        this.form.isLoading = false
        this.clearForm(form);
        this.form.messages.errors = []
        this.form.messages.info = ['Usuário registrado.']
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

  private isPasswordsEquals(form: NgForm): boolean {
    return this.form.data.password === this.form.data.passwordConfirmation
  }

  private clearForm(form?: NgForm) {
    form?.reset({
      name: '',
      description: '',
      category: '1',
      unit: '1',
      stock: 0,
    })
  }


  private findRoles() {
    this.roleService.findRoles()
      .subscribe({
        next: roles => {
          this.form.isLoading = false
          if (!roles || typeof roles !== 'object' || !roles.length || roles.length === 0) {
            this.form.messages.errors = ['Não foi possível carregar as funções de acesso.', 'Tente novamente mais tarde']
          } else {
            this.form.roles = roles.map(role => new Role(role.id, role.name))

            this.form.roleSelectedId = this.form.roles[0].id.toString()
            this.form.data.rolesSelected.push(...this.form.roles)
          }
        },
        error: err => {
          this.form.isLoading = false
          if (err instanceof HttpErrorResponse) {
            if (err.error?.message && typeof err.error.message === 'string') {
              this.form.messages.errors = [err.error.message]
            } else if (err.error?.messages && typeof err.error.messages === 'object') {
              this.form.messages.errors = Object.entries(err.error.messages).map(item => `${item[0]}: ${item[1]}`)
            }
          } else {
            this.form.messages.errors = ['Ocorreu um problema.', 'Tente novamente mais tarde.']
          }
        }
      })
  }
} 
