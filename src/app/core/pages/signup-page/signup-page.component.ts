import {Component, OnDestroy} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
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

  private readonly destroy$ = new Subject<void>();
  private readonly user: UserSignup = {
    username: '',
    email: '',
    password: ''
  };
  private spinner: boolean = false;
  private buttonLock: boolean = false;

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

    this.user.username = this.signupForm.value.name!;
    this.user.email = this.signupForm.value.email!;
    this.user.password = this.signupForm.value.password!;

    this.userService.signUp(this.user)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => of(error)),
        finalize(() => {
          this.spinner = false;
          this.buttonLock = false;
        })
      )
      .subscribe({
        next: () => this.router.navigate(['']),
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


