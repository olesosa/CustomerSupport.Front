import {TicketShortinfo} from "./ticket-shortinfo";

export interface PagedResponse {
  data: TicketShortinfo[];
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}
