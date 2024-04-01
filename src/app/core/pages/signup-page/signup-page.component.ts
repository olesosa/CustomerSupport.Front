import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {

  emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  passwordPattern: string = '((?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'

  signupForm = new FormGroup({
    name: new FormControl('',
      [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),

    email: new FormControl('',
      [Validators.required, Validators.pattern(this.emailPattern)]),

    password: new FormControl('',
      [Validators.required, Validators.pattern(this.passwordPattern),])
  });

  onSubmit(): void {
    console.log(this.signupForm.value.name, this.signupForm.value.email, this.signupForm.value.password)
  }
}
