import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  form = {
    email: '',
    password: '',
  }

  onSubmit(form: NgForm) {
    console.log(form.value);

  }
}
