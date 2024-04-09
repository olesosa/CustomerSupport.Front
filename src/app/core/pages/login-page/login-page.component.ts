import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserLogin} from "../../../shared/interfaces/user-login";
import {catchError, finalize, of, Subject, switchMap, takeUntil, throwError} from "rxjs";
import {ConstVariables} from "../../../const-variables";
import {StorageService} from "../../services/storage.service";
import {HttpErrorResponse} from "@angular/common/http";
import {TokenInfo} from "../../../shared/interfaces/token-info";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  providers: [MessageService]
})
export class LoginPageComponent implements OnDestroy {

  private readonly destroy$ = new Subject<void>();
  private readonly user: UserLogin = {
    email: '',
    password: ''
  };
  private spinner: boolean = false;
  private buttonLock: boolean = false;

  constructor(private readonly userService: UserService,
              private readonly storageService: StorageService,
              private readonly router: Router,
              private readonly messageService: MessageService) {
  }

  loginForm = new FormGroup({
    email: new FormControl('',
      [Validators.required, Validators.pattern(ConstVariables.emailPattern)]),
    password: new FormControl('',
      [Validators.required, Validators.pattern(ConstVariables.passwordPattern)])
  });

  onSubmit() {
    this.user.email = this.loginForm.value.email!;
    this.user.password = this.loginForm.value.password!;

    this.spinner = true;
    this.buttonLock = true;

    this.userService.logIn(this.user)
      .pipe(
        switchMap((token: TokenInfo) => {
          this.storageService.setToken(token)
          return this.userService.GetUser()
            .pipe(
              catchError(error => of(error)),
              finalize(() => {
                this.spinner = false;
                this.buttonLock = false;
              })
            )
        }),
        finalize(() => {
          this.spinner = false;
          this.buttonLock = false;
        })
      )
      .subscribe({
        next: () => this.router.navigateByUrl(''),
        error: error => this.handleError(error)
      });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) {
      this.CreateUser();
    } else if (error.status === 401) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error!',
        detail: 'User doesnt exist',
        life: 3000
      })
    } else if (error.status === 500) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error!',
        detail: `Internal server error`,
        life: 3000
      })
    } else if (error.status === 400) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error!',
        detail: `Bad request`,
        life: 3000
      })
    } else {
      console.log(error.status, error)
    }
  }

  private CreateUser() {
    this.userService.signUpApi()
      .pipe(
        catchError(error => of(error))
      )
      .subscribe({
        next: () => this.router.navigateByUrl(''),
        error: (error) => this.handleError(error)
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
