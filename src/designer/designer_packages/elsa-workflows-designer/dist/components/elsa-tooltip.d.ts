import type { Components, JSX } from "../types/components";

interface ElsaTooltip extends Components.ElsaTooltip, HTMLElement {}
export const ElsaTooltip: {
  prototype: ElsaTooltip;
  new (): ElsaTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
