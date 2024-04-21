import {RequestTypes} from "../enums/request-types";

export interface TicketFullinfo {
  id: string;
  customerId: string;
  email: string;
  number: number;
  requestType: RequestTypes;
  topic: string;
  description: string;
  attachmentIds: string[];
  isAssigned: boolean
  isSolved: boolean;
  isClosed: boolean;
  creationTime: Date;
}
