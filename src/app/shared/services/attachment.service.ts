import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  private readonly apiUrl = environment.apiAddress + '/Attachments'

  constructor(private readonly http: HttpClient) {
  }

  public postTicket(files: File[], ticketId: string): Observable<string> {

    const formData = new FormData()

    for (let file of files) {
      formData.append('files', file)
    }

    return this.http.post<string>(this.apiUrl + `/ticket/${ticketId}`, formData)
  }

  public getTicket(attachmentId: string) {

    return this.http.get(this.apiUrl + `/ticket/${attachmentId}`, {responseType: 'blob'});
  }

  public postMessage(files: File[], messageId: string): Observable<string> {

    const formData = new FormData()

    for (let file of files) {
      formData.append('files', file)
    }

    return this.http.post<string>(this.apiUrl + `/message/${messageId}`, formData)
  }

  public getMessage(messageId: string) {

    return this.http.get(this.apiUrl + `/message/${messageId}`, {responseType: 'blob'});
  }
}
