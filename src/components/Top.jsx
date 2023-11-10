// Top.js
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

function Top({ setCurrQuestion, currQuestion, setShowAnswer }) {
  const [isFlagged, setIsFlagged] = useState(false);

  const handleCheck = () => {
    // Toggle the visibility of the answer div
    setShowAnswer((prevShowAnswer) => !prevShowAnswer);
  };

  const handleFlag = () => {
    // Get the flagged questions from localStorage or initialize an empty array
    const flaggedQuestions =
      JSON.parse(localStorage.getItem("flaggedQuestions")) || [];

    // Check if the current question is already flagged
    if (!flaggedQuestions.includes(currQuestion)) {
      // If not flagged, add the current question index to the array
      flaggedQuestions.push(currQuestion);
      setIsFlagged(true);
    }

    // Save the updated flagged questions array to localStorage
    localStorage.setItem("flaggedQuestions", JSON.stringify(flaggedQuestions));

    // Log the flagged questions for testing
    console.log("Flagged Questions:", flaggedQuestions);
  };

  const handleBack = () => {
    // Decrement the current question index
    const newCurrQuestion = Math.max(0, currQuestion - 1);
    setCurrQuestion(newCurrQuestion);
    localStorage.setItem("currQuestion", newCurrQuestion);
    setShowAnswer(false);
    updateFlaggedStatus(newCurrQuestion);
  };

  const handleNext = () => {
    // Increment the current question index
    setCurrQuestion(currQuestion + 1);
    localStorage.setItem("currQuestion", currQuestion + 1);
    setShowAnswer(false);
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
  }, []);

  return (
    <Container>
      <Row>
        <Col xs={4} sm={4}>
          <Button variant="primary" onClick={handleBack}>
            Go Back
          </Button>{" "}
        </Col>
        <Col xs={2} sm={2}>
          <Button variant="success" onClick={handleCheck}>
            Check
          </Button>
        </Col>
        <Col xs={2} sm={2}>
          <Button variant="danger" onClick={handleFlag} disabled={isFlagged}>
            {isFlagged ? "Flagged" : "Flag"}
          </Button>{" "}
        </Col>
        <Col xs={4} sm={4}>
          <Button variant="info" onClick={handleNext}>
            Go Next
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Top;
