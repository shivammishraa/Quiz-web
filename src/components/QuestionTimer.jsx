// src/components/QuestionTimer.jsx

import React, { useState, useEffect } from 'react';

const QuestionTimer = ({ duration, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else {
      onTimeUp();
    }
  }, [timeLeft, onTimeUp]);

  return (
    <div className="timer">
      <p>Time left: {timeLeft}s</p>
    </div>
  );
};

export default QuestionTimer;
