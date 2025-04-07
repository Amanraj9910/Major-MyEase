export interface DocumentField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'date' | 'number';
  required: boolean;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  description: string;
  type: string;
  fields: DocumentField[];
  templateString: string;
  disclaimer?: string;
}
