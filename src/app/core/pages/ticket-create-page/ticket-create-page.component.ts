import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-ticket-create-page',
  templateUrl: './ticket-create-page.component.html',
  styleUrl: './ticket-create-page.component.scss',

})

export class TicketCreatePageComponent {
  requestType = new FormControl('');
  topic = new FormControl('');
  description = new FormControl('');
}
