export type ReadingType =
  | 'than-so-hoc'
  | 'tu-vi'
  | 'ban-do-sao'
  | 'tarot'
  | 'boi-bai-tay'
  | 'bat-tu'
  | 'oracle'
  | 'human-design'
  | 'runes';

export interface ReadingCategory {
  id: ReadingType;
  title: string;
  description: string;
  icon: string;
  requiredFields: string[];
}

export interface UserInput {
  fullName?: string;
  dob?: string;
  tob?: string;
  pob?: string;
  gender?: 'male' | 'female' | 'other';
  question?: string;
}
