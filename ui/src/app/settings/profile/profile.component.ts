import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.type';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'settings-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  form = {
    fullName: '',
    profileImageUrl: '',
    isLoading: false,
    message: {
      errors: [] as string[]
    }
  }

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // TODO: adicionar error, usando o estilo de código tap, onError no final etc...do angular
    this.form.isLoading = true
    this.userService.getUserLocalStorage()
      .subscribe({
        next: user => {
          this.form = {
            ... this.form,
            fullName: user.fullName,
            isLoading: false,
            profileImageUrl: user.profileImageUrl
          }
        },
        error: () => {
          this.form.isLoading = false
        }
      })
  }

  loadDefaultProfileImageUrl(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/user.png';
  }

  onSubmit(form: NgForm) {
    this.form.message.errors = [];
    this.form.isLoading = true;

    this.userService.updateProfile({
      fullName: this.form.fullName,
      profileImageUrl: this.form.profileImageUrl,
    })
      .pipe(
        switchMap(() => this.userService.getUserLogged()), // Obtém o usuário atualizado
        tap(user => this.userService.setUserLocalStorage(user)), // Atualiza no localStorage
        tap(() => this.router.navigate(['/home'])), // Redireciona
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
      )
      .subscribe(); // ⚠️ IMPORTANTE: Sem `subscribe()`, o fluxo não será executado!
  }

  /*
    Will match the following cases
    http://www.foufos.gr
    https://www.foufos.gr
    http://foufos.gr
    http://www.foufos.gr/kino
    http://werer.gr
    www.foufos.gr
    www.mp3.com
    www.t.co
    http://t.co
    http://www.t.co
    https://www.t.co
    www.aa.com
    http://aa.com
    http://www.aa.com
    https://www.aa.com
    badurlnotvalid://www.google.com - captured url www.google.com
    htpp://www.google.com - captured url www.google.com
    Will NOT match the following

    www.foufos
    www.foufos-.gr
    www.-foufos.gr
    foufos.gr
    http://www.foufos
    http://foufos
    www.mp3#.com
  */
  urlRegex(): RegExp {
    return new RegExp(
      "^(https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|www\\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\\.[^\\s]{2,}|https?:\\/\\/(?:www\\.|(?!www))[a-zA-Z0-9]+\\.[^\\s]{2,}|www\\.[a-zA-Z0-9]+\\.[^\\s]{2,})$"
    );
  }

}
