import type { Components, JSX } from "../types/components";

interface ElsaToastManager extends Components.ElsaToastManager, HTMLElement {}
export const ElsaToastManager: {
  prototype: ElsaToastManager;
  new (): ElsaToastManager;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
