import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrl: './security.component.scss'
})
export class SecurityComponent implements OnInit {
  form = {
    email: '',
    password: '',
    passwordConfirmation: '',
    messages: {
      globalErrors: [] as string[],
    },
    isLoading: false
  }

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    // TODO: adicionar error, usando o estilo de código tap, onError no final etc...do angular
    this.form.isLoading = true
    this.userService.getUserLocalStorage()
      .subscribe({
        next: user => {
          this.form = {
            ... this.form,
            email: user.email,
            isLoading: false,
          }
        },
        error: () => {
          this.form.isLoading = false
        }
      })
  }

  onSubmit(form: NgForm) {
    if (this.form.password !== this.form.passwordConfirmation) {
      this.form.messages.globalErrors.push('Senha e confirmação de senha estão diferentes.');
    }
  }
}
