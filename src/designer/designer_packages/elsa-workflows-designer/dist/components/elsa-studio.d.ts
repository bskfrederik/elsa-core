import type { Components, JSX } from "../types/components";

interface ElsaStudio extends Components.ElsaStudio, HTMLElement {}
export const ElsaStudio: {
  prototype: ElsaStudio;
  new (): ElsaStudio;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
