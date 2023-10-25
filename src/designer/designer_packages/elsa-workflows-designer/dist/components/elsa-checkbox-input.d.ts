import type { Components, JSX } from "../types/components";

interface ElsaCheckboxInput extends Components.ElsaCheckboxInput, HTMLElement {}
export const ElsaCheckboxInput: {
  prototype: ElsaCheckboxInput;
  new (): ElsaCheckboxInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
