export interface Message {
  dialogId: string
  userId: string
  userName: string
  text: string
  whenSended: Date
  attachments: string[]
}
