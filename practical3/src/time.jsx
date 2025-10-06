import React, { useState, useEffect } from 'react';

const Time = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to CHARUSAT!!!</h1>
      <h3>Current time is: {time.toLocaleTimeString()}</h3>
      <h3>Current date is: {time.toLocaleDateString()}</h3>
    </div>
  );
};

export default Time;
