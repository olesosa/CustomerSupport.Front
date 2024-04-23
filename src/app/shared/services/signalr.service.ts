import {Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr";
import {Observable, Subject} from "rxjs";
import {ChatMessage} from "../interfaces/chat-message";
import {HttpClient} from "@angular/common/http";
import {IHttpConnectionOptions} from "@microsoft/signalr";
import {TokenService} from "./token.service";
import {Message} from "../interfaces/message";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private readonly apiUrl = 'https://localhost:7100'
  private hubConnection!: signalR.HubConnection;
  private newMessage$ = new Subject<Message>()

  constructor(private readonly http: HttpClient,
              private readonly tokenService: TokenService) {

    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return tokenService.getToken().token
      }
    };

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.apiUrl}/Messages`, options)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.startConnection();
    this.addReceiveMessageListener();
  }

  private startConnection(): void {
    this.hubConnection.start()
      .then(() => console.log('--Connection start'))
      .catch(err => console.log(err));
  }

  private addReceiveMessageListener(): void {
    this.hubConnection.on('ReceiveMessage',
      (text: string, userName: string, dialogId, userId: string, attachments: string[]) => {
        const message: Message = {
          text: text,
          userName: userName,
          dialogId: dialogId,
          userId: userId,
          whenSended: new Date(),
          attachments: attachments
        }

        this.newMessage$.next(message)
      });
  }

  public getNewMessage(): Observable<Message> {
    return this.newMessage$.asObservable();
  }

  public sendMessage(message: ChatMessage, files: File[]) : Observable<Message> {

    const formData = new FormData()

    for (let file of files) {
      formData.append('files', file)
    }

    formData.append("text", message.text)

    return this.http.post<Message>(`${this.apiUrl}/api/Messages/${message.dialogId}`, formData)
  }

}
