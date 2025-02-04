import React, { useEffect, useState } from 'react';
import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('/api/Uw5CrX')
      .then(response => response.json())
      .then(data => {
        setQuestions(data.questions);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleSelectAnswer = (questionId, optionId) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;

    questions.forEach(question => {
      const selectedOptionId = selectedAnswers[question.id];
      const correctOption = question.options.find(option => option.is_correct);

      if (correctOption && selectedOptionId === correctOption.id) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setShowSummary(true);
  };

  return (
    <div className="quiz-container">
      {questions.length > 0 ? (
        <>
          {questions.map(question => (
            <div key={question.id} className="question-container">
              <p className="question-text">{question.description}</p>
              <div className="options-container">
                {question.options.map(option => (
                  <button
                    key={option.id}
                    className={`option-button ${selectedAnswers[question.id] === option.id ? 'selected' : ''}`}
                    onClick={() => handleSelectAnswer(question.id, option.id)}
                  >
                    {option.description}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button className="submit-button" onClick={handleSubmit}>
            Submit Quiz
          </button>

          {showSummary && (
            <div className="summary-container">
              <h3>Quiz Summary</h3>
              <p>Score: {score} / {questions.length}</p>
              {questions.map(question => {
                const selectedOptionId = selectedAnswers[question.id];
                const correctOption = question.options.find(opt => opt.is_correct);
                return (
                  <div key={question.id}>
                    <p>{question.description}</p>
                    <p className={selectedOptionId === correctOption.id ? 'correct' : 'incorrect'}>
                      Your Answer: {selectedOptionId ? question.options.find(opt => opt.id === selectedOptionId)?.description : 'Not Answered'}
                    </p>
                    <p className="correct">Correct Answer: {correctOption.description}</p>
                    <hr />
                  </div>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
