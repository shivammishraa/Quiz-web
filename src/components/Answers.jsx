import React from 'react';

const Answers = ({ options, onAnswerSelect, questionIndex }) => {
  return (
    <div className="answers-container">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswerSelect(questionIndex, option)}
          className="answer-option"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Answers;
