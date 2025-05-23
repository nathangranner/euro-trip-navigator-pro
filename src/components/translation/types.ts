
export interface TranslationHistory {
  input: string;
  result: {
    translatedText: string;
    pronunciation?: string;
  };
  source: string;
  target: string;
}
