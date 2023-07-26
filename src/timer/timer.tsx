import { useState } from "react";

function Timer() {
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleStartTimer = () => {
    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  const handleStopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  const handleResetTimer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setTimer(0);
    }
  };

  return (
    <div>
      <p data-testid="data-timer-text">{timer}</p>
      <div>
        <button onClick={handleStartTimer}>시작</button>
        <button onClick={handleStopTimer}>일시정지</button>
        <button onClick={handleResetTimer}>재설정</button>
      </div>
    </div>
  );
}
export default Timer;
