
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Question } from "@/components/question-paper/types";
import { PaperInfo, SectionInfo } from "./pdfStyles";
import { addPaperHeader, addInstructions, addPageFooters } from "./pdfHeader";
import { addQuestionsToDocument, addAnswersToDocument } from "./pdfContent";

// Add type declaration for jsPDF-autotable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

// Export a question paper as a PDF with questions only
export const exportQuestionPaperAsPdf = (
  questions: Question[], 
  paperInfo: PaperInfo,
  sections?: SectionInfo[]
) => {
  const doc = new jsPDF();
  
  // Add paper header (title, institution, metadata)
  let currentY = addPaperHeader(doc, paperInfo);
  
  // Add instructions
  currentY = addInstructions(doc, currentY);
  
  // Add questions organized by sections
  addQuestionsToDocument(doc, questions, sections, currentY, true);
  
  // Add page numbers in footer
  addPageFooters(doc);
  
  // Save the PDF
  const filename = paperInfo.title.replace(/\s+/g, '_') || 'question_paper';
  doc.save(`${filename}.pdf`);
};

// Export answer key as a separate PDF
export const exportAnswerKeyAsPdf = (
  questions: Question[], 
  paperInfo: PaperInfo,
  sections?: SectionInfo[]
) => {
  const doc = new jsPDF();
  
  // Modified title for answer key
  const answerKeyInfo = {
    ...paperInfo,
    title: `${paperInfo.title} - ANSWER KEY`
  };
  
  // Add paper header (title, institution, metadata)
  let currentY = addPaperHeader(doc, answerKeyInfo);
  
  // Add questions and answers
  addAnswersToDocument(doc, questions, sections, currentY);
  
  // Add page numbers in footer
  addPageFooters(doc);
  
  // Save the PDF
  const filename = `${paperInfo.title.replace(/\s+/g, '_')}_answers` || 'answer_key';
  doc.save(`${filename}.pdf`);
};
