import { IEvent } from '../../models/event.model';
import Alert from '../alert/alert';
import { convertTo12Hour } from '../../utils/format-hours';

import { ReactComponent as VectorIcon } from '../../assets/icons/vector.svg';
import { ReactComponent as GoogleMeetIcon } from '../../assets/icons/google-meet.svg';
import { ReactComponent as CopyIcon } from '../../assets/icons/copy.svg';
import { ReactComponent as ClockIcon } from '../../assets/icons/clock.svg';
import { ReactComponent as CalendarIcon } from '../../assets/icons/calendar-search.svg';
import { ReactComponent as ProfileUserIcon } from '../../assets/icons/profile-user.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/icons/arrow-right.svg';
import { ReactComponent as TickCircleIcon } from '../../assets/icons/tick-circle.svg';
import { ReactComponent as MinusCircleIcon } from '../../assets/icons/minus-cirlce.svg';

import Badge from '../badge/badge';
import Toggle from '../toggle/toggle';

import styles from './event-details.module.scss';

interface IEventDetailsProps {
  event?: IEvent;
}

function EventDetails({ event }: IEventDetailsProps) {

  const requestNotes = () => {
    // TODO
  }

  const toggleAutoJoin = () => {
    // TODO
  }

  if (!event) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <Alert alert={event.alert} requestNotes={requestNotes}/>
      <div className={styles.content}>
        <div className={styles.headerWrapper}>
          <p className={styles.eventName}>{event.title}</p>
          <button className={styles.headerButton}>
            <VectorIcon />
            <p>Add notetaker to meeting</p>
            </button>
        </div>
        <div className={styles.detailsCard}>
          <div className={styles.detailsHeader}>
            <div className={styles.detailsHeaderBox}>
              <GoogleMeetIcon />
              <p className={styles.detailsTitle}>Meeting Details</p>
            </div>
            <div className={styles.detailsHeaderBox}>
              <button className={styles.blueButton}>Go to meeting</button>
              <div className={styles.devider}></div>
              <CopyIcon className={styles.copyButton}/>
            </div>
          </div>
          <div className={styles.detailsContent}>
            <div className={styles.detailsContentRow}>
              <ClockIcon />
              <p>Thursday {event.date} ⋅ {convertTo12Hour(event.startDate)} – {convertTo12Hour(event.endDate)}</p>
            </div>
            <div className={styles.detailsContentRow}>
              <CalendarIcon />
              <p>From calendar: {event.author}</p>
            </div>
            <div className={styles.detailsContentRow}>
              <ProfileUserIcon />
              <div className={styles.detailsContentRowPeople}>
                {event.participants.map(person => {
                  const icon = person.approved ? TickCircleIcon : MinusCircleIcon;
                  return <Badge key={person.name} text={person.name} Icon={icon}/>
                })}
              </div>
            </div>
            <div className={styles.detailsContentJustify}>
              <div className={styles.detailsContentRow}>
                <ArrowRightIcon />
                <p>Allow Narada to auto-join meeting</p>
              </div>
              <Toggle initialState={true} onToggle={toggleAutoJoin} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
