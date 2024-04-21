import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly apiUrl = environment.apiAddress + '/Messages'

  constructor(private readonly http: HttpClient) {
  }

  public readMessages(dialogId: string) {

    return this.http.patch(`${this.apiUrl}/${dialogId}`, {})
  }
}
