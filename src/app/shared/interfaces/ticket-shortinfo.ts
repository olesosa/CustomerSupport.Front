import {RequestTypes} from "../enums/request-types";

export interface TicketShortinfo {
  id:string;
  number:number;
  requestType:RequestTypes;
  topic:string;
}
