import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TicketService} from "../../../shared/services/ticket.service";
import {TicketCreate} from "../../../shared/interfaces/ticket-create";
import {catchError, of, Subject, switchMap, takeUntil} from "rxjs";
import {Router} from "@angular/router";
import {ConstVariables} from "../../../const-variables";
import {getRequestTypeValue} from "../../../shared/helpers/mapper";
import {AttachmentService} from "../../../shared/services/attachment.service";

@Component({
  selector: 'app-ticket-create-page',
  templateUrl: './ticket-create-page.component.html',
  styleUrl: './ticket-create-page.component.scss',
})

export class TicketCreatePageComponent implements OnDestroy {

  private readonly destroy$ = new Subject<void>()
  private filesToUpload: File[] = []
  requestTypes = ConstVariables.requestTypes

  constructor(private readonly ticketService: TicketService,
              private readonly attachmentService: AttachmentService,
              private readonly router: Router) {
  }

  ticketCreateForm = new FormGroup({
    requestType: new FormControl('', Validators.required),
    topic: new FormControl('', [Validators.required]),
    description: new FormControl('', Validators.required)
  });

  onSubmit() {
    const ticket: TicketCreate = {
      requestType: getRequestTypeValue(this.ticketCreateForm.value.requestType!)!,
      topic: this.ticketCreateForm.value.topic!,
      description: this.ticketCreateForm.value.description!
    }

    this.ticketService.create(ticket)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => of(error)),
        switchMap(ticket => {

          return this.attachmentService.postTicket(this.filesToUpload, ticket.id)
        })
      )
      .subscribe({
        next: (res) => {
          this.router.navigateByUrl('/tickets')
        },
        error: err => console.log(err)
      })
  }

  onAttachmentUpload(event: any) {
    this.filesToUpload = event.target.files
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
