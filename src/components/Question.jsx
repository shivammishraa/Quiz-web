import React from 'react';

const Question = ({ question, selectedAnswer, onAnswerSelect, correctAnswer }) => {
  return (
    <div className="question">
      <h3>{question.description}</h3>
      <div className="options">
        {question.options.map((option) => {
          const isCorrect = correctAnswer && option.id === correctAnswer;
          const isWrong = selectedAnswer && option.id === selectedAnswer && option.id !== correctAnswer;

          return (
            <div
              key={option.id}
              className={`option ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
            >
              <label>
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option.id}
                  checked={selectedAnswer === option.id}
                  onChange={() => onAnswerSelect(question.id, option.id)}
                  disabled={!!correctAnswer} // Disable selection after submission
                />
                {option.description}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Question;
