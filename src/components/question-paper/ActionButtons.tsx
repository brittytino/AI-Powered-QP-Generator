
import React from 'react';
import { Button } from "@/components/ui/button";
import { Loader2, FileText, Image, Shuffle, Download, Save } from "lucide-react";

interface ActionButtonsProps {
  processing: boolean;
  generateQuestions: () => Promise<void>;
  handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  handleLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  shuffleQuestions: () => void;
  downloadPaper: () => void;
  downloadAnswerKey: () => void;
  savePaper: () => Promise<void>;
  hasQuestions: boolean;
  hasLogo: boolean;
}

const ActionButtons = ({
  processing,
  generateQuestions,
  handleImageUpload,
  handleLogoUpload,
  shuffleQuestions,
  downloadPaper,
  downloadAnswerKey,
  savePaper,
  hasQuestions,
  hasLogo
}: ActionButtonsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 mb-2">
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

        <Button
          variant="outline"
          onClick={() => document.getElementById('logo-upload')?.click()}
          disabled={processing}
          className="hover:bg-gray-100"
        >
          <Image className="h-4 w-4 mr-2" />
          {hasLogo ? 'Change Logo' : 'Upload Logo'}
        </Button>
        <input
          id="logo-upload"
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />
      </div>

      {hasQuestions && (
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" onClick={shuffleQuestions} className="hover:bg-gray-100">
            <Shuffle className="h-4 w-4 mr-2" />
            Shuffle
          </Button>
          <Button 
            variant="outline" 
            onClick={downloadPaper} 
            className="hover:bg-gray-100 bg-blue-50 text-blue-700 border-blue-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Paper
          </Button>
          <Button 
            variant="outline" 
            onClick={downloadAnswerKey} 
            className="hover:bg-gray-100 bg-amber-50 text-amber-700 border-amber-200"
          >
            <Download className="h-4 w-4 mr-2" />
            Answer Key
          </Button>
          <Button 
            variant="outline" 
            onClick={savePaper} 
            disabled={processing}
            className="hover:bg-green-600 bg-green-500 text-white hover:text-white ml-auto"
          >
            {processing ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Save Paper
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActionButtons;
