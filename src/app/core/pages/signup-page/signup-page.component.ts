import {Component, OnDestroy} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {ConstVariables} from "../../../const-variables";
import {catchError, finalize, of, Subject, takeUntil} from "rxjs";
import {UserSignup} from "../../../shared/interfaces/user-signup";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent implements OnDestroy {

  private readonly destroy$ = new Subject<void>()

  buttonLock: boolean = false;
  spinnerActive: boolean = false;

  constructor(private readonly userService: UserService,
              private readonly router: Router) {
  }

  signupForm = new FormGroup({
      name: new FormControl('',
        [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),

      email: new FormControl('',
        [Validators.required, Validators.pattern(ConstVariables.emailPattern)]),

      password: new FormControl('',
        [Validators.required, Validators.pattern(ConstVariables.passwordPattern)]),

      confirmPassword: new FormControl('',
        [Validators.required, Validators.pattern(ConstVariables.passwordPattern)])
    },
    {
      validators: this.matchValidator('password', 'confirmPassword')
    });

  onSubmit() {

    this.spinnerActive = true

    const user: UserSignup = {
      username:this.signupForm.value.name!,
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
        next: () => this.router.navigate(['/login']),
        error: (error) => console.log(error)
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private matchValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (abstractControl: AbstractControl) => {
      const control = abstractControl.get(controlName);
      const matchingControl = abstractControl.get(matchingControlName);

      if (matchingControl!.errors && !matchingControl!.errors?.['confirmedValidator']) {
        return null;
      }

      if (control!.value !== matchingControl!.value) {
        const error = {confirmedValidator: 'Passwords do not match.'};
        matchingControl!.setErrors(error);
        return error;
      } else {
        matchingControl!.setErrors(null);
        return null;
      }
    }
  }
}


