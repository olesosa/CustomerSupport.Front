import {RequestTypes} from "../enums/request-types";

export interface TicketFilter {
  skip: number;
  take: number;

  requestType?: RequestTypes;
  isAssigned?: boolean;
  isSolved?: boolean;
  isClosed?: boolean;
  userId? : string

  sortDir?: string;
  number?: boolean;
}
