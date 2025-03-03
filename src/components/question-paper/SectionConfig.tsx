
import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2 } from "lucide-react";

interface Section {
  name: string;
  marks: number;
  questionCount: number;
}

interface SectionConfigProps {
  sections: Section[];
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
}

const SectionConfig = ({ sections, setSections }: SectionConfigProps) => {
  const addSection = () => {
    setSections([
      ...sections,
      { name: `Section ${String.fromCharCode(65 + sections.length)}`, marks: 20, questionCount: 5 }
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
    newSections[index] = { ...newSections[index], [field]: value };
    setSections(newSections);
  };

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
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default SectionConfig;
