import type { Components, JSX } from "../types/components";

interface ElsaCheckListInput extends Components.ElsaCheckListInput, HTMLElement {}
export const ElsaCheckListInput: {
  prototype: ElsaCheckListInput;
  new (): ElsaCheckListInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
