import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {TicketShortinfo} from "../interfaces/ticket-shortinfo";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {TicketFullinfo} from "../interfaces/ticket-fullinfo";
import {TicketCreate} from "../interfaces/ticket-create";
import {TicketFilter} from "../interfaces/ticket-filter";
import {PagedResponse} from "../interfaces/paged-response";
import {TicketPatch} from "../interfaces/ticket-patch";
import {Statistic} from "../interfaces/statistic";
import {StatisticFilter} from "../interfaces/statistic-filter";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  private apiUrl: string = `${environment.apiAddress}/Tickets`;

  constructor(private readonly http: HttpClient) {
  }

  public getAll(filter: TicketFilter): Observable<PagedResponse<TicketShortinfo[]>> {

    let params = new HttpParams()
      .set('Skip', filter.skip)
      .set('Take', filter.take);

    if (filter.requestType != null) {
      params = params.set('RequestType', filter.requestType);
    }
    if (filter.isAssigned != null) {
      params = params.set('IsAssigned', filter.isAssigned);
    }
    if (filter.isSolved != null) {
      params = params.set('IsSolved', filter.isSolved);
    }
    if (filter.isClosed != null) {
      params = params.set('IsClosed', filter.isClosed);
    }
    if (filter.userId != null) {
      params = params.set('UserId', filter.userId)
    }
    if (filter.sortDir != null) {
      params = params.set('SortDir', filter.sortDir);
    } else {
      params = params.set('SortDir', 'asc');
    }
    if (filter.number != undefined) {
      params = params.set('Number', filter.number);
    }

    return this.http.get<PagedResponse<TicketShortinfo[]>>(this.apiUrl, {params: params});
  }

  public getFullInfo(number: string): Observable<TicketFullinfo> {

    return this.http.get<TicketFullinfo>(this.apiUrl + `/${number}`);
  }

  public create(ticket: TicketCreate): Observable<TicketShortinfo> {

    return this.http.post<TicketShortinfo>(this.apiUrl, ticket);
  }

  public getStatistic(filter: StatisticFilter): Observable<Statistic[]> {

    let params = new HttpParams()

    if (filter.requestType != null) {
      params = params.set('RequestType', filter.requestType);
    }
    if (filter.isAssigned != null) {
      params = params.set('IsAssigned', filter.isAssigned);
    }
    if (filter.isSolved != null) {
      params = params.set('IsSolved', filter.isSolved);
    }
    if (filter.isClosed != null) {
      params = params.set('IsClosed', filter.isClosed);
    }
    if (filter.userId != null) {
      params = params.set('UserId', filter.userId)
    }

    return this.http.get<Statistic[]>(this.apiUrl + '/Statistic', {params: params})
  }

  public assign(ticketId: string): Observable<TicketPatch> {

    return this.http.patch<TicketPatch>(this.apiUrl + `/Assign/${ticketId}`, {})
  }

  public reassign(ticketId: string, adminId: string): Observable<TicketPatch> {

    return this.http.patch<TicketPatch>(this.apiUrl + '/Reassign', {ticketId, adminId})
  }

  public receive(number: string): Observable<TicketPatch> {

    return this.http.patch<TicketPatch>(this.apiUrl + `/Receive/${number}`, {})
  }

  public update(ticketId: string, isSolved: boolean, isClosed: boolean): Observable<TicketPatch> {

    return this.http.put<TicketPatch>(this.apiUrl + `/${ticketId}`, {isSolved, isClosed})
  }
}
