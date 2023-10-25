import type { Components, JSX } from "../types/components";

interface ElsaActivityProperties extends Components.ElsaActivityProperties, HTMLElement {}
export const ElsaActivityProperties: {
  prototype: ElsaActivityProperties;
  new (): ElsaActivityProperties;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
