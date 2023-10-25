import type { Components, JSX } from "../types/components";

interface ElsaVariablesViewer extends Components.ElsaVariablesViewer, HTMLElement {}
export const ElsaVariablesViewer: {
  prototype: ElsaVariablesViewer;
  new (): ElsaVariablesViewer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
