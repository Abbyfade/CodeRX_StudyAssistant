import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const QuestionDetail = () => {
  const [questionsData, setQuestionsData] = useState([]); // Use an array to hold multiple questions
  const [showAnswer, setShowAnswer] = useState({}); // State to toggle answer visibility for each question
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [questionName, setQuestionName] = useState('')

  const params = useParams();
  const fileId = params.fileId;

  const questiondetailsurl = `https://9148-13-60-211-71.ngrok-free.app/api/question_detail/${fileId}`;

  const questionDetails = async () => {
    setLoading(true); // Start loading before the request
    setError(null); // Clear previous errors
    try {
      const response = await axios.get(questiondetailsurl, {
        withCredentials: true,
        headers: {
          Authorization: 'Token ' + localStorage.getItem('token'),
        },
      });
      setQuestionsData(response.data.question_detail); // Set the correct data in state
      setQuestionName(response.data.question_name)
    } catch (error) {
      console.error('Error fetching question details:', error);
      setError('Failed to load question details'); // Set error message in state
    } finally {
      setLoading(false); // Stop loading after the request completes
    }
  };

  useEffect(() => {
    questionDetails(); // Fetch question details on component mount
  }, [fileId]); // Dependency on fileId

  // Toggle answer visibility for a specific question
  const toggleAnswer = (key) => {
    setShowAnswer((prevState) => ({
      ...prevState,
      [key]: !prevState[key],
    }));
  };

  if (loading) {
    return <p className="text-center text-xl py-6">Loading...</p>; // Show loading spinner or message
  }

  if (error) {
    return <p className="text-center text-xl py-6">{error}</p>; // Display error message
  }

  return (
    <div className="font-Inter text-[#313131] mx-auto w-10/12">
      <h2 className="text-4xl font-semibold mb-6">{questionName}</h2>

      {/* Loop through questions */}
      {questionsData.map((questionObj, index) => {
        const questionKey = Object.keys(questionObj)[0]; // Get the question number (e.g., "1", "2", "3")
        const questionData = questionObj[questionKey]; // Get the actual question data

        return (
          <div key={questionKey} className="mb-8 border-b border-gray-300 pb-6">
            {/* Question Number and Text */}
            <h3 className="text-lg font-bold mb-4">
              {index + 1}. {questionData.question}
            </h3>

            {/* Options */}
            <ul className="list-none pl-4">
              {Object.entries(questionData.options).map(([optionKey, optionValue]) => (
                <li key={optionKey} className="mb-2">
                  <span className="font-semibold">{optionKey}.</span> {optionValue}
                </li>
              ))}
            </ul>

            {/* Answer Toggle */}
            <div className="mt-4">
              <button
                className="text-blue-600 hover:underline focus:outline-none"
                onClick={() => toggleAnswer(questionKey)}
              >
                {showAnswer[questionKey] ? 'Hide Answer' : 'Show Answer'}
              </button>

              {showAnswer[questionKey] && (
                <p className="text-lg mt-2 text-green-600 font-semibold">
                  Correct Answer: {questionData.correct_answer}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
