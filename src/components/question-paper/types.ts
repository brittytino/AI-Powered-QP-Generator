
export interface Question {
  question: string;
  answer: string;
  steps: string[];
  marks: number;
  type: 'multiple-choice' | 'short-answer' | 'long-answer' | 'numerical' | 'theorem';
  difficulty: 'easy' | 'medium' | 'hard';
  metadata?: {
    latex?: string;
    answerLatex?: string;
    stepLatex?: string[];
    graphData?: Array<{ x: number; y: number }>;
  };
}

export interface PaperConfig {
  educationLevel: 'school' | 'college';
  board: string;
  grade: string;
  subject: string;
  totalMarks: number;
  duration: number;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionTypes: string[];
}

export interface MarkDistribution {
  [key: string]: {
    easy: number;
    medium: number;
    hard: number;
  };
}

export const mathTopics = {
  'Algebra': ['Linear Equations', 'Quadratic Equations', 'Polynomials', 'Matrices'],
  'Calculus': ['Limits', 'Derivatives', 'Integration', 'Differential Equations'],
  'Geometry': ['Coordinate Geometry', 'Circles', 'Triangles', 'Polygons'],
  'Trigonometry': ['Basic Ratios', 'Identities', 'Heights and Distances'],
  'Probability': ['Basic Probability', 'Conditional Probability', 'Statistics'],
};

export const defaultConfig: PaperConfig = {
  educationLevel: 'school',
  board: 'CBSE',
  grade: '10',
  subject: 'Mathematics',
  totalMarks: 100,
  duration: 180,
  language: 'English',
  difficulty: 'medium',
  questionTypes: ['multiple-choice', 'short-answer', 'long-answer']
};
