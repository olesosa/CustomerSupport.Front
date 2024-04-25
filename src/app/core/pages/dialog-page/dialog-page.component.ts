import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogShortinfo} from "../../../shared/interfaces/dialog-shortinfo";
import {catchError, EMPTY, of, Subject, switchMap, takeUntil} from "rxjs";
import {ChatMessage} from "../../../shared/interfaces/chat-message";
import {SignalrService} from "../../../shared/services/signalr.service";
import {DialogFilter} from "../../../shared/interfaces/dialog-filter";
import {DialogService} from "../../../shared/services/dialog.service";
import {Dialog} from "../../../shared/interfaces/dialog";
import {MessageService} from "../../../shared/services/message.service";
import {Message} from "../../../shared/interfaces/message";
import {User} from "../../../shared/interfaces/user";
import {UserService} from "../../../shared/services/user.service";
import {TicketService} from "../../../shared/services/ticket.service";
import {AttachmentService} from "../../../shared/services/attachment.service";
import {DialogTicket} from "../../../shared/interfaces/dialog-ticket";

@Component({
  selector: 'app-dialog-page',
  templateUrl: './dialog-page.component.html',
  styleUrl: './dialog-page.component.scss'
})
export class DialogPageComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>()
  isDialogSelected: boolean = false
  dialogs: DialogShortinfo[] = []
  currentDialog!: Dialog
  currentTicket!: DialogTicket
  currentMessageText: string = ''
  currentDialogMessages: Message[] = []
  display: boolean = false
  admins!: User[]
  private filesToUpload: File[] = []
  isAdmin!: boolean

  constructor(private readonly signalrService: SignalrService,
              private readonly dialogService: DialogService,
              private readonly messageService: MessageService,
              private readonly userService: UserService,
              private readonly ticketService: TicketService,
              private readonly attachmentService: AttachmentService) {
  }

  ngOnInit(): void {

    const filter: DialogFilter = {
      dateTime: true
    }

    this.dialogService.getAll(filter)
      .pipe(
        takeUntil(this.destroy$),
        catchError(error => of(error))
      )
      .subscribe({
        next: dialogs => {
          this.dialogs = dialogs
        },
        error: err => console.log(err)
      })

    this.signalrService.getNewMessage()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(message => {
          this.currentDialogMessages.unshift(message)

          return this.messageService.readMessages(this.currentDialog.id)
            .pipe(
              takeUntil(this.destroy$)
            )
        })
      )
      .subscribe()
  }

  onChooseDialog(dialogId: string) {
    this.dialogService.get(dialogId)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => of(err)),
        switchMap((dialog: Dialog) => {
          this.currentDialog = dialog
          this.currentTicket = dialog.ticket
          this.currentDialogMessages = dialog.messages
          return this.messageService.readMessages(dialogId)
        })
      )
      .subscribe({
        next: () => this.isDialogSelected = true,
        error: err => console.log(err)
      })

    this.userService.GetUser()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(user => {
          this.isAdmin = false
          if (user.roleName == 'Admin') {
            this.isAdmin = true
            return this.userService.getAllAdmins()
              .pipe(
                takeUntil(this.destroy$)
              )
          }
          return EMPTY
        })
      )
      .subscribe(
        admins => {
          this.admins = admins
        }
      )
  }

  sendMessage() {
    const message: ChatMessage = {
      dialogId: this.currentDialog.id,
      text: this.currentMessageText
    }

    this.signalrService.sendMessage(message, this.filesToUpload)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(newMessage => {
        this.currentMessageText = ''
        this.filesToUpload = []
        this.currentDialogMessages.unshift(newMessage)
      })
  }

  onAttachmentUpload(event: any) {
    this.filesToUpload = event.target.files
  }

  reassign(ticketId: string, adminId: string) {

    this.ticketService.reassign(ticketId, adminId)
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.display = false)
  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.sendMessage()
    }
  }

  downloadAttachment(attachment: string) {

    this.attachmentService.getMessage(attachment)
      .pipe(takeUntil(this.destroy$))
      .subscribe(response => {
        const blob = new Blob([response], {type: response?.type.toString()});
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
