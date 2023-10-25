import type { Components, JSX } from "../types/components";

interface ElsaFlowchart extends Components.ElsaFlowchart, HTMLElement {}
export const ElsaFlowchart: {
  prototype: ElsaFlowchart;
  new (): ElsaFlowchart;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
