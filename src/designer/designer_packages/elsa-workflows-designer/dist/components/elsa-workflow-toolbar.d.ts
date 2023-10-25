import type { Components, JSX } from "../types/components";

interface ElsaWorkflowToolbar extends Components.ElsaWorkflowToolbar, HTMLElement {}
export const ElsaWorkflowToolbar: {
  prototype: ElsaWorkflowToolbar;
  new (): ElsaWorkflowToolbar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
