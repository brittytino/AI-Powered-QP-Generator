
// PDF styling constants
export const pdfStyles = {
  fonts: {
    header: { size: 16, style: 'bold' },
    subheader: { size: 14, style: 'bold' },
    normal: { size: 10, style: 'normal' },
    small: { size: 8, style: 'normal' },
  },
  colors: {
    primary: '#1e3a8a', // dark blue
    secondary: '#6b7280', // gray
    light: '#f3f4f6', // light gray
    success: '#10b981', // green
  },
  margins: {
    top: 20,
    right: 14, 
    bottom: 20,
    left: 14
  },
  spacing: {
    paragraph: 7,
    section: 15
  }
};

// PDF document metadata
export interface PaperInfo {
  title: string;
  totalMarks: number;
  duration: number;
  date?: string;
  institution?: string;
  subject?: string;
  examType?: string;
  logo?: string; // Base64 encoded logo
}

// Section information for structuring questions
export interface SectionInfo {
  name: string;
  marks: number;
  questionCount: number;
}
