import React, { useState } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  category: string;
}

const intermediateQuestions: Question[] = [
  // Grammar Questions
  {
    id: 1,
    category: 'Grammar',
    question: "What is the difference between 'few' and 'a few'?",
    options: [
      "'Few' is positive, 'a few' is negative",
      "'Few' is negative, 'a few' is positive",
      "They mean the same thing",
      "None of the above"
    ],
    correctAnswer: "'Few' is negative, 'a few' is positive"
  },
  {
    id: 2,
    category: 'Grammar',
    question: "Correct this sentence: 'She don't like apples.'",
    options: [
      "She doesn't likes apples",
      "She doesn't like apples",
      "She don't likes apples",
      "She do not like apples"
    ],
    correctAnswer: "She doesn't like apples"
  },
  {
    id: 3,
    category: 'Grammar',
    question: "What is the present continuous form of 'run'?",
    options: ["runs", "runned", "running", "run"],
    correctAnswer: "running"
  },
  {
    id: 4,
    category: 'Grammar',
    question: "Which is correct?",
    options: [
      "I have been to Paris",
      "I have gone to Paris",
      "I have went to Paris",
      "I have being to Paris"
    ],
    correctAnswer: "I have been to Paris"
  },
  {
    id: 5,
    category: 'Grammar',
    question: "What is the superlative form of 'good'?",
    options: ["gooder", "more good", "goodest", "best"],
    correctAnswer: "best"
  },
  // Vocabulary Questions
  {
    id: 6,
    category: 'Vocabulary',
    question: "What is a synonym for 'intelligent'?",
    options: ["smart", "stupid", "slow", "fast"],
    correctAnswer: "smart"
  },
  {
    id: 7,
    category: 'Vocabulary',
    question: "What does 'bittersweet' mean?",
    options: [
      "very bitter",
      "very sweet",
      "both happy and sad",
      "neither happy nor sad"
    ],
    correctAnswer: "both happy and sad"
  },
  {
    id: 8,
    category: 'Vocabulary',
    question: "What is the meaning of 'procrastinate'?",
    options: [
      "to do something quickly",
      "to delay doing something",
      "to finish something",
      "to start something"
    ],
    correctAnswer: "to delay doing something"
  },
  {
    id: 9,
    category: 'Vocabulary',
    question: "What is the opposite of 'generous'?",
    options: ["kind", "giving", "stingy", "wealthy"],
    correctAnswer: "stingy"
  },
  {
    id: 10,
    category: 'Vocabulary',
    question: "What do you call a person who writes books?",
    options: ["writer", "author", "novelist", "all of the above"],
    correctAnswer: "all of the above"
  },
  // Comprehension Questions
  {
    id: 11,
    category: 'Comprehension',
    question: "Read this sentence: 'Despite the rain, they decided to go hiking.' Did they go hiking?",
    options: ["Yes", "No", "It's not clear", "They planned to but didn't"],
    correctAnswer: "Yes"
  },
  {
    id: 12,
    category: 'Comprehension',
    question: "What does the idiom 'break the ice' mean?",
    options: [
      "To actually break ice",
      "To make people feel more comfortable in a social situation",
      "To create problems",
      "To feel cold"
    ],
    correctAnswer: "To make people feel more comfortable in a social situation"
  },
  {
    id: 13,
    category: 'Comprehension',
    question: "What is the main idea of this sentence: 'Although he was tired, he finished his homework.'?",
    options: [
      "He was very tired",
      "He completed his work despite being tired",
      "He didn't finish his homework",
      "Homework is tiring"
    ],
    correctAnswer: "He completed his work despite being tired"
  },
  // General Knowledge Questions
  {
    id: 14,
    category: 'General Knowledge',
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: "William Shakespeare"
  },
  {
    id: 15,
    category: 'General Knowledge',
    question: "What is the largest planet in our solar system?",
    options: ["Mars", "Saturn", "Jupiter", "Neptune"],
    correctAnswer: "Jupiter"
  },
  {
    id: 16,
    category: 'General Knowledge',
    question: "What is the capital of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Perth"],
    correctAnswer: "Canberra"
  },
  {
    id: 17,
    category: 'General Knowledge',
    question: "What is the chemical symbol for water?",
    options: ["H2O", "CO2", "O2", "N2"],
    correctAnswer: "H2O"
  },
  {
    id: 18,
    category: 'General Knowledge',
    question: "What is the name of the longest river in the world?",
    options: ["Amazon", "Nile", "Mississippi", "Yangtze"],
    correctAnswer: "Nile"
  },
  // Quizzes
  {
    id: 19,
    category: 'Quiz',
    question: "Guess the word: It's a place where you can see many animals. What is it?",
    options: ["Zoo", "Park", "Forest", "Farm"],
    correctAnswer: "Zoo"
  },
  {
    id: 20,
    category: 'Quiz',
    question: "Unscramble the word: 'eivlnatno' (Hint: It's a place where people live).",
    options: ["Ventilate", "Valentin", "Valentine", "Valentino"],
    correctAnswer: "Valentine"
  }
];

interface IntermediateTestProps {
  onBack: () => void;
}

export function IntermediateTest({ onBack }: IntermediateTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < intermediateQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === intermediateQuestions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const getLevelRecommendation = (score: number) => {
    if (score >= 19) return {
      level: "Advanced",
      message: "Excellent! You're ready for advanced level! Your strong grasp of English concepts suggests you should move to our advanced curriculum. 🎓",
      color: "text-purple-600"
    };
    if (score >= 16) return {
      level: "Intermediate",
      message: "Good job! You're at the right level. Keep practicing to master intermediate concepts before moving to advanced! 🌟",
      color: "text-blue-600"
    };
    return {
      level: "Beginner",
      message: "Keep learning! We recommend strengthening your foundation with our beginner level materials before tackling intermediate concepts. 📚",
      color: "text-emerald-600"
    };
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const getScoreEmoji = (score: number) => {
    const percentage = (score / intermediateQuestions.length) * 100;
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 70) return '😊';
    if (percentage >= 60) return '🎯';
    if (percentage >= 50) return '📚';
    return '💪';
  };

  if (showResults) {
    const score = calculateScore();
    const totalQuestions = intermediateQuestions.length;
    const percentage = (score / totalQuestions) * 100;
    const emoji = getScoreEmoji(score);
    const recommendation = getLevelRecommendation(score);

    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6">Test Results</h3>
        <div className="mb-8">
          <div className="text-4xl font-bold text-blue-800 mb-4 flex items-center gap-3">
            Score: {score}/{totalQuestions} {emoji}
          </div>
          <div className="text-2xl text-blue-600 mb-4">
            {percentage.toFixed(1)}%
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border mb-6">
            <h4 className={`text-xl font-bold mb-2 ${recommendation.color}`}>
              Recommended Level: {recommendation.level}
            </h4>
            <p className="text-gray-700">
              {recommendation.message}
            </p>
          </div>
        </div>
        
        <div className="space-y-6">
          {intermediateQuestions.map((q, index) => (
            <div key={q.id} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-gray-500">{q.category}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm font-medium">Question {index + 1}</span>
              </div>
              <p className="font-medium mb-2">{q.question}</p>
              <p className="text-gray-600">Your answer: 
                <span className={answers[index] === q.correctAnswer ? 
                  "text-green-600 font-medium ml-2" : 
                  "text-red-600 font-medium ml-2"}>
                  {answers[index]}
                </span>
              </p>
              <p className="text-gray-600">
                Correct answer: 
                <span className="text-green-600 font-medium ml-2">
                  {q.correctAnswer}
                </span>
              </p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-blue-800 hover:text-blue-900"
          >
            <ArrowLeft size={20} />
            Back to Tests
          </button>
          <button
            onClick={restartTest}
            className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-900"
          >
            <RefreshCw size={20} />
            Retake Test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold">Intermediate Test</h3>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Question {currentQuestion + 1} of {intermediateQuestions.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {intermediateQuestions[currentQuestion].category}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xl mb-6">{intermediateQuestions[currentQuestion].question}</p>
        <div className="space-y-4">
          {intermediateQuestions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-4 rounded border hover:bg-blue-50 hover:border-blue-800 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-blue-800 hover:text-blue-900"
      >
        <ArrowLeft size={20} />
        Exit Test
      </button>
    </div>
  );
}