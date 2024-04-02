import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageService} from "primeng/api";
import {FileUploadEvent} from "primeng/fileupload";

@Component({
  selector: 'app-ticket-create-page',
  templateUrl: './ticket-create-page.component.html',
  styleUrl: './ticket-create-page.component.scss',
  providers: [MessageService]
})

export class TicketCreatePageComponent {

  constructor(private messageService: MessageService) {
  }

  ticketCreateForm = new FormGroup({
    requestType: new FormControl('', Validators.required),
    topic: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  onSubmit() {
    console.log(this.ticketCreateForm.value.requestType,
      this.ticketCreateForm.value.topic,
      this.ticketCreateForm.value.description);
  }

  onUpload(event: FileUploadEvent) {
    this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode'});
  }
}
