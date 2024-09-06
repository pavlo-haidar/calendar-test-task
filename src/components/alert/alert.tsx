import { IAlert } from '../../models/event.model';
import { ReactComponent as InfoCircle } from '../../assets/icons/info-circle.svg';

import styles from './alert.module.scss';

interface IAlertProps {
  alert: IAlert,
  requestNotes: () => void;
}

function Alert({ alert, requestNotes }: IAlertProps) {
  return  (
    <div className={styles.alert}>
      <div className={styles.alertMessageWrapper}>
        <InfoCircle />
        <p className={styles.alertMessage}>{alert.message}</p>
      </div>
      <button className={styles.alertAction} onClick={requestNotes}>Request notes</button>
    </div>
  )
}

export default Alert;
