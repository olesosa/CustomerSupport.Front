import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {TicketShortinfo} from "../interfaces/ticket-shortinfo";
import {environment} from "../environments/environment";
import {HttpClient} from "@angular/common/http";
import {TicketFullinfo} from "../interfaces/ticket-fullinfo";
import {TicketCreate} from "../interfaces/ticket-create";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl: string = `${environment.apiAddress}/Tickets`;
  constructor(private readonly httpClient: HttpClient) { }

  public getAll(): Observable<TicketShortinfo[]> {

    return this.httpClient.get<TicketShortinfo[]>(this.apiUrl);
  }

  public getFullInfo(ticketId:string) : Observable<TicketFullinfo>{

    return this.httpClient.get<TicketFullinfo>(this.apiUrl + `/${ticketId}`);
  }

  public create(ticket:TicketCreate) : Observable<TicketShortinfo>{

    return this.httpClient.post<TicketShortinfo>(this.apiUrl, ticket);
  }

  public getFakeTickets(): TicketShortinfo[]{
    return [
      {id:'', number:0, requestType:'Request Type', topic:'Topic 1'},
      {id:'', number:1, requestType:'Request Type', topic:'Topic 2'},
      {id:'', number:2, requestType:'Request Type', topic:'Topic 3'},
      {id:'', number:3, requestType:'Request Type', topic:'Topic 4'},
      {id:'', number:4, requestType:'Request Type', topic:'Topic 5'},
    ];
  }
}
