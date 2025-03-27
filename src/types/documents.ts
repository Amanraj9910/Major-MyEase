
export interface DocumentField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: DocumentField[];
  sampleDocument: string;
}
