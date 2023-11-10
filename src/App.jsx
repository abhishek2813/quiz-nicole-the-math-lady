// App.js
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import Top from "./components/Top";
import Question from "./components/Question";
import Options from "./components/Options";
import quizzes from "./components/QuizData";
import AnswerDiv from "./components/AnswerDiv";
import Score from "./components/Score";

function App() {
  const [currQuestion, setCurrQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0)

  useEffect(() => {
    const currIndex = localStorage.getItem("currQuestion");
    setCurrQuestion(parseInt(currIndex, 10) || 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("currQuestion", currQuestion);
  }, [currQuestion]);
   console.log(score);

  return (
    <Container className="my-3">
      <Score score={score} />
      <Top setCurrQuestion={setCurrQuestion} currQuestion={currQuestion} setShowAnswer={setShowAnswer} />
      <Question
        qNo={quizzes[currQuestion].questionNo}
        text={quizzes[currQuestion].question}
      />
      <Options quizz={quizzes[currQuestion]} setCurrQuestion={setCurrQuestion} setShowAnswer={setShowAnswer} setScore={setScore} />
      <AnswerDiv quizz={quizzes[currQuestion]} showAnswer={showAnswer} />
    </Container>
  );
}

export default App;
