import type { Components, JSX } from "../types/components";

interface ElsaMultiTextInput extends Components.ElsaMultiTextInput, HTMLElement {}
export const ElsaMultiTextInput: {
  prototype: ElsaMultiTextInput;
  new (): ElsaMultiTextInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
