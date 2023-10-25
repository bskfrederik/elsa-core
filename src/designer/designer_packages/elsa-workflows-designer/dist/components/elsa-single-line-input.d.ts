import type { Components, JSX } from "../types/components";

interface ElsaSingleLineInput extends Components.ElsaSingleLineInput, HTMLElement {}
export const ElsaSingleLineInput: {
  prototype: ElsaSingleLineInput;
  new (): ElsaSingleLineInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
