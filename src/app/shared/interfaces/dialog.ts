import {ChatMessage} from "./chat-message";
import {Message} from "./message";
import {TicketFullinfo} from "./ticket-fullinfo";

export interface Dialog {
  id:string;
  messages: Message[];
  ticket: TicketFullinfo
}
