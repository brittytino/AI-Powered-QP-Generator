
import { jsPDF } from "jspdf";
import { Question } from "@/components/question-paper/types";
import { SectionInfo, pdfStyles } from "./pdfStyles";

// Add questions to the PDF, organized by sections
export const addQuestionsToDocument = (
  doc: jsPDF,
  questions: Question[],
  sections: SectionInfo[] | undefined,
  currentY: number,
  questionOnly: boolean = true // Whether to include only questions (true) or also answers (false)
): void => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxY = pageHeight - pdfStyles.margins.bottom;
  
  // Add questions grouped by sections
  if (sections && sections.length > 0) {
    let startIndex = 0;
    
    sections.forEach((section, sectionIndex) => {
      // Check if we need a new page
      if (currentY > maxY - 30) {
        doc.addPage();
        currentY = pdfStyles.margins.top;
      }
      
      // Add section header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(pdfStyles.fonts.subheader.size);
      doc.text(`${section.name} [${section.marks} marks]`, 14, currentY);
      currentY += 8;
      
      // Add questions for this section
      const sectionQuestions = questions.slice(startIndex, startIndex + section.questionCount);
      startIndex += section.questionCount;
      
      sectionQuestions.forEach((question, index) => {
        // Check if need to start a new page
        if (currentY > maxY - 20) {
          doc.addPage();
          currentY = pdfStyles.margins.top;
        }
        
        // Question number
        doc.setFont("helvetica", "bold");
        doc.setFontSize(pdfStyles.fonts.normal.size);
        doc.text(`Q${index + 1}. `, 14, currentY);
        
        // Question text
        doc.setFont("helvetica", "normal");
        const questionText = `${question.question} [${question.marks} marks]`;
        const wrappedText = doc.splitTextToSize(questionText, pageWidth - 30);
        doc.text(wrappedText, 25, currentY);
        
        // Calculate space needed for this question
        const textHeight = wrappedText.length * 5;
        currentY += textHeight + 10; // Add space after question
      });
      
      currentY += 5; // Add space after section
    });
  } else {
    // If no sections, just list all questions
    questions.forEach((question, index) => {
      // Check if need to start a new page
      if (currentY > maxY - 20) {
        doc.addPage();
        currentY = pdfStyles.margins.top;
      }
      
      // Question number
      doc.setFont("helvetica", "bold");
      doc.setFontSize(pdfStyles.fonts.normal.size);
      doc.text(`Q${index + 1}. `, 14, currentY);
      
      // Question text
      doc.setFont("helvetica", "normal");
      const questionText = `${question.question} [${question.marks} marks]`;
      const wrappedText = doc.splitTextToSize(questionText, pageWidth - 30);
      doc.text(wrappedText, 25, currentY);
      
      // Calculate space needed for this question
      const textHeight = wrappedText.length * 5;
      currentY += textHeight + 10; // Add space after question
    });
  }
};

// Add answers and solution steps to the PDF
export const addAnswersToDocument = (
  doc: jsPDF,
  questions: Question[],
  sections: SectionInfo[] | undefined,
  currentY: number
): void => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxY = pageHeight - pdfStyles.margins.bottom;
  
  if (sections && sections.length > 0) {
    let startIndex = 0;
    
    sections.forEach((section, sectionIndex) => {
      // Check if we need a new page
      if (currentY > maxY - 30) {
        doc.addPage();
        currentY = pdfStyles.margins.top;
      }
      
      // Add section header
      doc.setFont("helvetica", "bold");
      doc.setFontSize(pdfStyles.fonts.subheader.size);
      doc.text(`${section.name}`, 14, currentY);
      currentY += 8;
      
      // Add questions and answers for this section
      const sectionQuestions = questions.slice(startIndex, startIndex + section.questionCount);
      startIndex += section.questionCount;
      
      sectionQuestions.forEach((question, index) => {
        // Check if need to start a new page
        if (currentY > maxY - 50) {
          doc.addPage();
          currentY = pdfStyles.margins.top;
        }
        
        // Question number and text
        doc.setFont("helvetica", "bold");
        doc.setFontSize(pdfStyles.fonts.normal.size);
        doc.text(`Q${index + 1}: `, 14, currentY);
        doc.setFont("helvetica", "normal");
        
        const questionText = doc.splitTextToSize(question.question, pageWidth - 30);
        doc.text(questionText, 25, currentY);
        currentY += questionText.length * 5 + 5;
        
        // Answer
        doc.setFont("helvetica", "bold");
        doc.text("Answer: ", 14, currentY);
        doc.setFont("helvetica", "normal");
        const answerText = doc.splitTextToSize(question.answer, pageWidth - 40);
        doc.text(answerText, 35, currentY);
        currentY += answerText.length * 5 + 5;
        
        // Solution steps
        if (question.steps && question.steps.length > 0) {
          doc.setFont("helvetica", "bold");
          doc.text("Solution: ", 14, currentY);
          currentY += 7;
          
          question.steps.forEach((step, stepIndex) => {
            // Check if need to start a new page for steps
            if (currentY > maxY - 15) {
              doc.addPage();
              currentY = pdfStyles.margins.top;
            }
            
            doc.setFont("helvetica", "normal");
            const stepText = doc.splitTextToSize(`${stepIndex + 1}. ${step}`, pageWidth - 40);
            doc.text(stepText, 25, currentY);
            currentY += stepText.length * 5 + 3;
          });
        }
        
        currentY += 10; // Add space after each Q&A
      });
      
      currentY += 5; // Add space after section
    });
  } else {
    // If no sections, just list all Q&A
    questions.forEach((question, index) => {
      // Check if need to start a new page
      if (currentY > maxY - 50) {
        doc.addPage();
        currentY = pdfStyles.margins.top;
      }
      
      // Question number and text
      doc.setFont("helvetica", "bold");
      doc.setFontSize(pdfStyles.fonts.normal.size);
      doc.text(`Q${index + 1}: `, 14, currentY);
      doc.setFont("helvetica", "normal");
      
      const questionText = doc.splitTextToSize(question.question, pageWidth - 30);
      doc.text(questionText, 25, currentY);
      currentY += questionText.length * 5 + 5;
      
      // Answer
      doc.setFont("helvetica", "bold");
      doc.text("Answer: ", 14, currentY);
      doc.setFont("helvetica", "normal");
      const answerText = doc.splitTextToSize(question.answer, pageWidth - 40);
      doc.text(answerText, 35, currentY);
      currentY += answerText.length * 5 + 5;
      
      // Solution steps
      if (question.steps && question.steps.length > 0) {
        doc.setFont("helvetica", "bold");
        doc.text("Solution: ", 14, currentY);
        currentY += 7;
        
        question.steps.forEach((step, stepIndex) => {
          // Check if need to start a new page for steps
          if (currentY > maxY - 15) {
            doc.addPage();
            currentY = pdfStyles.margins.top;
          }
          
          doc.setFont("helvetica", "normal");
          const stepText = doc.splitTextToSize(`${stepIndex + 1}. ${step}`, pageWidth - 40);
          doc.text(stepText, 25, currentY);
          currentY += stepText.length * 5 + 3;
        });
      }
      
      currentY += 10; // Add space after each Q&A
    });
  }
};
