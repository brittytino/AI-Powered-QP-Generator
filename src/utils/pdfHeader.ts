
import { jsPDF } from "jspdf";
import { pdfStyles, PaperInfo } from "./pdfStyles";

// Add paper header with institution details, title, and metadata
export const addPaperHeader = (
  doc: jsPDF, 
  paperInfo: PaperInfo,
  currentY: number = 20
): number => {
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Add logo if provided
  if (paperInfo.logo) {
    try {
      doc.addImage(
        paperInfo.logo, 
        'PNG', 
        pageWidth / 2 - 15, 
        currentY, 
        30, 
        30, 
        'logo', 
        'FAST'
      );
      currentY += 35; // Space after logo
    } catch (error) {
      console.error('Error adding logo to PDF:', error);
      // Continue without logo if there's an error
    }
  }
  
  // Add institution header if provided
  if (paperInfo.institution) {
    doc.setFontSize(pdfStyles.fonts.header.size);
    doc.setFont("helvetica", "bold");
    doc.text(paperInfo.institution, pageWidth / 2, currentY, { align: "center" });
    currentY += 10;
  }
  
  // Add title
  doc.setFontSize(pdfStyles.fonts.header.size);
  doc.setFont("helvetica", "bold");
  doc.text(paperInfo.title, pageWidth / 2, currentY, { align: "center" });
  currentY += 8;
  
  // Add subject if provided
  if (paperInfo.subject) {
    doc.setFontSize(pdfStyles.fonts.normal.size);
    doc.setFont("helvetica", "normal");
    doc.text(`Subject: ${paperInfo.subject}`, pageWidth / 2, currentY, { align: "center" });
    currentY += 6;
  }
  
  // Add paper info
  doc.setFontSize(pdfStyles.fonts.small.size);
  doc.setFont("helvetica", "normal");
  const dateStr = paperInfo.date || new Date().toLocaleDateString();
  const infoText = `Duration: ${paperInfo.duration} minutes | Total Marks: ${paperInfo.totalMarks} | Date: ${dateStr}`;
  doc.text(infoText, pageWidth / 2, currentY, { align: "center" });
  currentY += 10;
  
  // Add a decorative line
  doc.setDrawColor(pdfStyles.colors.primary);
  doc.setLineWidth(0.5);
  doc.line(pdfStyles.margins.left, currentY, pageWidth - pdfStyles.margins.right, currentY);
  currentY += 8;
  
  return currentY;
};

// Add instructions section to the paper
export const addInstructions = (doc: jsPDF, currentY: number): number => {
  doc.setFont("helvetica", "bold");
  doc.setFontSize(pdfStyles.fonts.normal.size);
  doc.text("Instructions:", 14, currentY);
  currentY += 7;
  
  doc.setFont("helvetica", "normal");
  const instructions = [
    "Answer all questions in the answer sheet provided.",
    "Write your name and registration number on the answer sheet.",
    "Calculators may be used where applicable.",
    "Show all your working clearly to receive full marks."
  ];
  
  instructions.forEach(instruction => {
    doc.text(`• ${instruction}`, 20, currentY);
    currentY += 6;
  });
  
  return currentY + 5;
};

// Add footer with page numbers to all pages
export const addPageFooters = (doc: jsPDF) => {
  const pageCount = doc.getNumberOfPages();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(100);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { 
      align: 'center' 
    });
  }
};
