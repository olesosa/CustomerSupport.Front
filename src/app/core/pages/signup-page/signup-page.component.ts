import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {catchError, finalize, from, of, Subject, takeUntil} from "rxjs";
import {UserSignup} from "../../../shared/interfaces/user-signup";
import {Router} from "@angular/router";
import {CustomValidator} from "../../../shared/validators/custom-validator";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent implements OnDestroy {

  private readonly destroy$ = new Subject<void>()

  buttonLock: boolean = false;
  spinnerActive: boolean = false;
  display: boolean = false

  constructor(private readonly userService: UserService,
              private readonly router: Router) {
  }

  signupForm = new FormGroup({
      name: new FormControl('',
        [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),

      email: new FormControl('',
        [Validators.required, Validators.pattern(CustomValidator.emailPattern)]),

      password: new FormControl('',
        [Validators.required, Validators.pattern(CustomValidator.passwordPattern)]),

      confirmPassword: new FormControl('',
        [Validators.required, Validators.pattern(CustomValidator.passwordPattern)])
    },
    {
      validators: CustomValidator.matchValidator('password', 'confirmPassword')
    });

  onSubmit() {

    this.spinnerActive = true

    const user: UserSignup = {
      username: this.signupForm.value.name!,
      email: this.signupForm.value.email!,
      password: this.signupForm.value.password!
    }

    this.userService.signUp(user)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => of(error)),
        finalize(() => {
          this.buttonLock = false;
          this.spinnerActive = false
        })
      )
      .subscribe({
        next: () => {
          this.router.navigateByUrl('')
          this.display = true
        },
        error: (error) => console.log(error)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}


