import type { Components, JSX } from "../types/components";

interface ElsaWidgets extends Components.ElsaWidgets, HTMLElement {}
export const ElsaWidgets: {
  prototype: ElsaWidgets;
  new (): ElsaWidgets;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
