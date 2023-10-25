import type { Components, JSX } from "../types/components";

interface ElsaFormPanel extends Components.ElsaFormPanel, HTMLElement {}
export const ElsaFormPanel: {
  prototype: ElsaFormPanel;
  new (): ElsaFormPanel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
