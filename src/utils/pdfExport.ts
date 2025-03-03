
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Question } from "@/components/question-paper/types";

// Add type declaration for jsPDF-autotable
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface PaperInfo {
  title: string;
  totalMarks: number;
  duration: number;
  date?: string;
}

// Export a question paper as a PDF with questions only
export const exportQuestionPaperAsPdf = (
  questions: Question[], 
  paperInfo: PaperInfo,
  sections?: { name: string; marks: number; questionCount: number }[]
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 20;
  
  // Add header
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(paperInfo.title, pageWidth / 2, currentY, { align: "center" });
  currentY += 10;
  
  // Add paper info
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const dateStr = paperInfo.date || new Date().toLocaleDateString();
  const infoText = `Duration: ${paperInfo.duration} minutes | Total Marks: ${paperInfo.totalMarks} | Date: ${dateStr}`;
  doc.text(infoText, pageWidth / 2, currentY, { align: "center" });
  currentY += 15;
  
  // Add instructions
  doc.setFont("helvetica", "bold");
  doc.text("Instructions:", 14, currentY);
  currentY += 7;
  doc.setFont("helvetica", "normal");
  const instructions = [
    "Answer all questions in the space provided.",
    "Calculators may be used where applicable.",
    "Show all your working clearly to receive full marks.",
    "Marks are indicated in brackets at the end of each question."
  ];
  
  instructions.forEach(instruction => {
    doc.text(`• ${instruction}`, 20, currentY);
    currentY += 6;
  });
  currentY += 10;
  
  // Add questions grouped by sections
  if (sections && sections.length > 0) {
    let startIndex = 0;
    
    sections.forEach((section, sectionIndex) => {
      // Add section header
      doc.setFont("helvetica", "bold");
      doc.text(`${section.name} [${section.marks} marks]`, 14, currentY);
      currentY += 10;
      
      // Add questions for this section
      const sectionQuestions = questions.slice(startIndex, startIndex + section.questionCount);
      startIndex += section.questionCount;
      
      sectionQuestions.forEach((question, index) => {
        // Check if new page is needed
        if (currentY > 250) {
          doc.addPage();
          currentY = 20;
        }
        
        // Question number
        doc.setFont("helvetica", "bold");
        doc.text(`Q${index + 1}. `, 14, currentY);
        
        // Question text
        doc.setFont("helvetica", "normal");
        const questionText = `${question.question} [${question.marks} marks]`;
        const wrappedText = doc.splitTextToSize(questionText, pageWidth - 30);
        doc.text(wrappedText, 25, currentY);
        
        currentY += wrappedText.length * 7 + 15; // Add space after question
      });
      
      currentY += 10; // Add space after section
    });
  } else {
    // If no sections, just list all questions
    questions.forEach((question, index) => {
      // Check if new page is needed
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }
      
      // Question number
      doc.setFont("helvetica", "bold");
      doc.text(`Q${index + 1}. `, 14, currentY);
      
      // Question text
      doc.setFont("helvetica", "normal");
      const questionText = `${question.question} [${question.marks} marks]`;
      const wrappedText = doc.splitTextToSize(questionText, pageWidth - 30);
      doc.text(wrappedText, 25, currentY);
      
      currentY += wrappedText.length * 7 + 15; // Add space after question
    });
  }
  
  // Save the PDF
  const filename = paperInfo.title.replace(/\s+/g, '_') || 'question_paper';
  doc.save(`${filename}.pdf`);
};

// Export answer key as a separate PDF
export const exportAnswerKeyAsPdf = (
  questions: Question[], 
  paperInfo: PaperInfo,
  sections?: { name: string; marks: number; questionCount: number }[]
) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  let currentY = 20;
  
  // Add header
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text(`${paperInfo.title} - ANSWER KEY`, pageWidth / 2, currentY, { align: "center" });
  currentY += 15;
  
  // Process each question with its answer
  if (sections && sections.length > 0) {
    let startIndex = 0;
    
    sections.forEach((section, sectionIndex) => {
      // Add section header
      doc.setFont("helvetica", "bold");
      doc.text(`${section.name}`, 14, currentY);
      currentY += 10;
      
      // Add questions for this section
      const sectionQuestions = questions.slice(startIndex, startIndex + section.questionCount);
      startIndex += section.questionCount;
      
      sectionQuestions.forEach((question, index) => {
        // Check if new page is needed
        if (currentY > 250) {
          doc.addPage();
          currentY = 20;
        }
        
        // Question and answer
        doc.setFont("helvetica", "bold");
        doc.text(`Q${index + 1}: `, 14, currentY);
        doc.setFont("helvetica", "normal");
        
        // Question text
        const questionText = doc.splitTextToSize(question.question, pageWidth - 30);
        doc.text(questionText, 25, currentY);
        currentY += questionText.length * 7 + 5;
        
        // Answer
        doc.setFont("helvetica", "bold");
        doc.text("Answer: ", 14, currentY);
        doc.setFont("helvetica", "normal");
        const answerText = doc.splitTextToSize(question.answer, pageWidth - 30);
        doc.text(answerText, 35, currentY);
        currentY += answerText.length * 7 + 5;
        
        // Solution steps
        if (question.steps && question.steps.length > 0) {
          doc.setFont("helvetica", "bold");
          doc.text("Solution: ", 14, currentY);
          currentY += 7;
          
          question.steps.forEach((step, stepIndex) => {
            doc.setFont("helvetica", "normal");
            const stepText = doc.splitTextToSize(`${stepIndex + 1}. ${step}`, pageWidth - 40);
            doc.text(stepText, 25, currentY);
            currentY += stepText.length * 7 + 3;
          });
        }
        
        currentY += 15; // Add space after question
      });
      
      currentY += 10; // Add space after section
    });
  } else {
    // If no sections, just list all questions with answers
    questions.forEach((question, index) => {
      // Check if new page is needed
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }
      
      // Question and answer
      doc.setFont("helvetica", "bold");
      doc.text(`Q${index + 1}: `, 14, currentY);
      doc.setFont("helvetica", "normal");
      
      // Question text
      const questionText = doc.splitTextToSize(question.question, pageWidth - 30);
      doc.text(questionText, 25, currentY);
      currentY += questionText.length * 7 + 5;
      
      // Answer
      doc.setFont("helvetica", "bold");
      doc.text("Answer: ", 14, currentY);
      doc.setFont("helvetica", "normal");
      const answerText = doc.splitTextToSize(question.answer, pageWidth - 30);
      doc.text(answerText, 35, currentY);
      currentY += answerText.length * 7 + 5;
      
      // Solution steps
      if (question.steps && question.steps.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.text("Solution: ", 14, currentY);
        currentY += 7;
        
        question.steps.forEach((step, stepIndex) => {
          doc.setFont("helvetica", "normal");
          const stepText = doc.splitTextToSize(`${stepIndex + 1}. ${step}`, pageWidth - 40);
          doc.text(stepText, 25, currentY);
          currentY += stepText.length * 7 + 3;
        });
      }
      
      currentY += 15; // Add space after question
    });
  }
  
  // Save the PDF
  const filename = `${paperInfo.title.replace(/\s+/g, '_')}_answers` || 'answer_key';
  doc.save(`${filename}.pdf`);
};
