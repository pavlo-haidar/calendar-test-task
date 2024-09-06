export function isPastEvent(endDate: string) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const [endHour, endMinute] = endDate.split(':').map(Number);

    const eventEndTime = endHour * 60 + endMinute;

    return currentTime > eventEndTime; // Check if current time is past the event end time
}