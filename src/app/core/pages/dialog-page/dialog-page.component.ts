import {Component, OnDestroy, OnInit} from '@angular/core';
import {DialogShortinfo} from "../../../shared/interfaces/dialog-shortinfo";
import {catchError, of, Subject, switchMap, takeUntil} from "rxjs";
import {ChatMessage} from "../../../shared/interfaces/chat-message";
import {SignalrService} from "../../../shared/services/signalr.service";
import {DialogFilter} from "../../../shared/interfaces/dialog-filter";
import {DialogService} from "../../../shared/services/dialog.service";
import {Dialog} from "../../../shared/interfaces/dialog";
import {MessageService} from "../../../shared/services/message.service";
import {Message} from "../../../shared/interfaces/message";

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
  currentMessageText: string = ''
  currentDialogMessages: Message[] = []

  constructor(private readonly signalrService: SignalrService,
              private readonly dialogService: DialogService,
              private readonly messageService: MessageService) {
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
          console.log(dialogs)
        },
        error: err => console.log(err)
      })
  }

  onChooseDialog(dialogId: string) {
    this.dialogService.get(dialogId)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => of(err)),
        switchMap((dialog: Dialog) => {
          console.log(dialog)
          this.currentDialog = dialog
          this.currentDialogMessages = dialog.messages
          return this.messageService.readMessages(dialogId)
        })
      )
      .subscribe({
        next: () => this.isDialogSelected = true,
        error: err => console.log(err)
      })
  }

  sendMessage() {
    const message: ChatMessage = {
      dialogId: this.currentDialog.id,
      text: this.currentMessageText
    }

    if (message.text.trim().length !== 0) {
      this.signalrService.sendMessage(message)
        .pipe(
          takeUntil(this.destroy$),
          catchError(err => of(err)),
        )
        .subscribe({
          next: () => this.currentMessageText = ''
        })
    }
  }

  addAttachment() {

  }

  onKeyUp(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.sendMessage()
    }
  }


  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
