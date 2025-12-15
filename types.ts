export type LessonId = '16' | '17' | '18' | '19' | '20' | 'exercises';

export interface VocabularyItem {
  word: string;
  translation: string;
}

export interface PhraseItem {
  text: string;
  translation: string; // Added translation
}

export interface LessonData {
  id: LessonId;
  title: string;
  subtitle: string;
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
}

export type ExerciseType = 'order' | 'complete';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string; // The target sentence or sentence with ____
  scrambled?: string[]; // For 'order' type
  options?: string[]; // For 'complete' type
  correctAnswer?: string; // For 'complete' type
}