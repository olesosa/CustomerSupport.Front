import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketFullinfo} from "../../../shared/interfaces/ticket-fullinfo";
import {TicketService} from "../../../shared/services/ticket.service";
import {ActivatedRoute, Router} from "@angular/router";
import {catchError, concatWith, Observable, of, Subject, switchMap, takeUntil} from "rxjs";
import {UserService} from "../../../shared/services/user.service";
import {DialogService} from "../../../shared/services/dialog.service";
import {getRequestTypeName} from "../../../shared/helpers/mapper";
import {AttachmentService} from "../../../shared/services/attachment.service";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";

@Component({
  selector: 'app-ticket-view',
  templateUrl: './ticket-view.component.html',
  styleUrl: './ticket-view.component.scss'
})
export class TicketViewComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();
  ticket$!: Observable<TicketFullinfo>
  isAdmin!: boolean

  constructor(private readonly ticketService: TicketService,
              private readonly route: ActivatedRoute,
              private readonly router: Router,
              private readonly userService: UserService,
              private readonly dialogService: DialogService,
              private readonly attachmentService: AttachmentService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.ticket$ = this.ticketService.getFullInfo(params['id'])
    })

    this.userService.GetUser()
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => of(err)),
      )
      .subscribe({
        next: user => this.isAdmin = user?.roleName == 'Admin'
      })
  }

  editTicket(prop: string, ticket: TicketFullinfo) {

    switch (prop) {
      case 'assign':
        this.userService.GetUser()
          .pipe(
            takeUntil(this.destroy$),
            catchError(err => of(err)),
            switchMap(user => {
              if (user.roleName !== 'Admin') {
                throw new Error('403 access denied')
              }

              return this.ticketService.assign(ticket.id, user.id)
            })
          )
          .subscribe({
            next: result => console.log(result),
            error: err => console.log(err)
          })
        break
      case 'solve':
        ticket.isSolved = !ticket.isSolved
        this.ticketService.solve(ticket.id)
          .pipe(
            takeUntil(this.destroy$),
            catchError(err => of(err))
          )
          .subscribe({
            next: result => console.log(result),
            error: err => console.log(err)
          })
        break
      case 'close':
        ticket.isClosed = !ticket.isClosed
        this.ticketService.close(ticket.id)
          .pipe(
            takeUntil(this.destroy$),
            catchError(err => of(err))
          )
          .subscribe({
            next: result => console.log(result),
            error: err => console.log(err)
          })
        break
    }
  }

  onCreateDialog(ticketId: string) {

    this.dialogService.create(ticketId)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => of(err))
      )
      .subscribe({
        next: () => this.router.navigateByUrl('/dialogs'),
        error: err => console.log(err)
      })
  }

  reassignTicket(ticket: TicketFullinfo) {

  }


  downloadAttachment(ticket: TicketFullinfo) {

    console.log('--downloadAttachment')

    for (const attachment of ticket.attachmentIds){

      this.attachmentService.getTicket(attachment)
        .pipe(
          takeUntil(this.destroy$),
          catchError(err => of(err))
        )
        .subscribe({
          next: response =>  {
            console.log(response)

            const newBlob = new Blob([response], { type: "application/octet-stream" });
            const data = window.URL.createObjectURL(newBlob);
            const link = document.createElement("a");
            link.href = data;
            // link.download = Math.floor(Math.random() * 1000).toString()
            link.click();
          },
          error: err => console.log(err)
        })
    }
  }

  private getFileExtension(url: string): string {
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    const extensionParts = fileName.split('.');
    return extensionParts[extensionParts.length - 1];
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  protected readonly getRequestTypeName = getRequestTypeName;
}
