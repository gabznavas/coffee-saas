import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from './services/login.service';

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
  }

  constructor(
    private loginService: LoginService
  ) { }

  onSubmit(form: NgForm) {
    this.form.isLoading = true
    this.loginService.login({
      email: this.form.email,
      password: this.form.password,
    }).subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.log(err);
      },
      complete: () => {
        this.form.isLoading = false
      },
    })
  }
}
