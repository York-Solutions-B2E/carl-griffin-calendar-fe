export interface Event {
  id?: number,
  userID: number,
  invitees:{
    userID?: number,
    accepted: boolean,
  }[],
  date: Date,
  title: string,
  note: string,
}
