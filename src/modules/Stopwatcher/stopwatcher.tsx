import { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
const StopWatcher = () => {
  const [timeOver, setTimeOver] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [labelShown, setLabelShown] = useState("00:00:00");
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const textBoxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textBoxRef.current != null) {
      textBoxRef.current.focus();
    }
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeElapsed(timeElapsed + 1);
        if (timeElapsed === timeOver) setIsTimeOver(true);
        setLabelShown(new Date(timeElapsed * 1000).toISOString().slice(11, 19));
      }, 1000);

      return () => {
        clearInterval(intervalRef.current);
      };
    }
  }, [timeElapsed, isRunning, timeOver]);

  const handleStart = () => {
    if (!isRunning) setIsRunning(true);
  };

  const handleStop = () => {
    if (isRunning) setIsRunning(false);
  };

  const handleRestart = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setIsTimeOver(false);
    setLabelShown("00:00:00");
  };

  return (
    <>
      <div className="flex-column d-flex justify-content-center">
        <div className="row">
          <div className="col-offset-lg-3 col-6">
            {isTimeOver && (
              <div className="alert alert-info">
                The time is up <br />
              </div>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <label>
              Insert the time when you want to be notified (seconds):
            </label>
            <input
              type="text"
              onChange={(e) => setTimeOver(parseInt(e.target.value))}
              className="form-control"
              ref={textBoxRef}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <label className="digital">{labelShown}</label>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-2">
            <button
              type="button"
              disabled={isRunning}
              onClick={() => handleStart()}
              className="btn btn-primary btn-lg"
            >
              Start
            </button>
          </div>
          <div className="col-lg-2">
            <button
              type="button"
              disabled={!isRunning}
              onClick={() => handleStop()}
              className="btn btn-info btn-lg"
            >
              Stop
            </button>
          </div>
          <div className="col-lg-2">
            <button
              type="button"
              disabled={timeElapsed === 0}
              onClick={() => handleRestart()}
              className="btn btn-danger btn-lg"
            >
              ReStart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StopWatcher;
