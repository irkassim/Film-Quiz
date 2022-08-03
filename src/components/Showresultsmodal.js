import React, { useState } from 'react';

//styles
import './Showresultsmodal.css';

export default function Showresultsmodal({
  score,
  setShowResults,
  interrupt,
  setInteruption,
  handleSubmit,
}) {
  /*
  const[results,setResults]=useState(0);
  const resultsAnimation = () => {
    let i=0;
    setInterval(() => {
      i++;
      if (results === score) {
        setResults(i)
        clearInterval(resultsAnimation);
      } else {
        i++;
      }
    }, 20);
  };*/

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div>{score && <h1>Your Score: {score}%</h1>}</div>

        {score && score < 40 && (
          <h2>your film knowledge sucks 😁, you need to watch more movies</h2>
        )}

        {score && score === 50 && (
          <h2>you are Average, keep watching more movies</h2>
        )}

        {score && score > 55 && score < 61 && (
          <h2>Very Good, you are a film Ninja</h2>
        )}

        {score && score > 69 && score < 81 && (
          <h2>Great job, you are Almost There 👌🙌,</h2>
        )}

        {score && score > 82 && (
          <h3>
            Excellent, your film knowledge is impressive. You have been inducted
            into the IFMA Hall of Fame 😮💥✨🙌,
          </h3>
        )}

        {interrupt && (
          <h3>Time's up buddy, click ok to see your results. Thanks!</h3>
        )}

        <span>
          <button
            className="closemodal"
            onClick={() => {
              setShowResults(false);
              setInteruption(false);
              handleSubmit();
            }}
          >
            ok
          </button>
        </span>

        {score && (
          <span>
            <button className="exit">exit</button>
          </span>
        )}
      </div>
    </div>
  );
}
