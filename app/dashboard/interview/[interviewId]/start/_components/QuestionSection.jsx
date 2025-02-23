import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react';
import classNames from 'classnames';  // Import classNames library

function QuestionSection({ mockInterviewQuestion = [], activeQuestionIndex }) {

  const textToSpeach = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert('Sorry, your browser does not support speech synthesis.');
    }
  };

  let currentQuestion = null;

  if (mockInterviewQuestion.length > 0) {
    currentQuestion = mockInterviewQuestion[activeQuestionIndex];
  }

  return (
    <div className='p-5 border rounded-lg my-10'>
      <div className='gap-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {mockInterviewQuestion.map((question, index) => (
          <div key={question.id || `question-${index}`}>
            <h2
              className={classNames(
                'p-2 rounded-full text-xs md:text-sm text-center cursor-pointer',
                {
                  'bg-blue-500 text-white': activeQuestionIndex === index, // Active Question
                  'bg-secondary': activeQuestionIndex !== index // Inactive Questions
                }
              )}
            >
              Question. {index + 1}
            </h2>
          </div>
        ))}
      </div>

      {currentQuestion ? (
        <h2 className='my-8 mx-1 text-md md:text-lg'>
          {currentQuestion.question}
          <Volume2 onClick={() => textToSpeach(currentQuestion.question)} className="cursor-pointer mt-2" />
        </h2>
      ) : (
        <h2 className='my-5 text-md md:text-lg text-gray-500'>No questions available</h2>
      )}

      <div className='border rounded-lg p-5 bg-yellow-100 mt-10'>
        <h2 className='flex gap-2 items-center text-yellow-700'>
          <Lightbulb />
          <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-yellow-700 my-2'>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
      </div>
    </div>
  );
}

export default QuestionSection;
