export interface FormInterface {
  id: string;
  formName: string;
  description: string;
  url: string;
  title: string;
  numberOfFields: number;
  menuItemOption: string;
  category: string;
  documentedInformationControl: DocumentedInformationControlInterface;
  help: HelpInterface;
}

interface HelpInterface {
}

interface DocumentedInformationControlInterface {
  creationDate: Date;
  elaboratedBy: string;
  modifiedBy: string;
  approvedBy: string;
  version: string;
}
