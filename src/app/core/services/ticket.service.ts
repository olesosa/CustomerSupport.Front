import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TicketShortinfo} from "../../shared/interfaces/ticket-shortinfo";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TicketFullinfo} from "../../shared/interfaces/ticket-fullinfo";
import {TicketCreate} from "../../shared/interfaces/ticket-create";
import {Filter} from "../../shared/interfaces/filter";
import {PagedResponse} from "../../shared/interfaces/paged-response";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl: string = `${environment.apiAddress}/Tickets`;

  constructor(private readonly httpClient: HttpClient) {
  }

  public getAll(filter: Filter): Observable<PagedResponse> {

    let params = new HttpParams()
      .set('PageNumber', filter.PageNumber.toString())
      .set('PageSize', filter.PageSize.toString());

    if (filter.RequestType) {
      params = params.set('RequestType', filter.RequestType);
    }
    if (filter.IsAssigned != null) {
      params = params.set('IsAssigned', filter.IsAssigned.toString());
    }
    if (filter.IsSolved != null) {
      params = params.set('IsSolved', filter.IsSolved.toString());
    }
    if (filter.IsClosed != null) {
      params = params.set('IsClosed', filter.IsClosed.toString());
    }
    if (filter.SortDir != null) {
      params = params.set('SortDir', filter.SortDir);
    } else {
      params = params.set('SortDir', 'asc');
    }
    if (filter.Number != undefined) {
      params = params.set('Number', filter.Number.toString());
    }

    return this.httpClient.get<PagedResponse>(this.apiUrl, {params: params});
  }

  public getFullInfo(ticketId: string): Observable<TicketFullinfo> {

    return this.httpClient.get<TicketFullinfo>(this.apiUrl + `/${ticketId}`);
  }

  public create(ticket: TicketCreate): Observable<TicketShortinfo> {

    return this.httpClient.post<TicketShortinfo>(this.apiUrl, ticket);
  }
}
