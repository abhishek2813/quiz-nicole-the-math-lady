// Top.js
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

function Top({ setCurrQuestion, currQuestion,totalQuiz }) {
  const [isFlagged, setIsFlagged] = useState(false);

  const handleFlag = () => {
    const flaggedQuestions =
      JSON.parse(localStorage.getItem("flaggedQuestions")) || [];

    if (!flaggedQuestions.includes(currQuestion)) {
      flaggedQuestions.push(currQuestion);
      setIsFlagged(true);
    }

    localStorage.setItem("flaggedQuestions", JSON.stringify(flaggedQuestions));
  };

  const handleBack = () => {
    const newCurrQuestion = Math.max(0, currQuestion - 1);
    setCurrQuestion(newCurrQuestion);
    localStorage.setItem("currQuestion", newCurrQuestion);
    updateFlaggedStatus(newCurrQuestion);
  };

  const handleNext = () => {
    setCurrQuestion(currQuestion + 1);
    localStorage.setItem("currQuestion", currQuestion + 1);
    updateFlaggedStatus(currQuestion + 1);
  };

  const updateFlaggedStatus = (questionIndex) => {
    const flaggedQuestions =
      JSON.parse(localStorage.getItem("flaggedQuestions")) || [];
    setIsFlagged(flaggedQuestions.includes(questionIndex));
  };

  useEffect(() => {
    const currIndex = localStorage.getItem("currQuestion");
    setCurrQuestion(parseInt(currIndex, 10) || 0);
    updateFlaggedStatus(currIndex);
  }, []); // The empty dependency array ensures that this effect runs only once on mount

  useEffect(() => {
    updateFlaggedStatus(currQuestion);
  }, [currQuestion]); // Update flagged status when currQuestion changes

  return (
    <Container>
      <Row>
        <Col xs={4} sm={4}>
          <Button variant="primary" onClick={handleBack}>
            Go Back
          </Button>{" "}
        </Col>

        <Col xs={2} sm={2}>
          <Button variant="danger" onClick={handleFlag} disabled={isFlagged}>
            {isFlagged ? "Flagged" : "Flag"}
          </Button>{" "}
        </Col>
        <Col xs={4} sm={4}>
          <Button variant="info" onClick={handleNext} disabled={(totalQuiz===currQuestion+1)}>
            Go Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Top;
