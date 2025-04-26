import React, { useState } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

const advancedQuestions: Question[] = [
  // Grammar Questions
  {
    id: 1,
    category: 'Grammar',
    question: "What is the difference between 'who' and 'whom'?",
    options: [
      "'Who' is for questions, 'whom' is for statements",
      "'Who' is subject, 'whom' is object",
      "They are interchangeable",
      "'Who' is formal, 'whom' is informal"
    ],
    correctAnswer: "'Who' is subject, 'whom' is object"
  },
  {
    id: 2,
    category: 'Grammar',
    question: "Correct this sentence: 'If I was you, I would take the job.'",
    options: [
      "If I were you, I would take the job",
      "If I am you, I would take the job",
      "If I be you, I would take the job",
      "The sentence is correct"
    ],
    correctAnswer: "If I were you, I would take the job"
  },
  {
    id: 3,
    category: 'Grammar',
    question: "What is the passive voice of: 'She wrote the letter'?",
    options: [
      "The letter was wrote by her",
      "The letter was written by her",
      "The letter is written by her",
      "The letter has been wrote by her"
    ],
    correctAnswer: "The letter was written by her"
  },
  {
    id: 4,
    category: 'Grammar',
    question: "What is the subjunctive mood?",
    options: [
      "Expresses facts",
      "Expresses wishes or hypothetical situations",
      "Expresses commands",
      "Expresses questions"
    ],
    correctAnswer: "Expresses wishes or hypothetical situations"
  },
  {
    id: 5,
    category: 'Grammar',
    question: "What is the difference between 'affect' and 'effect'?",
    options: [
      "'Affect' is a verb, 'effect' is usually a noun",
      "They are interchangeable",
      "'Effect' is a verb, 'affect' is a noun",
      "There is no difference"
    ],
    correctAnswer: "'Affect' is a verb, 'effect' is usually a noun"
  },
  // Vocabulary Questions
  {
    id: 6,
    category: 'Vocabulary',
    question: "What is the meaning of 'ephemeral'?",
    options: [
      "Lasting forever",
      "Lasting for a very short time",
      "Very important",
      "Very beautiful"
    ],
    correctAnswer: "Lasting for a very short time"
  },
  {
    id: 7,
    category: 'Vocabulary',
    question: "What is a synonym for 'meticulous'?",
    options: [
      "Careless",
      "Precise",
      "Quick",
      "Simple"
    ],
    correctAnswer: "Precise"
  },
  {
    id: 8,
    category: 'Vocabulary',
    question: "What does 'ubiquitous' mean?",
    options: [
      "Present everywhere",
      "Very rare",
      "Unique",
      "Unknown"
    ],
    correctAnswer: "Present everywhere"
  },
  {
    id: 9,
    category: 'Vocabulary',
    question: "What is the opposite of 'benevolent'?",
    options: [
      "Kind",
      "Malevolent",
      "Generous",
      "Helpful"
    ],
    correctAnswer: "Malevolent"
  },
  {
    id: 10,
    category: 'Vocabulary',
    question: "What is the meaning of 'oxymoron'?",
    options: [
      "A type of oxygen molecule",
      "A figure of speech combining contradictory terms",
      "A mathematical formula",
      "A medical condition"
    ],
    correctAnswer: "A figure of speech combining contradictory terms"
  },
  // Comprehension Questions
  {
    id: 11,
    category: 'Comprehension',
    question: "Read this sentence: 'The project, which had been delayed for months, was finally completed.' Why was the project delayed?",
    options: [
      "The sentence doesn't specify why",
      "Because it was difficult",
      "Because of bad weather",
      "Because of lack of funding"
    ],
    correctAnswer: "The sentence doesn't specify why"
  },
  {
    id: 12,
    category: 'Comprehension',
    question: "What does the idiom 'burn the midnight oil' mean?",
    options: [
      "To waste electricity",
      "To work late into the night",
      "To start a fire",
      "To waste time"
    ],
    correctAnswer: "To work late into the night"
  },
  {
    id: 13,
    category: 'Comprehension',
    question: "What is the tone of this sentence: 'Her sarcastic remarks made everyone uncomfortable'?",
    options: [
      "Happy",
      "Negative",
      "Neutral",
      "Positive"
    ],
    correctAnswer: "Negative"
  },
  // General Knowledge Questions
  {
    id: 14,
    category: 'General Knowledge',
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Michelangelo"
    ],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    id: 15,
    category: 'General Knowledge',
    question: "What is the smallest country in the world?",
    options: [
      "Monaco",
      "Vatican City",
      "San Marino",
      "Liechtenstein"
    ],
    correctAnswer: "Vatican City"
  },
  // Critical Thinking Questions
  {
    id: 16,
    category: 'Critical Thinking',
    question: "What are the pros and cons of social media?",
    options: [
      "Only has benefits",
      "Only has drawbacks",
      "Has both positive and negative aspects depending on usage",
      "Has no significant impact"
    ],
    correctAnswer: "Has both positive and negative aspects depending on usage"
  },
  {
    id: 17,
    category: 'Critical Thinking',
    question: "How would you solve the problem of climate change?",
    options: [
      "It's not a real problem",
      "Through individual and collective action, policy changes, and technological innovation",
      "Nothing can be done",
      "It will solve itself"
    ],
    correctAnswer: "Through individual and collective action, policy changes, and technological innovation"
  },
  // Debate Topics
  {
    id: 18,
    category: 'Debate',
    question: "Should college education be free for everyone?",
    options: [
      "Yes, education is a fundamental right",
      "No, it would decrease its value",
      "It depends on various economic and social factors",
      "Only for certain subjects"
    ],
    correctAnswer: "It depends on various economic and social factors"
  },
  {
    id: 19,
    category: 'Debate',
    question: "Is technology making people less social?",
    options: [
      "Yes, definitely",
      "No, it's enhancing connectivity",
      "It depends on how technology is used",
      "Technology has no effect on socialization"
    ],
    correctAnswer: "It depends on how technology is used"
  },
  {
    id: 20,
    category: 'Debate',
    question: "Should animals be used for scientific research?",
    options: [
      "Yes, without any restrictions",
      "No, never",
      "Only when necessary and with strict ethical guidelines",
      "Only for food research"
    ],
    correctAnswer: "Only when necessary and with strict ethical guidelines"
  }
];

interface AdvancedTestProps {
  onBack: () => void;
}

export function AdvancedTest({ onBack }: AdvancedTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < advancedQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === advancedQuestions[index].correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const restartTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  const getScoreEmoji = (score: number) => {
    const percentage = (score / advancedQuestions.length) * 100;
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 70) return '😊';
    if (percentage >= 60) return '🎯';
    if (percentage >= 50) return '📚';
    return '💪';
  };

  if (showResults) {
    const score = calculateScore();
    const totalQuestions = advancedQuestions.length;
    const percentage = (score / totalQuestions) * 100;
    const emoji = getScoreEmoji(score);

    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6">Advanced Test Results</h3>
        <div className="mb-8">
          <div className="text-4xl font-bold text-purple-800 mb-4 flex items-center gap-3">
            Score: {score}/{totalQuestions} {emoji}
          </div>
          <div className="text-2xl text-purple-600 mb-4">
            {percentage.toFixed(1)}%
          </div>
          <p className="text-gray-600 mb-4">
            {percentage >= 80 ? "Outstanding! You have mastered advanced English concepts!" :
             percentage >= 60 ? "Good job! Keep practicing to perfect your advanced English skills!" :
             "Keep studying and try again to improve your advanced English knowledge!"}
          </p>
        </div>
        
        <div className="space-y-6">
          {advancedQuestions.map((q, index) => (
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
            className="flex items-center gap-2 text-purple-800 hover:text-purple-900"
          >
            <ArrowLeft size={20} />
            Back to Tests
          </button>
          <button
            onClick={restartTest}
            className="flex items-center gap-2 bg-purple-800 text-white px-4 py-2 rounded hover:bg-purple-900"
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
        <h3 className="text-2xl font-bold">Advanced Test</h3>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">
            Question {currentQuestion + 1} of {advancedQuestions.length}
          </span>
          <span className="text-sm font-medium text-purple-600">
            {advancedQuestions[currentQuestion].category}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xl mb-6">{advancedQuestions[currentQuestion].question}</p>
        <div className="space-y-4">
          {advancedQuestions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-4 rounded border hover:bg-purple-50 hover:border-purple-800 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-purple-800 hover:text-purple-900"
      >
        <ArrowLeft size={20} />
        Exit Test
      </button>
    </div>
  );
}