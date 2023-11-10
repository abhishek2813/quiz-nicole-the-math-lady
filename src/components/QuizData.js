const quizzes = [
  {
    questionNo: 1,
    type: "Free Choice",
    question: "What is the capital of France?",
    correctAnswer: "paris",
    answerExplain: "Paris is the capital of France.",
    key: "free-choice-question",
  },
  {
    questionNo: 2,
    type: "Fill in the Blank",
    question: "The ____ is the largest planet in our solar system.",
    correctAnswer: "jupiter",
    answerExplain: "Jupiter is the largest planet in our solar system.",
    key: "fill-in-the-blank-question",
  },
  {
    questionNo: 3,
    type: "Single Choice",
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Jupiter",
    answerExplain: "Jupiter is the largest planet in our solar system.",
    key: "single-choice-question",
  },
  {
    questionNo: 4,
    type: "Multiple Choice",
    question: "Which of the following are gas giants in our solar system?",
    options: ["Mercury", "Venus", "Earth", "Jupiter", "Saturn"],
    correctAnswers: ["Jupiter", "Saturn"],
    answerExplain: "Jupiter and Saturn are gas giants in our solar system.",
    key: "multiple-choice-question",
  },
  {
    questionNo: 5,
    type: "Matrix",
    question: "Match the countries with their respective capitals.",
    options: [
      { country: "USA", capital: "Washington, D.C." },
      { country: "France", capital: "Paris" },
      { country: "Germany", capital: "Berlin" },
    ],
    correctAnswers: [
      { country: "USA", capital: "Washington, D.C." },
      { country: "France", capital: "Paris" },
      { country: "Germany", capital: "Berlin" },
    ],
    answerExplain: "Matching countries with their respective capitals.",
    key: "matrix-question",
  },
  {
    questionNo: 6,
    type: "Sorting",
    question: "Arrange the following elements in ascending order: 5, 2, 7, 1, 4.",
    options: [5, 2, 7, 1, 4], // Elements to be sorted
    correctOrder: [1, 2, 4, 5, 7], // Correct sorted order
    answerExplain: "The correct order is 1, 2, 4, 5, 7.",
    key: "sorting-question",
  },
];

export default quizzes;
