export interface IEvent {
  title: string;
  startDate: string;
  endDate: string;
  alert: IAlert;
  author: string;
  participants: IParticipant[];
  date: string;
}

export interface IAlert {
  message: string;
}

export interface IParticipant {
  name: string;
  approved: boolean;
}
