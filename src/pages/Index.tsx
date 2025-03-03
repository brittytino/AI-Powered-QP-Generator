
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle, FileText, Download, X } from "lucide-react";
import FeatureCard from "@/components/FeatureCard";
import QuestionPaperEditor from "@/components/QuestionPaperEditor";
import AppSidebar from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [showEditor, setShowEditor] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-b from-soft-50 to-soft-100">
        <AppSidebar />
        <div className="flex-1 overflow-auto">
          {!showEditor ? (
            <div className="px-8 pb-20">
              <div className="text-center mb-16 animate-fade-up">
                <div className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-soft-600 rounded-full bg-soft-100 animate-fade-in">
                  AI-Powered Question Paper Generation
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-soft-900 mb-6">
                  Create Perfect Math
                  <br />
                  Question Papers
                </h1>
                <p className="text-soft-600 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                  Generate customized mathematics question papers with AI assistance.
                  Save time and ensure quality.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="button-shadow hover:scale-105 transition-transform"
                    onClick={() => setShowEditor(true)}
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Create New Paper
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="button-shadow hover:scale-105 transition-transform"
                  >
                    View Examples
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <FeatureCard
                  icon={<FileText className="h-6 w-6" />}
                  title="Smart Generation"
                  description="AI-powered question generation with automatic difficulty tagging"
                />
                <FeatureCard
                  icon={<PlusCircle className="h-6 w-6" />}
                  title="Question Bank"
                  description="Save and organize questions for future use"
                />
                <FeatureCard
                  icon={<Download className="h-6 w-6" />}
                  title="Export Options"
                  description="Download in PDF, Word, or LaTeX format"
                />
              </div>
            </div>
          ) : (
            <div className="relative px-8 pb-20">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 z-10"
                onClick={() => setShowEditor(false)}
              >
                <X className="h-4 w-4" />
              </Button>
              <QuestionPaperEditor />
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
