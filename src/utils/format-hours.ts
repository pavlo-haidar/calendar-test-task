export function formatHourTo12Hour(hour: number): string {
  let period = hour >= 12 ? 'PM' : 'AM';
  let hour12 = hour % 12 || 12;

  return `${hour12} ${period}`;
}


export function formatCurrentTime() {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const formattedHour = currentHour % 12 || 12;
  const formattedMinute = currentMinute < 10 ? `0${currentMinute}` : currentMinute;

  return `${formattedHour}:${formattedMinute}`;
}

export function convertTo12Hour(time: string): string {
  let [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  return `${hours}:${minutes.toString().padStart(2, '0')} ${period}`;
}