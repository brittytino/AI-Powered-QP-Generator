
import React from 'react';
import { Card } from "@/components/ui/card";
import AppSidebar from "@/components/AppSidebar";
import { History, Download, Eye, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const RecentPapers = () => {
  const navigate = useNavigate();
  
  const recentPapers = [
    { id: 1, title: "Algebra Test - Grade 10", date: "2024-03-15", subject: "Mathematics", questions: 15 },
    { id: 2, title: "Calculus Quiz - Grade 12", date: "2024-03-14", subject: "Mathematics", questions: 20 },
    { id: 3, title: "Geometry Exam - Grade 11", date: "2024-03-13", subject: "Mathematics", questions: 12 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <AppSidebar />
      <div className="flex-1 overflow-y-auto px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Recent Papers</h1>
              <p className="text-lg text-gray-600">Access and manage your recently created question papers</p>
            </div>
            <Button 
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate('/question-papers')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Create New Paper
            </Button>
          </div>

          <div className="grid gap-6">
            {recentPapers.map((paper) => (
              <Card key={paper.id} className="p-6 hover:shadow-lg transition-all duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <History className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{paper.title}</h3>
                      <div className="flex items-center gap-4 mt-2">
                        <span className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {paper.date}
                        </span>
                        <span className="text-sm text-gray-600">
                          {paper.questions} Questions
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentPapers;
