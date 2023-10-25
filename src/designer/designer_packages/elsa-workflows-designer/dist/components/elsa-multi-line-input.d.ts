import type { Components, JSX } from "../types/components";

interface ElsaMultiLineInput extends Components.ElsaMultiLineInput, HTMLElement {}
export const ElsaMultiLineInput: {
  prototype: ElsaMultiLineInput;
  new (): ElsaMultiLineInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
