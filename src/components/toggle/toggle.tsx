import classNames from 'classnames';
import { useState } from 'react';

import styles from './toggle.module.scss';


interface IToggleProps {
  initialState: boolean;
  onToggle: (value: boolean) => void;
}

function Toggle({ initialState, onToggle }: IToggleProps) {
  const [isToggled, setIsToggled] = useState<boolean>(initialState);

  const handleToggle = () => {
    const newState = !isToggled;
    setIsToggled(newState);
    onToggle?.(newState);
  };

  return  (
    <div className={classNames([styles.toggle, isToggled && styles.toggled])} onClick={handleToggle}>
      <div className={styles.toggleHandle}></div>
    </div>
  )
}

export default Toggle;
