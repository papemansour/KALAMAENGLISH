export interface Question {
  id: number;
  category: 'Grammar' | 'Vocabulary' | 'Comprehension' | 'General';
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface TestSection {
  category: 'Grammar' | 'Vocabulary' | 'Comprehension' | 'General';
  questions: Question[];
}

export interface TestLevel {
  name: string;
  code: string;
  sections: TestSection[];
}