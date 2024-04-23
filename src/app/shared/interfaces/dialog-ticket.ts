import {RequestTypes} from "../enums/request-types";

export interface DialogTicket {
  id: string
  customerId: string
  adminId: string
  number: number
  request: RequestTypes
  topic: string
}
