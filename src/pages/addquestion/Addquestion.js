import React, { useRef } from 'react';
import { useState } from 'react';
import useFetch from '../../hooks/useFetch';

import './addquestion.css';

//import Questions from '../questions/Questions';

export default function Addquestion() {
  const [question, setQuestion] = useState();
  const [option, setOption] = useState([]);
  const [newOption, setNewOption] = useState();
  const [correctAnswer, setCorrectAnswer] = useState();
  const optionsInput = useRef(null);
  const { postData } = useFetch('http://localhost:3000/data', 'POST');

  const handleSubmit = (e) => {
    e.preventDefault();

    postData({ question, option, correctAnswer });
    console.log(question, option, correctAnswer);
    resetFields();
  };

  const addOptions = (e) => {
    e.preventDefault();
    const ops = newOption.trim();

    if (ops && !option.includes(ops)) {
      setOption((prevOption) => [...prevOption, ops]);
    }
    setNewOption('');
    optionsInput.current.focus();
  };

  const resetFields = () => {
    setQuestion('');
    setCorrectAnswer('');
    setOption('');
  };

  return (
    <div className="create">
      <h3>Add Questions</h3>

      <form onSubmit={handleSubmit}>
        <>
          <span>Question:</span>
          <textarea
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
            value={question}
            required
          />
        </>
        <br />
        <>
          <span>Options:</span>
          <div className="options">
            <input
              type="text"
              onChange={(e) => setNewOption(e.target.value)}
              value={newOption}
              ref={optionsInput}
            />
            <button className="btn" onClick={addOptions}>
              add
            </button>
          </div>
        </>
        <br />

        <>
          <span>Correct Answer:</span>
          <input
            type="text"
            onChange={(e) => setCorrectAnswer(e.target.value)}
            value={correctAnswer}
            required
          />
        </>
        <br />

        <button className="btn">submit</button>
      </form>
    </div>
  );
}
