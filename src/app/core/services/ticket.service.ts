import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {TicketShortinfo} from "../interfaces/ticket-shortinfo";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  public tickets: Subject<any> = new Subject();
  constructor() { }

  public getAllTickets(): any {
    this.tickets.next(['ticket1', 'ticket2']);
  }

  public getTickets(): TicketShortinfo[]{
    return [
      {id:'', number:0, requestType:'Request Type', topic:'Topic 1'},
      {id:'', number:1, requestType:'Request Type', topic:'Topic 2'},
      {id:'', number:2, requestType:'Request Type', topic:'Topic 3'},
      {id:'', number:3, requestType:'Request Type', topic:'Topic 4'},
      {id:'', number:4, requestType:'Request Type', topic:'Topic 5'},
    ];
  }
}
