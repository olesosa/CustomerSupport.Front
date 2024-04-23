import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketFullinfo} from "../../../shared/interfaces/ticket-fullinfo";
import {TicketService} from "../../../shared/services/ticket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, EMPTY, of, Subject, switchMap, takeUntil} from "rxjs";
import {UserService} from "../../../shared/services/user.service";
import {DialogService} from "../../../shared/services/dialog.service";
import {getRequestTypeName} from "../../../shared/helpers/mapper";
import {AttachmentService} from "../../../shared/services/attachment.service";
import {UserInfo} from "../../../shared/interfaces/user-info";

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrl: './ticket-view.component.scss'
})
export class TicketViewComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();
  spinnerActive: boolean = false;
  ticket!: TicketFullinfo
  isAdmin!: boolean
  display: boolean = false

  optionSolved!: boolean
  optionClosed!: boolean

  constructor(private readonly ticketService: TicketService,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly userService: UserService,
              private readonly dialogService: DialogService,
              private readonly attachmentService: AttachmentService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ticketService.getFullInfo(params['number'])
        .pipe(
          takeUntil(this.destroy$),
          catchError(err => of(err))
        )
        .subscribe({
          next: ticket => this.ticket = ticket,
          error: () => this.router.navigateByUrl('404')
        })

      this.userService.GetUser()
        .pipe(
          takeUntil(this.destroy$),
          catchError(err => of(err)),
          switchMap(user => {
            this.isAdmin = user?.roleName == 'Admin'
            if (this.isAdmin) {
              return this.ticketService.receive(params['number'])
                .pipe(
                  takeUntil(this.destroy$)
                )
            }
            return EMPTY
          })
        )
        .subscribe()
    })
  }

  assignTicket() {
    this.userService.GetUser()
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => of(err)),
        switchMap(user => {
          if (user.roleName !== 'Admin') {
            throw new Error('403 access denied')
          }
          return this.ticketService.assign(this.ticket.id)
            .pipe(
              takeUntil(this.destroy$),
              catchError(err => of(err)),
              switchMap(() => {
                return this.ticketService.getFullInfo(this.ticket.number.toString())
                  .pipe(
                    takeUntil(this.destroy$),
                    catchError(err => of(err))
                  )
              })
            )
        })
      )
      .subscribe({
        next: ticket => this.ticket = ticket,
        error: err => console.log(err)
      })
  }

  downloadAttachment(attachmentId: string) {

    this.attachmentService.getTicket(attachmentId)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => of(err))
      )
      .subscribe({
        next: response => {
          console.log(response)

          const blob = new Blob([response], {type: response?.type.toString()});
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        },
        error: err => console.log(err)
      })
  }

  showDialog() {
    this.display = true
    this.optionSolved = this.ticket.isSolved
    this.optionClosed = this.ticket.isClosed
  }

  closeDialog() {
    this.display = false;

    console.log('closeDialog')

    this.ticketService.update(this.ticket.id, this.optionSolved, this.optionClosed)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => window.location.reload())
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected readonly getRequestTypeName = getRequestTypeName;
}
