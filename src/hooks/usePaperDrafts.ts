
import { useState, useEffect } from 'react';
import { draftManager, Draft, DraftVersion, useAutosave } from '@/utils/draftManager';
import { useToast } from '@/components/ui/use-toast';

export const usePaperDrafts = (initialDraft?: Partial<Draft>) => {
  const [currentDraft, setCurrentDraft] = useState<Draft | null>(null);
  const [versions, setVersions] = useState<DraftVersion[]>([]);
  const { toast } = useToast();
  const { startAutosave, stopAutosave } = useAutosave(currentDraft as Draft);

  useEffect(() => {
    // Load existing draft or create new one
    const savedDraft = draftManager.getDraft();
    if (savedDraft) {
      setCurrentDraft(savedDraft);
      toast({
        title: "Draft Restored",
        description: "Your previous work has been loaded.",
      });
    } else if (initialDraft) {
      const newDraft = draftManager.saveDraft(initialDraft as Draft);
      setCurrentDraft(newDraft);
    }

    // Load versions
    setVersions(draftManager.getVersions());

    // Start autosave
    startAutosave();

    // Handle page unload
    const handleUnload = (e: BeforeUnloadEvent) => {
      if (currentDraft) {
        draftManager.saveDraft(currentDraft);
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      stopAutosave();
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, []);

  const saveDraft = (updates: Partial<Draft>) => {
    const updatedDraft = {
      ...currentDraft,
      ...updates,
    } as Draft;
    const saved = draftManager.saveDraft(updatedDraft);
    setCurrentDraft(saved);
    toast({
      title: "Draft Saved",
      description: "Your work has been saved automatically.",
    });
  };

  const saveVersion = (versionName: string) => {
    if (!currentDraft) return;
    const version = draftManager.saveVersion(currentDraft, versionName);
    setVersions([...versions, version]);
    toast({
      title: "Version Saved",
      description: `Version "${versionName}" has been saved.`,
    });
  };

  const restoreVersion = (versionId: string) => {
    const version = draftManager.restoreVersion(versionId);
    if (version) {
      setCurrentDraft(version);
      toast({
        title: "Version Restored",
        description: `Version "${version.versionName}" has been restored.`,
      });
    }
  };

  return {
    currentDraft,
    versions,
    saveDraft,
    saveVersion,
    restoreVersion,
  };
};
