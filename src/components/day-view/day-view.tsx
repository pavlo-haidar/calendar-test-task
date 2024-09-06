import { useEffect, useState } from 'react';
import classnames from 'classnames';

import { calculateEventPosition } from '../../utils/calculate-event-position';
import { generateHours } from '../../utils/generate-hours';
import { IEvent } from '../../models/event.model';
import { convertTo12Hour, formatCurrentTime, formatHourTo12Hour } from '../../utils/format-hours';
import { getCurrentDay } from '../../utils/get-current-day';
import { ICurrentDay } from '../../models/current-day.model';
import { isPastEvent } from '../../utils/events';
import { IEventPosition } from '../../models/event-postition.model';
import EventDetails from '../event-details/event-details';

import styles from './day-view.module.scss';

const BOX_HEIGHT = 71;
const HEADER_HEIGHT = 51;

const EVENTS: IEvent[] = [
  {
    title: "Follow-up call with Amir",
    startDate: "09:00",
    endDate: "10:30",
    date: '8/1/2024',
    author: 'robert@nuovadigital.com',
    participants: [
      {
        name: 'David Park',
        approved: false,
      },
      {
        name: 'Amir Gholami',
        approved: true,
      },
      {
        name: 'David Park',
        approved: true,
      },
      {
        name: 'Amir Gholami',
        approved: true,
      },
    ],
    alert: {
      message: 'amir@narada.ai notetaker has a summary and notes available for this meeting',
    }
  },
  {
    title: "Follow-up call with Toni",
    startDate: "12:00",
    endDate: "14:30",
    date: '11/11/2024',
    author: 'amir@nuovadigital.com',
    participants: [
      {
        name: 'David Park',
        approved: false,
      },
      {
        name: 'Amir Gholami',
        approved: false,
      },
      {
        name: 'David Park',
        approved: true,
      },
      {
        name: 'Amir Gholami',
        approved: false,
      },
    ],
    alert: {
      message: 'toni@narada.ai notetaker has a summary and notes available for this meeting',
    }
  },
  {
    title: "Follow-up call with Adam",
    startDate: "18:45",
    endDate: "21:15",
    date: '9/4/2024',
    author: 'toni@nuovadigital.com',
    participants: [
      {
        name: 'David Park',
        approved: true,
      },
      {
        name: 'Amir Gholami',
        approved: false,
      },
      {
        name: 'David Park',
        approved: true,
      },
      {
        name: 'Amir Gholami',
        approved: false,
      },
      {
        name: 'Amir Gholami',
        approved: true,
      },
      {
        name: 'Amir Gholami',
        approved: false,
      },
    ],
    alert: {
      message: 'adam@narada.ai notetaker has a summary and notes available for this meeting',
    }
  },
]



function DayView() {
  const hours: number[] = generateHours();
  const [linePosition, setLinePosition] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<IEvent>();

  const currentDay: ICurrentDay = getCurrentDay();

  useEffect(() => {
    const updateLinePosition = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      const formattedTime = formatCurrentTime();
      setCurrentTime(formattedTime);

      const newLinePosition = (currentHour * 60 + currentMinute) * (BOX_HEIGHT / 60);
      setLinePosition(newLinePosition);
    };

    updateLinePosition();

    const interval = setInterval(updateLinePosition, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={styles.dayWrapper}>
      <div className={styles.wrapper}>
        <div className={styles.dayBox}>
          <div className={styles.hoursWrapper}>
            <div>
              <div className={styles.emptyBox}></div>
              {hours.map((hour: number) => <div key={hour} className={styles.hourBox}>{formatHourTo12Hour(hour)}</div>)}
            </div>
          </div>
          <div className={styles.hourContent}>
            <div className={styles.hourContentTitle}>
              <p className={styles.hourContentDay}>{currentDay.dayName}</p>
              <p className={styles.hourContentDayNumber}>{currentDay.dayOfMonth}</p>
            </div>
            {hours.map((hour: number) => <div key={hour} className={styles.hourBoxContent} />)}
            <div className={styles.line} style={{ top: `${linePosition + HEADER_HEIGHT}px` }}>
              <div className={styles.currentTime}>{currentTime}</div>
            </div>
            {EVENTS.map((event: IEvent) => {
              const { topOffset, height }: IEventPosition = calculateEventPosition(event, BOX_HEIGHT);
              const isActiveEvent =  linePosition > topOffset && linePosition < topOffset + height;

              return <div
                key={event.title}
                onClick={() => setSelectedEvent(event)}
                className={classnames([
                  styles.eventBox,
                  !isPastEvent(event.endDate) && styles.pastEvent,
                  isActiveEvent && styles.activeEvent
                ])}
                style={{ top: `${topOffset + HEADER_HEIGHT}px`, height: `${height}px` }}
              >
                <p className={styles.eventName}>{event.title}</p>
                <p className={styles.eventDuration}>{convertTo12Hour(event.startDate)} - {convertTo12Hour(event.endDate)}</p>
              </div>
            })}
          </div>
        </div>
      </div>
      <EventDetails event={selectedEvent} />
    </div>
  )
}

export default DayView;
