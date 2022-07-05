import React, { useEffect, useState } from 'react';
import Showresultsmodal from '../../components/Showresultsmodal';
import useFetch from '../../hooks/useFetch';

//styles
import './Questions.css';

function Question({ question, answer, onChange }) {
  //handles user's choice of answers
  return (
    <div className="questionList" key={question.id}>
      <>
        <span>{question.question}</span>
        <br />
        {question.option.map((option, i) => (
          <>
            {/* 3 radio buttons for the possible answers*/}
            <input
              type="radio"
              name="question"
              checked={answer === i}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange(i);
                }
              }}
            />
            {option}
          </>
        ))}
        <>
          <br />
        </>
        {question.correctAnswer}
      </>
    </div>
  );
}

export default function Questions() {
  const [questions, setQuestions] = useState(null);
  const [url, setUrl] = useState('http://localhost:3000/data');
  const { data, ispending, error } = useFetch(url);

  //this holds indices of the choosen answers by the user
  //also display results
  const [userAnswers, setUserAnswers] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [showresults, setShowResults] = useState(false);

  useEffect(() => {
    if (data) {
      setQuestions(data);
    }
  }, [data]);

  console.log(ispending);

  /*
  useEffect(() => {
    if (questions) {
      setUserAnswers(
        questions.map(() => {
          return null;
        })
      );
    }
  }, [questions]);
  */

  const handleSubmit = () => {
    let score = 0;
    userAnswers.map((ans, i) => {
      let yourAnswer = questions[i].option[ans];
      if (yourAnswer === questions[i].correctAnswer) {
        score++;
        setUserScore(score * 20);
        console.log('correct', score);
        return userScore;
      } else {
        console.log('wrong');
      }
    });

    setShowResults(true);
  };

  console.log(userAnswers);
  //mapping through and outputing the questions
  return (
    <div>
      <>
        {ispending && <h1 style={{ color: 'red' }}>Loading Questions.....</h1>}
        {error && <h1 style={{ color: 'red' }}>{error}</h1>}
      </>
      <div>
        {questions &&
          questions.map((question, i) => (
            <Question
              question={question}
              answer={userAnswers[i]}
              ispending={ispending}
              onChange={(answer) => {
                let newAnswers = [...userAnswers];
                newAnswers[i] = answer;
                setUserAnswers(newAnswers);
                console.log(newAnswers);
              }}
            />
          ))}
        <br />
        {showresults && (
          <Showresultsmodal score={userScore} setShowResults={setShowResults} />
        )}

        <button className="submitquiz" onClick={handleSubmit}>
          submit Quiz
        </button>
      </div>
    </div>
  );
}
