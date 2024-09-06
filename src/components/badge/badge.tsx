import styles from './badge.module.scss';

interface IBadgeProps {
  text: string;
  Icon: any
}

function Badge({ Icon, text }: IBadgeProps) {
  return  (
    <div className={styles.badge}>
      <Icon />
      <p>{text}</p>
    </div>
  )
}

export default Badge;
