import { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";
import QUESTIONS from "../questions";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 15000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(selectedAnswer) {
    // Immediately update the selected answer and set state to "answered"
    setAnswer({
      selectedAnswer: selectedAnswer,
      isCorrect: null,
    });

    // Check if the selected answer is correct after a delay
    setTimeout(() => {
      setAnswer((prevAnswer) => ({
        ...prevAnswer,
        isCorrect: QUESTIONS[index].answers[0] === selectedAnswer,
      }));

      // Pass the selected answer to the parent component (Quiz)
      setTimeout(() => {
        onSelectAnswer(selectedAnswer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  // Determine the state for CSS classes (answered, correct, or wrong)
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
        mode={answerState}
      />
      <h2>{QUESTIONS[index].text}</h2>

      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState} // This controls the visual state of the selected answer
        onSelect={handleSelectAnswer} // Pass the handler to handle answer selection
      />
    </div>
  );
}
