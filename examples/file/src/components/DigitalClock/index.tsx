// https://codepen.io/gau/pen/LjQwGp
// http://www.bootstrapmb.com/item/7603/preview
import React, { useState, useEffect } from 'react';

import styles from './index.less';
import { getCurrentDate } from './helper';

const DigitalClock = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  function updateTime() {
    const { currentDate, currentTime } = getCurrentDate(Date.now());
    setTime(currentTime);
    setDate(currentDate);
  }

  useEffect(() => {
    updateTime();
    let timerID: any = setInterval(updateTime, 1000);
    return () => {
      clearInterval(timerID);
      timerID = null;
    };
  }, []);

  return (
    <div className={styles.clock}>
      <p className={styles.date}>{date}</p>
      <p className={styles.time}>{time}</p>
    </div>
  );
};

export default DigitalClock;
