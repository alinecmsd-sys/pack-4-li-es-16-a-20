export type LessonId = '16' | '17' | '18' | '19' | '20' | 'exercises';

export interface VocabularyItem {
  word: string;
}

export interface PhraseItem {
  text: string;
}

export interface LessonData {
  id: LessonId;
  title: string;
  subtitle: string;
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
}

export type ExerciseType = 'order' | 'speaking';

export interface Exercise {
  id: string;
  type: ExerciseType;
  question: string; // The target sentence
  scrambled?: string[]; // For 'order' type
}
