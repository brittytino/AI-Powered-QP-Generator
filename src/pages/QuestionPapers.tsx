
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import AppSidebar from "@/components/AppSidebar";
import QuestionPaperEditor from "@/components/QuestionPaperEditor";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";

const QuestionPapers = () => {
  const [showEditor, setShowEditor] = useState(false);
  
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <AppSidebar />
      <div className="flex-1 overflow-y-auto px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Question Papers</h1>
            <Button 
              onClick={() => setShowEditor(!showEditor)} 
              className="flex items-center gap-2"
            >
              {showEditor ? (
                <>
                  <RefreshCw className="h-4 w-4" /> 
                  Reset Editor
                </>
              ) : (
                <>
                  <PlusCircle className="h-4 w-4" /> 
                  Create Paper
                </>
              )}
            </Button>
          </div>
          
          {showEditor ? (
            <QuestionPaperEditor />
          ) : (
            <div className="space-y-6">
              <Card className="p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Ready-to-use Papers</h2>
                <p className="text-gray-600 mb-6">
                  Our system has pre-built questions for various topics and difficulty levels.
                  Click "Create Paper" to generate a custom question paper.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {["Algebra", "Calculus", "Geometry"].map((topic) => (
                    <Card key={topic} className="p-4 hover:shadow-lg transition-all">
                      <h3 className="text-lg font-medium mb-2">{topic} Paper</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Pre-built questions for {topic} covering various subtopics.
                      </p>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setShowEditor(true)}
                      >
                        Use Template
                      </Button>
                    </Card>
                  ))}
                </div>
              </Card>
              
              <Card className="p-6 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Features</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Pre-built question templates for all major math topics</li>
                  <li>Customizable sections with different mark distributions</li>
                  <li>Option to download or save question papers</li>
                  <li>Questions with detailed step-by-step solutions</li>
                  <li>Support for different education levels and difficulty settings</li>
                </ul>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionPapers;
