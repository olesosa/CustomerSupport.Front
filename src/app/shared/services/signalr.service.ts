import {Injectable} from '@angular/core';
import * as signalR from "@microsoft/signalr";
import {catchError, Observable, of, Subject} from "rxjs";
import {ChatMessage} from "../interfaces/chat-message";
import {HttpClient} from "@angular/common/http";
import {IHttpConnectionOptions} from "@microsoft/signalr";
import {TokenService} from "./token.service";
import {sendMessage} from "@microsoft/signalr/dist/esm/Utils";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private readonly apiUrl = 'https://localhost:7100'
  private hubConnection!: signalR.HubConnection;

  constructor(private readonly http: HttpClient,
              private readonly tokenService: TokenService) {

    const options: IHttpConnectionOptions = {
      accessTokenFactory: () => {
        return tokenService.getToken().token
      }
    };

    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${this.apiUrl}/Hubs`, options)
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
    this.hubConnection.on('ReceiveMessage', (res, test) => {
      console.log(res, test);
    });
  }

  public sendMessage(message: ChatMessage) {

    console.log('--sendMessage')
    return this.http.post('https://localhost:7100/api/Hubs', message)
  }

}
