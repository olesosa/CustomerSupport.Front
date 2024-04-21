import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {DialogShortinfo} from "../interfaces/dialog-shortinfo";
import {DialogFilter} from "../interfaces/dialog-filter";
import {Dialog} from "../interfaces/dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private apiUrl: string = `${environment.apiAddress}/Dialogs`;

  constructor(private readonly http: HttpClient) {
  }

  public getAll(filter: DialogFilter): Observable<DialogShortinfo[]> {

    let params = new HttpParams()

    if (filter.dateTime != null) {
      params = params.set('DateTime', filter.dateTime)
    }

    if (filter.sortDir != null) {
      params = params.set('SortDir', filter.sortDir);
    } else {
      params = params.set('SortDir', 'asc');
    }

    return this.http.get<DialogShortinfo[]>(this.apiUrl, {params: params});
  }

  public create(ticketId: string):Observable<string>{

    return this.http.post<string>(`${this.apiUrl}/${ticketId}`, {})
  }

  public get(dialogId: string): Observable<Dialog> {

    return this.http.get<Dialog>(`${this.apiUrl}/${dialogId}`)
  }
}
