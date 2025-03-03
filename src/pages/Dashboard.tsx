
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppSidebar from "@/components/AppSidebar";
import { PlusCircle, Clock, Star, Download, BookOpen, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const recentPapers = [
    { id: 1, title: "Algebra Test - Grade 10", date: "2024-03-15", subject: "Mathematics" },
    { id: 2, title: "Calculus Quiz - Grade 12", date: "2024-03-14", subject: "Mathematics" },
    { id: 3, title: "Geometry Exam - Grade 11", date: "2024-03-13", subject: "Mathematics" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-soft-50 to-soft-100">
      <AppSidebar />
      <div className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-soft-900">Dashboard</h1>
            <Button onClick={() => navigate('/question-papers')} className="button-shadow">
              <PlusCircle className="mr-2 h-5 w-5" />
              Create New Paper
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 glass-card">
              <div className="flex items-center mb-4">
                <Clock className="h-8 w-8 text-blue-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Recent Papers</h3>
                  <p className="text-sm text-soft-600">Last 7 days</p>
                </div>
              </div>
              <p className="text-3xl font-bold">12</p>
            </Card>

            <Card className="p-6 glass-card">
              <div className="flex items-center mb-4">
                <Star className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Templates</h3>
                  <p className="text-sm text-soft-600">Available</p>
                </div>
              </div>
              <p className="text-3xl font-bold">8</p>
            </Card>

            <Card className="p-6 glass-card">
              <div className="flex items-center mb-4">
                <Download className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Downloads</h3>
                  <p className="text-sm text-soft-600">This month</p>
                </div>
              </div>
              <p className="text-3xl font-bold">45</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Papers</h2>
              <div className="space-y-4">
                {recentPapers.map((paper) => (
                  <div
                    key={paper.id}
                    className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div>
                      <h3 className="font-medium">{paper.title}</h3>
                      <p className="text-sm text-soft-600">{paper.date}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full mt-4"
                onClick={() => navigate('/recent-papers')}
              >
                View All Papers
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => navigate('/templates')}
                >
                  <FileText className="h-6 w-6 mb-2" />
                  Browse Templates
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center"
                  onClick={() => navigate('/question-bank')}
                >
                  <BookOpen className="h-6 w-6 mb-2" />
                  Question Bank
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
