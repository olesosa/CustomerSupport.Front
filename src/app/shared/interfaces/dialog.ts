import {Message} from "./message";
import {TicketFullinfo} from "./ticket-fullinfo";
import {DialogTicket} from "./dialog-ticket";

export interface Dialog {
  id:string
  messages: Message[]
  ticket: DialogTicket
}
