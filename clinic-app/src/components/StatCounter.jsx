import React, { useState, useEffect } from 'react';

const StatCounter = ({ targetValue, duration = 1000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // If the value is 0 or not a number, don't animate
    const target = Number(targetValue);
    if (isNaN(target) || target === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    // Calculate speed based on target value to ensure it finishes within duration frame
    const stepTime = Math.max(Math.floor(duration / target), 15);
    
    const timer = setInterval(() => {
      start += Math.ceil(target / (duration / stepTime));
      
      if (start >= target) {
        clearInterval(timer);
        setCount(target); // Force clean drop directly on target number
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [targetValue, duration]);

  return <span>{count}</span>;
};

export default StatCounter;