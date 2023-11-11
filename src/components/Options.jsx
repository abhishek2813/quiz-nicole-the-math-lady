import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import DragComponent from "./DragComponent";

function Options({
  quizz,
  setCurrQuestion,
  setShowAnswer,
  setScore,
  totalQuiz,
}) {
  const [isCorrect, setIsCorrect] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [audio, setAudio] = useState(new Audio());

  const renderOptions = () => {
    const { type, options, correctAnswer, correctAnswers, correctOrder } =
      quizz;

    const playSound = (isCorrect) => {
      const soundFile = isCorrect ? "correct.mp3" : "wrong.mp3";
      const audio = new Audio(soundFile);
      setAudio(audio);
      audio.play();
    };

    const checkAnswer = () => {
      let isAnswerCorrect = false;
      let userAnswer;

      if (type === "Free Choice") {
        userAnswer = document.getElementById("freeChoiceAnswer").value;
      } else if (type === "Single Choice") {
        userAnswer = selectedAnswer;
      } else if (type === "Multiple Choice") {
        userAnswer = selectedAnswers;
      } else if (type === "Fill in the Blank") {
        userAnswer = document.getElementById("fillInBlankAnswer").value;
      } else if (type === "Sorting") {
        userAnswer = selectedAnswer;
      }

      setUserAnswers({
        userAnswer,
      });

      if (type === "Free Choice" || type === "Fill in the Blank") {
        isAnswerCorrect =
          userAnswer.toLowerCase() === correctAnswer.toLowerCase();
      } else if (type === "Single Choice") {
        isAnswerCorrect = userAnswer === correctAnswer;
      } else if (type === "Multiple Choice") {
        isAnswerCorrect =
          userAnswer.length === correctAnswers.length &&
          correctAnswers.every((correctOption) =>
            userAnswer.includes(correctOption)
          );
      } else if (type === "Sorting") {
        const userAnswerArr = userAnswer.map((item) => item.text);
        isAnswerCorrect =
          JSON.stringify(userAnswerArr) === JSON.stringify(correctOrder);
        console.log(correctOrder);
        console.log(userAnswer);
        console.log("sorting answer", isAnswerCorrect);
      }

      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect) {
        setShowAnswer(false);
        setCurrQuestion((prev) => {
          if (prev+1 < totalQuiz) {
            setScore((prevScore) => prevScore + 1);
            return prev + 1;
          } else {
            return prev;
          }
        });
        playSound(true);
      } else {
        playSound(false);
        setCurrQuestion((prev) =>{
          if (prev+1 < totalQuiz) {
            return prev + 1;
          } else {
            return prev;
          }
        });
      }
    };

    if (type === "Free Choice") {
      return (
        <div>
          <Form.Control
            id="freeChoiceAnswer"
            type="text"
            placeholder="Free Choice"
          />
          <Button onClick={checkAnswer} className="my-2">
            Submit
          </Button>
        </div>
      );
    } else if (type === "Fill in the Blank") {
      return (
        <div>
          <Form.Control
            id="fillInBlankAnswer"
            type="text"
            placeholder="Fill in the blank"
          />
          <Button onClick={checkAnswer} className="my-2">
            Submit
          </Button>
        </div>
      );
    } else if (type === "Matrix") {
      return (
        <div>
          {options.map((option, index) => (
            <div key={index}>
              <label>{option.country}: </label>
              <Form.Control type="text" placeholder="Matching capital" />
            </div>
          ))}
          <Button onClick={checkAnswer} className="my-2">
            Submit
          </Button>
        </div>
      );
    } else if (type === "Sorting") {
      // Define an array to hold the sorted options
      return (
        <div>
          <DragComponent
            options={options}
            setSelectedAnswer={setSelectedAnswer}
          />
          <Button onClick={checkAnswer} className="my-2">
            Submit
          </Button>
        </div>
      );
    } else if (type === "Single Choice") {
      return (
        <div>
          {options.map((option, index) => (
            <Form.Check
              key={index}
              type="radio"
              label={option}
              name="options"
              id={`option-${index}`}
              onChange={() => setSelectedAnswer(option)}
            />
          ))}
          <Button onClick={checkAnswer} className="my-2">
            Submit
          </Button>
        </div>
      );
    } else if (type === "Multiple Choice") {
      return (
        <div>
          {options.map((option, index) => (
            <Form.Check
              key={index}
              type="checkbox"
              label={option}
              id={`option-${index}`}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedAnswers([...selectedAnswers, option]);
                } else {
                  setSelectedAnswers(
                    selectedAnswers.filter((item) => item !== option)
                  );
                }
              }}
            />
          ))}
          <Button onClick={checkAnswer} className="my-2">
            Submit
          </Button>
        </div>
      );
    }
  };

  useEffect(() => {
    audio.addEventListener("ended", () => setAudio(new Audio()));
    return () => {
      audio.removeEventListener("ended", () => setAudio(new Audio()));
    };
  }, [audio]);

  return <Form.Group>{renderOptions()}</Form.Group>;
}

export default Options;
