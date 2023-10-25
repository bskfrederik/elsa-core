import type { Components, JSX } from "../types/components";

interface ElsaWorkflowInstanceViewer extends Components.ElsaWorkflowInstanceViewer, HTMLElement {}
export const ElsaWorkflowInstanceViewer: {
  prototype: ElsaWorkflowInstanceViewer;
  new (): ElsaWorkflowInstanceViewer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
