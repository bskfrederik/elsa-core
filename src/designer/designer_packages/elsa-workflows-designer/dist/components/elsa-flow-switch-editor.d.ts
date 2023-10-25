import type { Components, JSX } from "../types/components";

interface ElsaFlowSwitchEditor extends Components.ElsaFlowSwitchEditor, HTMLElement {}
export const ElsaFlowSwitchEditor: {
  prototype: ElsaFlowSwitchEditor;
  new (): ElsaFlowSwitchEditor;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
