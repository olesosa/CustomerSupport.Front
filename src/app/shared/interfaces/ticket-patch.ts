export interface TicketPatch {
  id: string
  ticketId: string
  IsAssigned: boolean
  IsSolved: boolean
  IsClosed: boolean
  HasReceived?: boolean
}
