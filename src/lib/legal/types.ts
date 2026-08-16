export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] };

export type LegalSection = {
  id: string;
  number: string;
  level: 1 | 2;
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  title: string;
  description: string;
  effectiveDate: string;
  lastUpdated: string;
  sections: LegalSection[];
};
