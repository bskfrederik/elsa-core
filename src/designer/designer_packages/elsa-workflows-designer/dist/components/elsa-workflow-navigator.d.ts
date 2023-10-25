import type { Components, JSX } from "../types/components";

interface ElsaWorkflowNavigator extends Components.ElsaWorkflowNavigator, HTMLElement {}
export const ElsaWorkflowNavigator: {
  prototype: ElsaWorkflowNavigator;
  new (): ElsaWorkflowNavigator;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
