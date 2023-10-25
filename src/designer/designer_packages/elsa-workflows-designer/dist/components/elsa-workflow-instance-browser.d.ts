import type { Components, JSX } from "../types/components";

interface ElsaWorkflowInstanceBrowser extends Components.ElsaWorkflowInstanceBrowser, HTMLElement {}
export const ElsaWorkflowInstanceBrowser: {
  prototype: ElsaWorkflowInstanceBrowser;
  new (): ElsaWorkflowInstanceBrowser;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
