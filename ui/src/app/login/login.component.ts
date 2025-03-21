import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './services/login.service';
import { AuthorizationService } from '../services/authorization.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { UserService } from '../services/user.service';

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
    private userService: UserService,
    private router: Router
  ) { }

  onSubmit(form: NgForm) {
    this.form.message.errors = []
    this.form.isLoading = true

    this.loginService.login({
      email: this.form.email,
      password: this.form.password,
    })
      .pipe(
        tap(data => this.authorizationService.setTokenLocalStorage(data)),
        switchMap(() => this.userService.getUserLogged()),
        tap(user => this.userService.setUserLocalStorage(user)),
        tap(() => this.router.navigate(['/home'])),
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (typeof err.error?.message === 'string') {
              this.form.message.errors.push(err.error.message);
            } else {
              this.form.message.errors.push('Ocorreu um erro. Tente novamente mais tarde.');
            }
          } else {
            this.form.message.errors.push('Erro inesperado.');
          }
          return of(null); // Retorna um Observable vazio para evitar que o fluxo quebre
        }),
        finalize(() => {
          this.form.isLoading = false;
        })
      ).subscribe();
  }
}
