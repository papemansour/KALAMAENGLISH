import React, { useState } from 'react';
import { ArrowLeft, RefreshCw, Plus } from 'lucide-react';
import { beginnerQuestions } from '../../data/testQuestions';
import { QuestionManager } from './QuestionManager';
import { toast } from 'react-hot-toast';

interface BeginnerTestProps {
  onBack: () => void;
}

export function BeginnerTest({ onBack }: BeginnerTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState(beginnerQuestions);
  const [showQuestionManager, setShowQuestionManager] = useState(false);

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">Beginner Test</h3>
          <button
            onClick={() => setShowQuestionManager(true)}
            className="flex items-center gap-2 text-emerald-800 hover:text-emerald-900"
            title="Add questions"
          >
            <Plus size={20} />
            Add Questions
          </button>
        </div>

        <p className="text-gray-600 mb-8">No questions available. Please use the Add Questions button to create new questions.</p>

        <button
          onClick={onBack}
          className="flex items-center gap-2 text-emerald-800 hover:text-emerald-900"
        >
          <ArrowLeft size={20} />
          Back to Tests
        </button>

        {showQuestionManager && (
          <QuestionManager
            onClose={() => setShowQuestionManager(false)}
            onSave={(newQuestion) => {
              setQuestions([...questions, newQuestion]);
              toast.success('New question added successfully');
            }}
            onDelete={(questionId) => {
              setQuestions(questions.filter(q => q.id !== questionId));
            }}
            questions={questions}
            level="beginner"
          />
        )}
      </div>
    );
  }

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    let score = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
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
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return '🏆';
    if (percentage >= 80) return '🌟';
    if (percentage >= 70) return '😊';
    if (percentage >= 60) return '🎯';
    if (percentage >= 50) return '📚';
    return '💪';
  };

  if (showResults) {
    const score = calculateScore();
    const emoji = getScoreEmoji(score);
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-2xl font-bold mb-6">Test Results</h3>
        <div className="mb-8">
          <div className="text-4xl font-bold text-emerald-800 mb-4 flex items-center gap-3">
            Score: {score}/{questions.length} {emoji}
          </div>
          <p className="text-gray-600 mb-4">
            {score >= 16 ? "Excellent! You're ready for intermediate level! 🎉" :
             score >= 12 ? "Good job! Keep practicing to improve! 👍" :
             "Keep studying and try again! 📚"}
          </p>
        </div>
        
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={q.id} className="border-b pb-4">
              <p className="font-medium mb-2">Question {index + 1}: {q.question}</p>
              <p className="text-gray-600">Your answer: <span className={answers[index] === q.correctAnswer ? "text-green-600 font-medium" : "text-red-600 font-medium"}>{answers[index]}</span></p>
              <p className="text-gray-600">Correct answer: <span className="text-green-600 font-medium">{q.correctAnswer}</span></p>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-emerald-800 hover:text-emerald-900"
          >
            <ArrowLeft size={20} />
            Back to Tests
          </button>
          <button
            onClick={restartTest}
            className="flex items-center gap-2 bg-emerald-800 text-white px-4 py-2 rounded hover:bg-emerald-900"
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
        <h3 className="text-2xl font-bold">Beginner Test</h3>
        <div className="flex items-center gap-4">
          <span className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
          <button
            onClick={() => setShowQuestionManager(true)}
            className="flex items-center gap-2 text-emerald-800 hover:text-emerald-900"
            title="Manage questions"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div className="mb-8">
        <p className="text-xl mb-6">{questions[currentQuestion].question}</p>
        <div className="space-y-4">
          {questions[currentQuestion].options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="w-full text-left p-4 rounded border hover:bg-emerald-50 hover:border-emerald-800 transition-colors"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-emerald-800 hover:text-emerald-900"
      >
        <ArrowLeft size={20} />
        Exit Test
      </button>

      {showQuestionManager && (
        <QuestionManager
          onClose={() => setShowQuestionManager(false)}
          onSave={(newQuestion) => {
            setQuestions([...questions, newQuestion]);
            toast.success('New question added successfully');
          }}
          onDelete={(questionId) => {
            setQuestions(questions.filter(q => q.id !== questionId));
          }}
          questions={questions}
          level="beginner"
        />
      )}
    </div>
  );
}