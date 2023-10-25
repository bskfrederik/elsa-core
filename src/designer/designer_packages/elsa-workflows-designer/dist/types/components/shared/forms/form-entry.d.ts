import { FunctionalComponent } from "../../../stencil-public-runtime";
export interface FormEntryProps {
  label: string;
  fieldId: string;
  key?: string;
  hint?: string;
  padding?: string;
}
export declare const FormEntry: FunctionalComponent<FormEntryProps>;
export declare const CheckboxFormEntry: FunctionalComponent<FormEntryProps>;
