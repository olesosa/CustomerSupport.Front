import {Component, OnInit} from '@angular/core';
import {TicketShortinfo} from "../../interfaces/ticket-shortinfo";
import {TicketFullinfo} from "../../interfaces/ticket-fullinfo";
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrl: './tickets-page.component.scss'
})
export class TicketsPageComponent implements OnInit {
  tickets!: TicketShortinfo[];
  sortField!: string;
  sortOptions!: object[];
  sortOrder!: number;

  constructor(private service: TicketService) { }

  ngOnInit(): void {

    // this.service.getFullInfo('eb2c6e4f-6654-416b-8220-86d6e3914373')
    //   .subscribe((ticket: TicketFullinfo) => console.log(ticket));

    // this.service.getAll().subscribe((tickets : TicketShortinfo[]) =>
    //   console.log(tickets));

    this.tickets = this.service.getFakeTickets();

    this.sortOptions = [
      { label: 'Number High to Low', value: '!number' },
      { label: 'Number Low to High', value: 'number' }
      ];
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}
