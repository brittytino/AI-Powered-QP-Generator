
import { PaperConfig, Question } from '@/components/question-paper/types';

export interface Draft {
  id: string;
  title: string;
  config: PaperConfig;
  questions: Question[];
  lastModified: number;
  version: number;
}

export interface DraftVersion extends Draft {
  versionName: string;
  createdAt: number;
}

const DRAFT_KEY = 'question_paper_draft';
const VERSIONS_KEY = 'question_paper_versions';
const AUTO_SAVE_INTERVAL = 60000; // 1 minute

export const draftManager = {
  saveDraft: (draft: Omit<Draft, 'id' | 'lastModified'>) => {
    const id = draft.title.toLowerCase().replace(/\s+/g, '_');
    const draftToSave = {
      ...draft,
      id,
      lastModified: Date.now(),
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draftToSave));
    return draftToSave;
  },

  getDraft: (): Draft | null => {
    const draft = localStorage.getItem(DRAFT_KEY);
    return draft ? JSON.parse(draft) : null;
  },

  saveVersion: (draft: Draft, versionName: string) => {
    const versions = draftManager.getVersions();
    const newVersion: DraftVersion = {
      ...draft,
      versionName,
      createdAt: Date.now(),
    };
    versions.push(newVersion);
    localStorage.setItem(VERSIONS_KEY, JSON.stringify(versions));
    return newVersion;
  },

  getVersions: (): DraftVersion[] => {
    const versions = localStorage.getItem(VERSIONS_KEY);
    return versions ? JSON.parse(versions) : [];
  },

  restoreVersion: (versionId: string): DraftVersion | null => {
    const versions = draftManager.getVersions();
    const version = versions.find(v => v.id === versionId);
    if (version) {
      draftManager.saveDraft(version);
    }
    return version || null;
  },

  clearDraft: () => {
    localStorage.removeItem(DRAFT_KEY);
  }
};

export const useAutosave = (draft: Omit<Draft, 'id' | 'lastModified'>) => {
  let timer: number;

  const startAutosave = () => {
    timer = window.setInterval(() => {
      draftManager.saveDraft(draft);
    }, AUTO_SAVE_INTERVAL);
  };

  const stopAutosave = () => {
    clearInterval(timer);
  };

  return { startAutosave, stopAutosave };
};
