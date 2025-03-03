
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppSidebar from "@/components/AppSidebar";
import { Search, Book, Loader2, Filter, SortAsc } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Question {
  id: string;
  question: string;
  answer: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const QuestionBank = () => {
  const [book, setBook] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const { toast } = useToast();

  const generateQuestions = async () => {
    if (!book || !topic) {
      toast({
        title: "Missing Information",
        description: "Please enter both book name and topic",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke<{ questions: Question[] }>('generate-questions', {
        body: {
          content: `Generate questions from the book "${book}" on the topic "${topic}"`,
          type: 'question-bank'
        }
      });

      if (error) throw error;

      if (data?.questions) {
        setQuestions(data.questions);
        toast({
          title: "Success!",
          description: "Questions generated successfully",
        });
      }
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Error",
        description: "Failed to generate questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <AppSidebar />
      <div className="flex-1 overflow-y-auto px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Question Bank</h1>
              <p className="text-lg text-gray-600">Generate and manage your question collection</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline">
                <SortAsc className="w-4 h-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          <Card className="p-8 mb-8 bg-white/80 backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Book Name</label>
                <div className="relative">
                  <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Enter book name"
                    value={book}
                    onChange={(e) => setBook(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Topic</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Enter topic"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-end">
                <Button
                  className="w-full py-6"
                  onClick={generateQuestions}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Generate Questions'
                  )}
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid gap-6">
            {questions.map((question, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Question {index + 1}</h3>
                    <p className="text-gray-700">{question.question}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    question.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {question.difficulty}
                  </span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">Answer:</p>
                  <p className="text-gray-600">{question.answer}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;
