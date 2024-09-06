import { IEventPosition } from "../models/event-postition.model";
import { IEvent } from "../models/event.model";

export const calculateEventPosition = (event: IEvent, hourBoxHeight: number): IEventPosition => {
  const { startDate, endDate } = event;

  const [startHour, startMinutes] = startDate.split(':');
  const [endHour, endMinutes] = endDate.split(':');

  const totalStartMinutes = Number(startHour) * 60 + Number(startMinutes);
  const totalEndMinutes = Number(endHour) * 60 + Number(endMinutes);

  const topOffset = hourBoxHeight * (totalStartMinutes / 60);
  const height = hourBoxHeight * ((totalEndMinutes - totalStartMinutes) / 60);

  return {
    topOffset,
    height,
  }
};
