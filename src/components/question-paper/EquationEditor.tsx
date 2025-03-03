
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BlockMath } from 'react-katex';
import { useToast } from "@/components/ui/use-toast";

interface EquationEditorProps {
  equation: string;
  setEquation: (equation: string) => void;
  showEquationPreview: boolean;
  setShowEquationPreview: (show: boolean) => void;
}

const EquationEditor = ({
  equation,
  setEquation,
  showEquationPreview,
  setShowEquationPreview
}: EquationEditorProps) => {
  const { toast } = useToast();

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast({
        title: "Error",
        description: "Voice input is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      
      const mathText = convertSpokenMathToLatex(transcript);
      setEquation(mathText);
    };

    recognition.start();
  };

  const convertSpokenMathToLatex = (text: string) => {
    return text
      .replace(/square root/g, '\\sqrt')
      .replace(/squared/g, '^2')
      .replace(/cubed/g, '^3')
      .replace(/divided by/g, '\\div')
      .replace(/plus/g, '+')
      .replace(/minus/g, '-')
      .replace(/times/g, '\\times')
      .replace(/equals/g, '=');
  };

  return (
    <div className="col-span-2">
      <Label>Mathematical Equation</Label>
      <div className="flex gap-2 mt-2">
        <Input
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          placeholder="Enter LaTeX equation or use voice input"
          className="flex-1"
        />
        <Button
          variant="outline"
          onClick={handleVoiceInput}
          className="flex-shrink-0"
        >
          🎤 Voice Input
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowEquationPreview(!showEquationPreview)}
          className="flex-shrink-0"
        >
          👁️ Preview
        </Button>
      </div>
      {showEquationPreview && equation && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <BlockMath>{equation}</BlockMath>
        </div>
      )}
    </div>
  );
};

export default EquationEditor;
