import type { Components, JSX } from "../types/components";

interface ElsaDropdownInput extends Components.ElsaDropdownInput, HTMLElement {}
export const ElsaDropdownInput: {
  prototype: ElsaDropdownInput;
  new (): ElsaDropdownInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
