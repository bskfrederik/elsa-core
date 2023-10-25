import type { Components, JSX } from "../types/components";

interface ElsaWorkflowInstanceProperties extends Components.ElsaWorkflowInstanceProperties, HTMLElement {}
export const ElsaWorkflowInstanceProperties: {
  prototype: ElsaWorkflowInstanceProperties;
  new (): ElsaWorkflowInstanceProperties;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
