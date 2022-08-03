import React, { useEffect, useState } from 'react';
import Showresultsmodal from '../../components/Showresultsmodal';
import useFetch from '../../hooks/useFetch';
import Pagination from '../../components/Pagination';
import Timer from '../../components/Timer';

//styles
import './Questions.css';

function Question({ question, answer, onChange, newQuestions }) {
  //handles user's choice of answers
  return (
    <div className="questionList" key={question.id}>
      {/* displays the question number*/}
      <div>
        <span className="qnum">
          <h3 style={{ display: 'inline' }}>
            ({newQuestions.indexOf(question) + 1})
          </h3>
        </span>

        {/* Displays the question*/}

        <p className="question">{question.question}</p>
      </div>
      <ul className="options">
        {question.option.map((option, i) => (
          <>
            <li>
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
            </li>
          </>
        ))}
      </ul>
      <br />

      {<p style={{ display: 'none' }}>{question.correctAnswer}</p>}
    </div>
  );
}

export default function Questions() {
  const [questions, setQuestions] = useState(null);
  const [option, setOption] = useState(null);
  //const [qnumber, setQnumber] = useState(0);

  const [url, setUrl] = useState('http://localhost:3000/data');
  const { data, ispending, error } = useFetch(url);

  //this holds indices of the choosen answers by the user
  //also displays results & Timer, & Difficulty Level
  const [userAnswers, setUserAnswers] = useState([]);
  const [userScore, setUserScore] = useState(null);
  const [showresults, setShowResults] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [difficultylevel, setDifficultyLevel] = useState(null);

  //Interruption when time is up
  const [interrupt, setInteruption] = useState(false);

  //Pagination states
  const [setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);
  //setQuestionsPerPage not being used

  //Shuffledstates
  const [newQuestions, setNewQuestions] = useState([]);

  useEffect(() => {
    if (data) {
      setQuestions(data);
      setOption([]);
    }
  }, [data]);

  //Shuffling questions
  useEffect(() => {
    if (questions) {
      const temp = getShuffledArr(questions);
      const secondtemp = temp.slice(1, 11);
      setNewQuestions(secondtemp);
    }
    if (difficultylevel) {
      if (difficultylevel === 'Easy') {
        let time = 170;
        setRemainingTime(time);
      } else if (difficultylevel === 'Hard') {
        let time = 100;
        setRemainingTime(time);
      }
    }
  }, [questions, data, difficultylevel]);

  /*
  if (difficultylevel === 'Easy') {
    let time = 100;
    setRemainingTime(time);
  } else if (difficultylevel === 'Hard') {
    let time = 70;
    setRemainingTime(time);
  }*/

  //Submits questions and show resutls
  const handleSubmit = () => {
    let score = 0;
    let wrong = 0;
    if (newQuestions) {
      userAnswers.map((ans, i) => {
        let yourAnswer = newQuestions[i].option[ans];
        if (yourAnswer === newQuestions[i].correctAnswer) {
          score++;
          setUserScore(score * 10);
          console.log('correct', score, yourAnswer);
          return userScore;
        } else {
          wrong++;
          console.log('wrong', wrong, yourAnswer);
          return wrong;
        }
      });
    }

    setShowResults(true);
  };

  //Get Current Questions for Pagination
  //const indexOfLastQuestion = currentPage * questionsPerPage;
  //const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Shuffling questions function
  const getShuffledArr = (arr) => {
    if (arr != null) {
      const newArr = arr.slice();
      for (let i = newArr.length - 1; i > 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
      }
      return newArr;
    }
  };

  //mapping through and outputing the questions
  return (
    <div>
      <>
        {ispending && <h1 style={{ color: 'red' }}>Loading Questions.....</h1>}
        {error && <h1 style={{ color: 'red' }}>{error}</h1>}
      </>

      {!remainingTime && (
        <div className="difficult">
          <span className="words">Select Difficulty Level:</span>
          <select
            onChange={(e) => setDifficultyLevel(e.target.value)}
            className="selection"
          >
            <option value="dummy">----</option>
            <option value="Easy">Easy</option>
            <option value="Hard">Hard</option>
          </select>
        </div>
      )}

      {newQuestions && (
        <Timer
          newQuestions={newQuestions}
          unfinished={handleSubmit}
          setShowResults={setShowResults}
          remainingTime={remainingTime}
          setRemainingTime={setRemainingTime}
          interrupt={interrupt}
          setInteruption={setInteruption}
          difficultylevel={difficultylevel}
        />
      )}

      <div>
        <span>
          {remainingTime &&
            newQuestions.map((question, i) => (
              <Question
                newQuestions={newQuestions}
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
        </span>

        {showresults && (
          <Showresultsmodal
            score={userScore}
            setShowResults={setShowResults}
            remainingTime={remainingTime}
            setInteruption={setInteruption}
            interrupt={interrupt}
            setUserScore={setUserScore}
            handleSubmit={handleSubmit}
          />
        )}

        {newQuestions && (
          <Pagination
            questionsPerPage={questionsPerPage}
            totalQuestions={newQuestions.length}
            paginate={paginate}
          />
        )}

        {difficultylevel && (
          <button className="submitquiz" onClick={handleSubmit}>
            submit Quiz
          </button>
        )}
      </div>
    </div>
  );
}
