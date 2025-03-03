import React, { useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppSidebar from "@/components/AppSidebar";
import { 
  Copy, 
  Download, 
  Star, 
  FileText, 
  Book, 
  Clock, 
  Users, 
  ChevronDown 
} from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const templates = [
    {
      id: 1,
      title: "Standard Algebra Test",
      description: "A balanced mix of algebraic questions suitable for high school students",
      subject: "Mathematics",
      grade: "9-10",
      duration: "2 hours",
      questions: 15,
      rating: 4.5,
      categories: ['Algebra', 'Equations']
    },
    {
      id: 2,
      title: "Calculus Final Exam",
      description: "Comprehensive calculus exam covering derivatives and integrals",
      subject: "Mathematics",
      grade: "11-12",
      duration: "3 hours",
      questions: 20,
      rating: 4.8,
      categories: ['Calculus', 'Integration']
    },
    {
      id: 3,
      title: "Geometry Quick Quiz",
      description: "Short quiz focusing on basic geometric concepts",
      subject: "Mathematics",
      grade: "8-9",
      duration: "45 minutes",
      questions: 10,
      rating: 4.2,
      categories: ['Geometry', 'Shapes']
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
          entry.target.classList.remove('opacity-0', 'translate-y-4');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    const cards = document.querySelectorAll('.template-card');
    cards.forEach(card => {
      card.classList.add('opacity-0', 'translate-y-4');
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToContent = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <AppSidebar />
      <div className="flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="px-8 pb-20">
          <div className="text-center max-w-3xl mx-auto animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Create Perfect Math Papers
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Choose from our curated collection of templates or create your own custom question papers
            </p>
            <Button 
              className="bg-primary hover:bg-primary/90 text-lg py-6 px-8"
              onClick={() => navigate('/question-papers')}
            >
              <FileText className="w-5 h-5 mr-2" />
              Create New Paper
            </Button>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <Button 
              variant="ghost" 
              onClick={scrollToContent}
              className="text-gray-600 hover:text-gray-900"
            >
              <ChevronDown className="w-8 h-8" />
            </Button>
          </div>
        </div>

        {/* Templates Section */}
        <div ref={scrollRef} className="px-8 pb-20 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready-to-Use Templates
                </h2>
                <p className="text-gray-600 text-lg">
                  Start with a template and customize it to your needs
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {templates.map((template) => (
                <Card 
                  key={template.id} 
                  className="template-card p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
                >
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900">{template.title}</h3>
                    <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                      <Star className="h-5 w-5 text-yellow-400 mr-1" />
                      <span className="font-medium text-yellow-700">{template.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-lg mb-6">{template.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {template.categories.map(category => (
                      <span 
                        key={category}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center text-gray-600">
                      <Book className="h-5 w-5 mr-3" />
                      <span className="font-medium">Grade {template.grade}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-3" />
                      <span className="font-medium">{template.duration}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-3" />
                      <span className="font-medium">{template.questions} Questions</span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      className="flex-1 py-6" 
                      onClick={() => navigate(`/question-papers?template=${template.id}`)}
                    >
                      <Copy className="h-5 w-5 mr-2" />
                      Use Template
                    </Button>
                    <Button className="flex-1 py-6" variant="outline">
                      <Download className="h-5 w-5 mr-2" />
                      Preview
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
