import type { Components, JSX } from "../types/components";

interface ElsaBlank extends Components.ElsaBlank, HTMLElement {}
export const ElsaBlank: {
  prototype: ElsaBlank;
  new (): ElsaBlank;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
