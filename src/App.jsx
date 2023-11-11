// App.js
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Top from "./components/Top";
import Question from "./components/Question";
import Options from "./components/Options";
import quizzes from "./components/QuizData";
import AnswerDiv from "./components/AnswerDiv";
import Score from "./components/Score";

function App() {
  const currIndex = parseInt(localStorage.getItem("currQuestion"), 10) ||0;
  const [currQuestion, setCurrQuestion] = useState(currIndex);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const currIndex = parseInt(localStorage.getItem("currQuestion"), 10);
    setCurrQuestion(currIndex);
  }, []);

  useEffect(() => {
    localStorage.setItem("currQuestion", currQuestion);
  }, [currQuestion]);

  const handleCheck = () => {
    // Toggle the visibility of the answer div
    setShowAnswer((prevShowAnswer) => !prevShowAnswer);
  };

  const handleFinish = () => {
    setCurrQuestion(0);
    setScore(0);
    localStorage.removeItem("flaggedQuestions");
  };
  return (
    <Container className="my-3">
      <Row>
        <Col>
          <Top setCurrQuestion={setCurrQuestion} currQuestion={currQuestion}  totalQuiz={quizzes.length} />
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Question
            qNo={quizzes[currQuestion].questionNo}
            text={quizzes[currQuestion].question}
          />
        </Col>
        <Col>
          <Button variant="success" onClick={handleCheck}>
            Check
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Options
            quizz={quizzes[currQuestion]}
            setCurrQuestion={setCurrQuestion}
            setScore={setScore}
            setShowAnswer={setShowAnswer}
            totalQuiz={quizzes.length}
          />
          <AnswerDiv quizz={quizzes[currQuestion]} showAnswer={showAnswer} />
        </Col>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>
                <Score score={score} />
              </Card.Title>
              <Card.Text>
                <p>Current Question/Total Questons</p>
                <h4>
                  {currQuestion + 1}/{quizzes.length}
                </h4>
              </Card.Text>
              <Button variant="primary" onClick={handleFinish}>
                Finish
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
