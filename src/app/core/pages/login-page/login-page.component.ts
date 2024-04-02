import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern: string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'

  loginForm = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.pattern(this.emailPattern)]),
    password: new FormControl('',
      [Validators.required, Validators.pattern(this.passwordPattern)
      ])
  });

  onSubmit(): void {
    console.log(this.loginForm.value.email, this.loginForm.value.password)
  }
}
