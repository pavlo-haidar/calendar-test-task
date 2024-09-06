import { ICurrentDay } from "../models/current-day.model";

export function getCurrentDay(): ICurrentDay {
  const currentDate = new Date();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dayName = daysOfWeek[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  return {
    dayName,
    dayOfMonth
  };
}