import React, { useState } from 'react';

//styles
import './Showresultsmodal.css';

export default function Showresultsmodal({ score, setShowResults }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h1>Your Score: {score}%</h1>
        {score < 50 && <h2>your film knowledge sucks 😁,</h2>}

        {score > 50 && score < 81 && (
          <h2>Great job, you are a film Ninja 👌🙌,</h2>
        )}
        {score > 82 && (
          <h2>
            Excellent, your film knowledge is impressive. You are officially a
            Film
            <span>
              <strong>Addict,</strong>
            </span>
            diagnosed by IFMA. Congrats you have been inducted into the IFMA
            film Hall of Fame 😮💥✨🙌,
          </h2>
        )}

        <button
          className="closemodal"
          onClick={() => {
            setShowResults(false);
          }}
        >
          ok
        </button>
      </div>
    </div>
  );
}
