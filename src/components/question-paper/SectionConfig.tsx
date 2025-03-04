
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Settings, ChevronDown, ChevronUp } from "lucide-react";

interface QuestionMark {
  id: number;
  marks: number;
}

interface Section {
  name: string;
  marks: number;
  questionCount: number;
  perQuestionMarks?: QuestionMark[];
}

interface SectionConfigProps {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
}

const SectionConfig = ({ sections, setSections }: SectionConfigProps) => {
  const [expandedSections, setExpandedSections] = useState<{[key: number]: boolean}>({});

  const addSection = () => {
    setSections([
      ...sections,
      { 
        name: `Section ${String.fromCharCode(65 + sections.length)}`, 
        marks: 20, 
        questionCount: 5,
        perQuestionMarks: Array(5).fill(0).map((_, i) => ({ id: i, marks: 4 }))
      }
    ]);
  };

  const removeSection = (index: number) => {
    if (sections.length > 1) {
      const newSections = [...sections];
      newSections.splice(index, 1);
      setSections(newSections);
    }
  };

  const updateSection = (index: number, field: keyof Section, value: any) => {
    const newSections = [...sections];
    
    if (field === 'questionCount') {
      const newCount = parseInt(value);
      const oldCount = newSections[index].questionCount;
      const oldMarks = newSections[index].perQuestionMarks || [];
      
      // If increasing question count, add new questions with default marks
      if (newCount > oldCount) {
        const defaultMark = Math.floor(newSections[index].marks / newCount);
        const newQuestions = Array(newCount - oldCount).fill(0).map((_, i) => ({
          id: oldCount + i,
          marks: defaultMark
        }));
        
        newSections[index].perQuestionMarks = [...oldMarks, ...newQuestions];
      } 
      // If decreasing, remove excess questions
      else if (newCount < oldCount) {
        newSections[index].perQuestionMarks = oldMarks.slice(0, newCount);
      }
    }
    
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

  const toggleExpandSection = (index: number) => {
    setExpandedSections(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const updateQuestionMark = (sectionIndex: number, questionIndex: number, marks: number) => {
    const newSections = [...sections];
    const section = newSections[sectionIndex];
    
    if (!section.perQuestionMarks) {
      // Initialize per-question marks if not already set
      section.perQuestionMarks = Array(section.questionCount).fill(0).map((_, i) => ({
        id: i,
        marks: Math.floor(section.marks / section.questionCount)
      }));
    }
    
    // Update the specific question's marks
    section.perQuestionMarks[questionIndex] = { 
      ...section.perQuestionMarks[questionIndex], 
      marks 
    };
    
    // Update total marks for the section
    const totalMarks = section.perQuestionMarks.reduce((sum, q) => sum + q.marks, 0);
    section.marks = totalMarks;
    
    setSections(newSections);
  };

  // Initialize per-question marks for sections that don't have them
  React.useEffect(() => {
    const newSections = [...sections];
    let updated = false;
    
    newSections.forEach((section, index) => {
      if (!section.perQuestionMarks) {
        const defaultMark = Math.floor(section.marks / section.questionCount);
        section.perQuestionMarks = Array(section.questionCount).fill(0).map((_, i) => ({
          id: i,
          marks: defaultMark
        }));
        updated = true;
      }
    });
    
    if (updated) {
      setSections(newSections);
    }
  }, []);

  return (
    <Card className="p-6 bg-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Section Configuration</h2>
        <Button 
          onClick={addSection} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <PlusCircle className="h-4 w-4" />
          Add Section
        </Button>
      </div>
      <div className="space-y-4">
        {sections.map((section, index) => (
          <Card key={index} className="p-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Section Name</label>
                <Input
                  value={section.name}
                  onChange={(e) => updateSection(index, 'name', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Total Marks</label>
                <Input
                  type="number"
                  value={section.marks}
                  onChange={(e) => updateSection(index, 'marks', parseInt(e.target.value))}
                  min={1}
                  className="mt-1"
                  readOnly
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className="text-sm font-medium text-gray-700">Number of Questions</label>
                  <Input
                    type="number"
                    value={section.questionCount}
                    onChange={(e) => updateSection(index, 'questionCount', parseInt(e.target.value))}
                    min={1}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline"
                    size="icon"
                    onClick={() => toggleExpandSection(index)}
                    className="border-blue-200 hover:bg-blue-50"
                  >
                    {expandedSections[index] ? 
                      <ChevronUp className="h-4 w-4" /> : 
                      <ChevronDown className="h-4 w-4" />
                    }
                  </Button>
                  {sections.length > 1 && (
                    <Button 
                      variant="outline"
                      size="icon"
                      onClick={() => removeSection(index)}
                      className="border-red-200 hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
            
            {expandedSections[index] && (
              <div className="mt-4 border-t pt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Per Question Mark Allocation</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {Array.from({ length: section.questionCount }).map((_, qIndex) => {
                    const mark = section.perQuestionMarks?.[qIndex]?.marks || 
                                Math.floor(section.marks / section.questionCount);
                    
                    return (
                      <div key={qIndex} className="flex flex-col">
                        <label className="text-xs text-gray-600">Q{qIndex + 1}</label>
                        <Input
                          type="number"
                          value={mark}
                          onChange={(e) => updateQuestionMark(index, qIndex, parseInt(e.target.value))}
                          min={1}
                          className="mt-1"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default SectionConfig;
