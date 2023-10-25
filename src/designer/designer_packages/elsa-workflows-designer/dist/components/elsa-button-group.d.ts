import type { Components, JSX } from "../types/components";

interface ElsaButtonGroup extends Components.ElsaButtonGroup, HTMLElement {}
export const ElsaButtonGroup: {
  prototype: ElsaButtonGroup;
  new (): ElsaButtonGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
