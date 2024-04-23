import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomValidator} from "../../../shared/validators/custom-validator";
import {AdminCreate} from "../../../shared/interfaces/admin-create";
import {AdminService} from "../../../shared/services/admin.service";
import {catchError, Observable, of, Subject, take, takeUntil} from "rxjs";
import {User} from "../../../shared/interfaces/user";
import {UserService} from "../../../shared/services/user.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnDestroy {

  private readonly destroy$ = new Subject<void>()
  display: boolean = false
  admins: User[] = []
  selectedAdmin!: User
  isSelectVisible: boolean = false

  constructor(private readonly adminService: AdminService,
              private readonly userService: UserService) {
  }

  adminCreateForm = new FormGroup({
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
    const admin: AdminCreate = {
      email: this.adminCreateForm.value.email!,
      password: this.adminCreateForm.value.password!
    }

    this.adminService.create(admin)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => of(err))
      )
      .subscribe({
        error: err => console.log(err)
      })
  }

  remove() {

    this.adminService.remove(this.selectedAdmin.id)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => of(err))
      )
      .subscribe({
        error: err => console.log(err)
      })
  }

  onViewSelect() {
    this.isSelectVisible = !this.isSelectVisible;

    this.userService.getAllAdmins()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: admins => {
          this.admins = admins
        }
      })
  }

  onSelect(admin: User) {
    this.selectedAdmin = admin
    this.display = true
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
