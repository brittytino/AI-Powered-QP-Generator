
import React from "react";
import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Card className="p-6 hover:scale-105 transition-transform duration-300 glass-card animate-fade-up">
      <div className="h-12 w-12 rounded-lg bg-soft-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-soft-900 mb-2">{title}</h3>
      <p className="text-soft-600">{description}</p>
    </Card>
  );
};

export default FeatureCard;
