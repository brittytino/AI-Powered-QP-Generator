
import { useState } from 'react';
import { useToast } from "@/hooks/use-toast";

export const useLogoUpload = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const { toast } = useToast();

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    return new Promise((resolve, reject) => {
      const file = event.target.files?.[0];
      if (!file) {
        resolve();
        return;
      }

      // Check file size (max 1MB)
      if (file.size > 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Logo must be less than 1MB in size",
          variant: "destructive",
        });
        resolve();
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogo(result);
        
        // Save logo to local storage
        try {
          localStorage.setItem('paperLogoData', result);
          toast({
            title: "Logo Uploaded",
            description: "Your institution logo has been added to the paper",
          });
          resolve();
        } catch (error) {
          console.error('Error saving logo to local storage:', error);
          toast({
            title: "Error",
            description: "Could not save logo. The image may be too large.",
            variant: "destructive",
          });
          reject(error);
        }
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      reader.readAsDataURL(file);
    });
  };

  // Load logo from local storage on init
  const loadSavedLogo = () => {
    const savedLogo = localStorage.getItem('paperLogoData');
    if (savedLogo) {
      setLogo(savedLogo);
    }
  };

  return {
    logo,
    setLogo,
    handleLogoUpload,
    loadSavedLogo,
    hasLogo: !!logo
  };
};
