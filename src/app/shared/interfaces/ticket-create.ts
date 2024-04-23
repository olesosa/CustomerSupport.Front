import {RequestTypes} from "../enums/request-types";

export interface TicketCreate {
  requestType: RequestTypes
  topic: string
  description: string
}
