export type Definition = {
  id?: String;
  word: string;
  definition: String[];
  source: string;
  example?: string[];
  synonym?: string[];
  antonym?: string[];
  html?: HTML;
};

type HTML = {
  id?: String;
  definition: String | null;
  example?: String;
};
