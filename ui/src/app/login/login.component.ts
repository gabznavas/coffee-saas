import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './services/login.service';
import { AuthorizationService } from '../services/authorization.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form = {
    email: '',
    password: '',
    isLoading: false,
    message: {
      errors: [] as string[],
    },
  }

  constructor(
    private loginService: LoginService,
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    this.form.message.errors = []
    this.form.isLoading = true
    this.loginService.login({
      email: this.form.email,
      password: this.form.password,
    })
      .pipe(finalize(() => {
        this.form.isLoading = false
      }))
      .subscribe({
        next: data => {
          this.authorizationService.setTokenLocalStorage(data)
          this.router.navigate(["/home"])
        },
        error: err => {
          if (err instanceof HttpErrorResponse) {
            if (typeof err.error.message === 'string' && err.error.message.length > 0) {
              this.form.message.errors.push(err.error.message)
            } else if (Array.isArray(err.error.message) && err.error.message.length > 0) {
              this.form.message.errors.concat(err.error.messages)
            } else {
              this.form.message.errors.push('Tente novamente mais tarde')
            }
          } else {
            this.form.message.errors.push('Tente novamente mais tarde')
          }
        }
      })
  }
}
