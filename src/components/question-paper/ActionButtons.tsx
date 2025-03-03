
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Image, Shuffle, Download } from "lucide-react";

interface ActionButtonsProps {
  processing: boolean;
  generateQuestions: () => Promise<void>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  shuffleQuestions: () => void;
  downloadPaper: () => void;
  hasQuestions: boolean;
}

const ActionButtons = ({
  processing,
  generateQuestions,
  handleImageUpload,
  shuffleQuestions,
  downloadPaper,
  hasQuestions
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <Button
        onClick={generateQuestions}
        disabled={processing}
        className="flex-1 bg-primary hover:bg-primary/90"
      >
        {processing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Generating Questions...
          </>
        ) : (
          <>
            <FileText className="h-4 w-4 mr-2" />
            Generate Questions
          </>
        )}
      </Button>

      <Button
        variant="outline"
        onClick={() => document.getElementById('image-upload')?.click()}
        disabled={processing}
        className="hover:bg-gray-100"
      >
        <Image className="h-4 w-4 mr-2" />
        Scan Image
      </Button>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {hasQuestions && (
        <>
          <Button variant="outline" onClick={shuffleQuestions} className="hover:bg-gray-100">
            <Shuffle className="h-4 w-4 mr-2" />
            Shuffle
          </Button>
          <Button variant="outline" onClick={downloadPaper} className="hover:bg-gray-100">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </>
      )}
    </div>
  );
};

export default ActionButtons;
