import type { Components, JSX } from "../types/components";

interface ElsaTypePickerInput extends Components.ElsaTypePickerInput, HTMLElement {}
export const ElsaTypePickerInput: {
  prototype: ElsaTypePickerInput;
  new (): ElsaTypePickerInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
