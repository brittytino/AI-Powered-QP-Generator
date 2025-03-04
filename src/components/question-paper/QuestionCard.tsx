
import React from 'react';
import { Card } from "@/components/ui/card";
import { BlockMath, InlineMath } from 'react-katex';
import { Question } from './types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface QuestionCardProps {
  question: Question;
  index: number;
  showAnswers?: boolean;
}

const QuestionCard = ({ question: q, index, showAnswers = true }: QuestionCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'hard':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const generateGraph = (question: Question) => {
    if (!question.metadata?.graphData) return null;

    return (
      <div className="h-64 w-full mt-4 bg-white p-4 rounded-lg shadow-sm">
        <ResponsiveContainer>
          <LineChart data={question.metadata.graphData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis dataKey="x" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip contentStyle={{ background: 'white', border: '1px solid #ddd' }} />
            <Line 
              type="monotone" 
              dataKey="y" 
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ fill: '#8884d8' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold text-gray-800">
              Question {index + 1}
            </span>
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {q.type}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {showAnswers && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(q.difficulty)}`}>
                {q.difficulty}
              </span>
            )}
            <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
              {q.marks} marks
            </span>
          </div>
        </div>

        <div className="prose max-w-none">
          <div className="bg-gray-50 rounded-lg p-4">
            {q.metadata?.latex ? (
              <BlockMath>{q.metadata.latex}</BlockMath>
            ) : (
              <p className="text-gray-800">{q.question}</p>
            )}
          </div>

          {q.metadata?.graphData && generateGraph(q)}

          {showAnswers && (
            <>
              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-600 mb-2">Answer:</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  {q.metadata?.answerLatex ? (
                    <BlockMath>{q.metadata.answerLatex}</BlockMath>
                  ) : (
                    <p className="text-gray-800">{q.answer}</p>
                  )}
                </div>
              </div>

              {q.steps && q.steps.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Solution Steps:</h4>
                  <ol className="list-decimal list-inside space-y-3">
                    {q.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="text-gray-700 bg-gray-50 p-3 rounded-lg">
                        {q.metadata?.stepLatex?.[stepIndex] ? (
                          <InlineMath>{q.metadata.stepLatex[stepIndex]}</InlineMath>
                        ) : (
                          step
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

export default QuestionCard;
