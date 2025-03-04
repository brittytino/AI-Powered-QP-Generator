
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import { exportQuestionPaperAsPdf, exportAnswerKeyAsPdf } from '@/utils/pdfExport';
import { Question } from '@/components/question-paper/types';

interface Section {
  name: string;
  marks: number;
  questionCount: number;
}

interface PaperConfig {
  totalMarks: number;
  duration: number;
  subject: string;
}

export const usePaperExport = () => {
  const { toast } = useToast();

  const downloadPaper = (
    questions: Question[], 
    title: string, 
    config: PaperConfig, 
    institution: string,
    sections: Section[],
    logo: string | null = null
  ) => {
    if (!title) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for your question paper.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      // Export the question paper (questions only)
      exportQuestionPaperAsPdf(
        questions, 
        {
          title, 
          totalMarks: config.totalMarks, 
          duration: config.duration,
          institution,
          subject: config.subject,
          logo: logo || undefined
        },
        sections
      );
      
      toast({
        title: "Success!",
        description: "Question paper downloaded successfully.",
      });
      return true;
    } catch (error) {
      console.error('Error downloading paper:', error);
      toast({
        title: "Error",
        description: "Failed to download paper. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const downloadAnswerKey = (
    questions: Question[], 
    title: string, 
    config: PaperConfig, 
    institution: string,
    sections: Section[],
    logo: string | null = null
  ) => {
    if (!title) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for your answer key.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      // Export the answer key with solutions
      exportAnswerKeyAsPdf(
        questions, 
        {
          title, 
          totalMarks: config.totalMarks, 
          duration: config.duration,
          institution,
          subject: config.subject,
          logo: logo || undefined
        },
        sections
      );
      
      toast({
        title: "Success!",
        description: "Answer key downloaded successfully.",
      });
      return true;
    } catch (error) {
      console.error('Error downloading answer key:', error);
      toast({
        title: "Error",
        description: "Failed to download answer key. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    downloadPaper,
    downloadAnswerKey
  };
};
