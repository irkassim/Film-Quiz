import React from 'react';
import { useEffect, useState } from 'react';

//styles
import './Timer.css';

export default function Timer({
  newQuestions,
  setShowResults,
  remainingTime,
  setRemainingTime,
  interrupt,
  setInteruption,
  difficultylevel,
}) {
  //const [remainingTime, setRemainingTime] = useState(10);

  useEffect(() => {
    if (remainingTime) {
      let time = remainingTime;
      const intervalId = setInterval(() => {
        time--;
        setRemainingTime(time);
        if (time === 0) {
          setInteruption(true);
          clearInterval(intervalId);
          setShowResults(true);
        }
      }, 1000);
    }
  }, [newQuestions, difficultylevel]);

  return (
    <div className="timer">
      {remainingTime !== 0 && (
        <span>
          <h2>Time Left:</h2>

          <h2 className="counter">{remainingTime}</h2>
        </span>
      )}

      {remainingTime === 0 && <h2 className="timeup">Time is Up!!!</h2>}
    </div>
  );
}
