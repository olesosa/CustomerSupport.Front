export interface TicketFullinfo {
  id:string;
  email: string;
  number:number;
  requestType: string;
  topic: string;
  description: string;
  attachmentIds:string[];
  isAssigned:boolean
  isSolved:boolean;
  isClosed:boolean;
  creationTime: Date;
}
