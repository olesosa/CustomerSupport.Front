export interface Message {
  id: string,
  userId: string,
  userName: string,
  text: string,
  attachmentIds: string[]
  whenSended: Date
}
