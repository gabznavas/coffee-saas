import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent {
  protected form = {
    email: '',
    password: '',
    passwordConfirmation: '',
    messages: {
      globalSuccesses: [] as string[],
      globalErrors: [] as string[],
    },
    isLoading: false
  }

  constructor(
    private userService: UserService
  ) { }

  onSubmit(form: NgForm) {
    if (this.form.password !== this.form.passwordConfirmation) {
      this.form.messages.globalErrors.push('Senha e confirmação de senha estão diferentes.');
      return;
    }
    this.form.isLoading = true
    this.userService.updateSecurity({
      email: this.form.email,
      password: this.form.password,
      passwordConfirmation: this.form.passwordConfirmation,
    }).subscribe({
      complete: () => {
        form.reset();
        this.form.messages.globalErrors = []
        this.form.messages.globalSuccesses = []
        this.form.messages.globalSuccesses.push('Alterado com sucesso.');
      },
      error: err => {
        if (err instanceof HttpErrorResponse) {
          if (err.error.message) {
            this.form.messages.globalErrors.push(err.error.message)
          } else if (err.error.messages) {
            this.form.messages.globalErrors.concat(err.error.messages)
          } else {
            this.form.messages.globalErrors.push('Tente novamente mais tarde')
          }
        }
        this.form.isLoading = false
      }
    })
  }
}
