import {Component, OnInit} from '@angular/core';
import {TicketShortinfo} from "../../interfaces/ticket-shortinfo";
import { TicketService } from '../../services/ticket.service';

@Component({
  selector: 'app-tickets-page',
  templateUrl: './tickets-page.component.html',
  styleUrl: './tickets-page.component.scss'
})

export class TicketsPageComponent implements OnInit {
  // constructor(private service: TicketService) { }
  //  ngOnInit() {
  //   this.service.getAllTickets().subscribe((myResult : any) =>
  //   console.log(myResult));
  //  }

  tickets!: TicketShortinfo[];

  sortField!: string;

  sortOptions!: object[];

  sortOrder!: number;

  constructor(private service: TicketService) { }

  ngOnInit(): void {
    this.tickets = this.service.getTickets();

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
