
import React from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { mathTopics, PaperConfig } from './types';

interface PaperConfigFormProps {
  config: PaperConfig;
  setConfig: React.Dispatch<React.SetStateAction<PaperConfig>>;
  title: string;
  setTitle: (title: string) => void;
  selectedTopic: string;
  setSelectedTopic: (topic: string) => void;
  selectedSubtopics: string[];
  setSelectedSubtopics: React.Dispatch<React.SetStateAction<string[]>>;
}

const PaperConfigForm = ({
  config,
  setConfig,
  title,
  setTitle,
  selectedTopic,
  setSelectedTopic,
  selectedSubtopics,
  setSelectedSubtopics
}: PaperConfigFormProps) => {
  const schoolGrades = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
  const collegeYears = ['1st Year', '2nd Year', '3rd Year', '4th Year'];
  const boards = ['CBSE', 'State Board', 'ICSE', 'IB', 'Other'];
  const languages = ['English', 'Hindi', 'Tamil', 'Telugu', 'Malayalam', 'Kannada'];

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-white">
        <h3 className="text-lg font-medium mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="title">Paper Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter paper title"
              className="mt-2"
            />
          </div>

          <div>
            <Label>Education Level</Label>
            <Select
              value={config.educationLevel}
              onValueChange={(value: 'school' | 'college') => 
                setConfig(prev => ({ ...prev, educationLevel: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="school">School</SelectItem>
                <SelectItem value="college">College</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-white">
        <h3 className="text-lg font-medium mb-4">Educational Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Board/Stream</Label>
            <Select
              value={config.board}
              onValueChange={(value) => setConfig(prev => ({ ...prev, board: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select board" />
              </SelectTrigger>
              <SelectContent>
                {boards.map(board => (
                  <SelectItem key={board} value={board}>{board}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Grade/Year</Label>
            <Select
              value={config.grade}
              onValueChange={(value) => setConfig(prev => ({ ...prev, grade: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select grade" />
              </SelectTrigger>
              <SelectContent>
                {(config.educationLevel === 'school' ? schoolGrades : collegeYears).map(grade => (
                  <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Language</Label>
            <Select
              value={config.language}
              onValueChange={(value) => setConfig(prev => ({ ...prev, language: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Difficulty Level</Label>
            <Select
              value={config.difficulty}
              onValueChange={(value: 'easy' | 'medium' | 'hard') => 
                setConfig(prev => ({ ...prev, difficulty: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-white">
        <h3 className="text-lg font-medium mb-4">Exam Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Total Marks</Label>
            <Input
              type="number"
              value={config.totalMarks}
              onChange={(e) => setConfig(prev => ({ ...prev, totalMarks: parseInt(e.target.value) }))}
              min={10}
              max={200}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Duration (minutes)</Label>
            <Input
              type="number"
              value={config.duration}
              onChange={(e) => setConfig(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
              min={30}
              max={360}
              className="mt-2"
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-white">
        <h3 className="text-lg font-medium mb-4">Topics Selection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>Mathematical Topic</Label>
            <Select
              value={selectedTopic}
              onValueChange={(value) => {
                setSelectedTopic(value);
                setSelectedSubtopics([]);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select topic" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(mathTopics).map(topic => (
                  <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedTopic && (
            <div>
              <Label>Subtopics</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                {mathTopics[selectedTopic as keyof typeof mathTopics].map(subtopic => (
                  <div key={subtopic} className="flex items-center space-x-2">
                    <Checkbox
                      id={`subtopic-${subtopic}`}
                      checked={selectedSubtopics.includes(subtopic)}
                      onCheckedChange={(checked) => {
                        setSelectedSubtopics(prev => 
                          checked
                            ? [...prev, subtopic]
                            : prev.filter(t => t !== subtopic)
                        );
                      }}
                    />
                    <label 
                      htmlFor={`subtopic-${subtopic}`}
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {subtopic}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PaperConfigForm;
