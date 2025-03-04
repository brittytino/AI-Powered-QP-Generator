
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Check, AlertCircle } from "lucide-react";
import { Question, PaperConfig, defaultConfig } from './question-paper/types';
import PaperConfigForm from './question-paper/PaperConfigForm';
import ActionButtons from './question-paper/ActionButtons';
import QuestionCard from './question-paper/QuestionCard';
import SectionConfig from './question-paper/SectionConfig';
import { useQuestionGeneration } from '@/hooks/useQuestionGeneration';
import { usePaperExport } from '@/hooks/usePaperExport';
import { useLogoUpload } from '@/hooks/useLogoUpload';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from 'react-router-dom';

interface Section {
  name: string;
  marks: number;
  questionCount: number;
  perQuestionMarks?: Array<{id: number, marks: number}>;
}

// Define the paper data structure for local storage
interface StoredPaper {
  id: string;
  title: string;
  institution: string;
  subject: string;
  config: PaperConfig;
  sections: Section[];
  questions: Question[];
  createdAt: string;
}

const QuestionPaperEditor = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [institution, setInstitution] = useState('');
  const [config, setConfig] = useState<PaperConfig>(defaultConfig);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedSubtopics, setSelectedSubtopics] = useState<string[]>([]);
  const [sections, setSections] = useState<Section[]>([
    { name: 'Section A', marks: 20, questionCount: 5 },
    { name: 'Section B', marks: 40, questionCount: 8 },
    { name: 'Section C', marks: 40, questionCount: 4 }
  ]);
  const [showAnswers, setShowAnswers] = useState(false);

  // Custom hooks
  const { toast } = useToast();
  const { 
    questions, 
    setQuestions, 
    processing, 
    setProcessing, 
    generateQuestions, 
    handleImageUpload: processImageUpload, 
    shuffleQuestions 
  } = useQuestionGeneration();

  const { downloadPaper, downloadAnswerKey } = usePaperExport();
  const { logo, handleLogoUpload, loadSavedLogo, hasLogo } = useLogoUpload();

  // Load logo and draft from local storage on component mount
  useEffect(() => {
    loadSavedLogo();

    const savedDraft = localStorage.getItem('questionPaperDraft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft) as StoredPaper;
        setTitle(draft.title);
        setInstitution(draft.institution);
        setConfig(draft.config);
        setSections(draft.sections);
        setQuestions(draft.questions);
        setSelectedTopic(draft.config.subject || '');
        
        toast({
          title: "Draft Loaded",
          description: "Your previously saved draft has been loaded.",
        });
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Save to local storage whenever important state changes
  useEffect(() => {
    if (questions.length > 0 && title) {
      const paperData: StoredPaper = {
        id: Date.now().toString(),
        title,
        institution,
        subject: config.subject,
        config,
        sections,
        questions,
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('questionPaperDraft', JSON.stringify(paperData));
    }
  }, [questions, title, institution, config, sections]);

  const handleGenerateQuestions = async () => {
    const success = await generateQuestions(
      selectedTopic,
      selectedSubtopics,
      config,
      sections
    );
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    await processImageUpload(event, config);
  };

  const handleDownloadPaper = () => {
    downloadPaper(questions, title, config, institution, sections, logo);
  };

  const handleDownloadAnswerKey = () => {
    downloadAnswerKey(questions, title, config, institution, sections, logo);
  };

  const savePaper = async () => {
    if (!title) {
      toast({
        title: "Missing Title",
        description: "Please provide a title for your question paper.",
        variant: "destructive",
      });
      return;
    }
    
    if (questions.length === 0) {
      toast({
        title: "No Questions",
        description: "Please generate questions before saving.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setProcessing(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const paperMetadata = {
        ...config,
        sections: sections,
        topic: selectedTopic,
        subtopics: selectedSubtopics,
        institution: institution,
        logo: logo // Store logo reference
      };

      const { data: paper, error: paperError } = await supabase
        .from('papers')
        .insert({
          title,
          user_id: user.id,
          metadata: paperMetadata as any
        })
        .select()
        .single();

      if (paperError) throw paperError;

      if (paper) {
        const { error: questionsError } = await supabase
          .from('questions')
          .insert(
            questions.map(q => ({
              paper_id: paper.id,
              content: q.question,
              type: 'math',
              marks: q.marks,
              metadata: { 
                answer: q.answer, 
                steps: q.steps,
                difficulty: q.difficulty,
                questionType: q.type
              }
            }))
          );

        if (questionsError) throw questionsError;

        toast({
          title: "Success!",
          description: "Question paper saved successfully.",
          variant: "default", // Using default styling which is green
        });
        
        // Clear the local storage draft after successful save
        localStorage.removeItem('questionPaperDraft');
        
        // Navigate to the recent papers page after successful save
        navigate('/recent-papers');
      }
    } catch (error) {
      console.error('Error saving paper:', error);
      toast({
        title: "Error",
        description: "Failed to save paper. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 lg:p-8 bg-white shadow-xl rounded-xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Create Question Paper
          </h1>
          <p className="text-gray-600">
            Configure your paper settings and generate questions automatically
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Paper Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter question paper title"
                className="w-full"
              />
            </div>
            
            <div>
              <Label htmlFor="institution">Institution Name</Label>
              <Input
                id="institution"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Enter school or college name"
                className="w-full"
              />
            </div>
          </div>
        </div>

        <PaperConfigForm
          config={config}
          setConfig={setConfig}
          title={title}
          setTitle={setTitle}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          selectedSubtopics={selectedSubtopics}
          setSelectedSubtopics={setSelectedSubtopics}
        />

        <div className="my-6">
          <SectionConfig 
            sections={sections}
            setSections={setSections}
          />
        </div>

        <ActionButtons
          processing={processing}
          generateQuestions={handleGenerateQuestions}
          handleImageUpload={handleImageUpload}
          handleLogoUpload={handleLogoUpload}
          shuffleQuestions={shuffleQuestions}
          downloadPaper={handleDownloadPaper}
          downloadAnswerKey={handleDownloadAnswerKey}
          savePaper={savePaper}
          hasQuestions={questions.length > 0}
          hasLogo={hasLogo}
        />

        {questions.length > 0 && (
          <div className="mt-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Generated Questions</h2>
              <div className="flex items-center gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showAnswers} 
                    onChange={(e) => setShowAnswers(e.target.checked)}
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700">Show Answers</span>
                </label>
              </div>
            </div>
            
            {sections.map((section, sectionIndex) => {
              // Calculate starting index for this section
              let startingIndex = 0;
              for (let i = 0; i < sectionIndex; i++) {
                startingIndex += sections[i].questionCount;
              }

              // Get questions for this section
              const sectionQuestions = questions.slice(
                startingIndex,
                startingIndex + section.questionCount
              );

              if (sectionQuestions.length === 0) return null;

              return (
                <div key={sectionIndex} className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {section.name} ({section.marks} marks)
                  </h2>
                  <div className="grid gap-6">
                    {sectionQuestions.map((question, index) => (
                      <QuestionCard
                        key={`${sectionIndex}-${index}`}
                        question={question}
                        index={startingIndex + index}
                        showAnswers={showAnswers}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {questions.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200">
            <Button
              onClick={savePaper}
              disabled={!title || questions.length === 0 || processing}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-medium rounded-lg transition-colors"
            >
              {processing ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Saving...
                </>
              ) : (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  Save Question Paper
                </>
              )}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default QuestionPaperEditor;
