import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../shared/services/user.service";
import {UserLogin} from "../../../shared/interfaces/user-login";
import {catchError, finalize, of, Subject, switchMap, takeUntil} from "rxjs";
import {ConstVariables} from "../../../const-variables";
import {TokenService} from "../../../shared/services/token.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {CustomValidator} from "../../../shared/validators/custom-validator";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  providers: [MessageService]
})
export class LoginPageComponent implements OnDestroy {

  private readonly destroy$ = new Subject<void>();
  buttonLock: boolean = false;
  spinnerActive: boolean = false;
  display: boolean = false

  constructor(private readonly userService: UserService,
              private readonly storageService: TokenService,
              private readonly router: Router) {
  }

  loginForm = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.pattern(CustomValidator.emailPattern)]),
    password: new FormControl('',
      [Validators.required, Validators.pattern(CustomValidator.passwordPattern)])
  });

  onSubmit() {

    const user: UserLogin = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!
    }

    this.buttonLock = true;
    this.spinnerActive = true

    this.userService.logIn(user)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => of(error)),
        finalize(() => {
          this.buttonLock = false
          this.spinnerActive = false
        }),
        switchMap(token => {
          this.storageService.setToken(token)
          return this.userService.GetUser()
            .pipe(
              takeUntil(this.destroy$),
              catchError(error => of(error)),
              finalize(() => {
                this.buttonLock = false
                this.spinnerActive = false
              })
            )
        })
      )
      .subscribe({
        next: () => this.router.navigateByUrl('/').then(() => window.location.reload()),
        error: error => {
          // console.log(error)
          if (error instanceof HttpErrorResponse && error.status == 400){
            this.display = true
          }
        }
      })


  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
