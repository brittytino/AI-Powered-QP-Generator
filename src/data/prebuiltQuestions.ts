
import { QuestionItem, questionBank } from "./questionBank";
import { questionAnswers } from "./answerBank";
import { Question } from "@/components/question-paper/types";

export type PrebuiltQuestion = QuestionItem;

// Function to get questions by topic, subtopic, difficulty and education level
export const getQuestionsByFilters = (
  topic: string,
  subtopics: string[],
  difficulty: 'easy' | 'medium' | 'hard',
  count: number,
  educationLevel: 'school' | 'college' = 'school',
  grade: string = '10'
): PrebuiltQuestion[] => {
  let filteredQuestions: PrebuiltQuestion[] = [];
  
  // First get questions for the specific topic and subtopics
  if (questionBank[topic]) {
    subtopics.forEach(subtopic => {
      if (questionBank[topic][subtopic]) {
        // Filter by difficulty
        const questionsWithDifficulty = questionBank[topic][subtopic].filter(
          q => q.difficulty === difficulty
        );
        filteredQuestions = [...filteredQuestions, ...questionsWithDifficulty];
      }
    });
  }
  
  // If we don't have enough questions, get more from other subtopics
  if (filteredQuestions.length < count) {
    Object.values(questionBank[topic] || {}).forEach(questions => {
      const additionalQuestions = questions.filter(
        q => q.difficulty === difficulty && !filteredQuestions.includes(q)
      );
      filteredQuestions = [...filteredQuestions, ...additionalQuestions];
    });
  }
  
  // If we still don't have enough, get questions from any topic
  if (filteredQuestions.length < count) {
    Object.values(questionBank).forEach(topicQuestions => {
      Object.values(topicQuestions).forEach(questions => {
        const additionalQuestions = questions.filter(
          q => q.difficulty === difficulty && !filteredQuestions.includes(q)
        );
        filteredQuestions = [...filteredQuestions, ...additionalQuestions];
      });
    });
  }
  
  // Shuffle and slice to get the requested number of questions
  const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Export for compatibility with existing code
export { questionAnswers, questionBank };
