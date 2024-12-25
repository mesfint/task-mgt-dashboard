import React, { useState } from "react";

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => prev - 1);
  const reset = () => setCount(0);

  return (
    <div>
      <h2>Counter App</h2>
      <p data-testid="counter-value">Count: {count}</p>
      <button data-testid="increment-btn" onClick={increment}>
        Increment
      </button>
      <button data-testid="decrement-btn" onClick={decrement}>
        Decrement
      </button>
      <button data-testid="reset-btn" onClick={reset}>
        Reset
      </button>
    </div>
  );
};

export default Counter;
