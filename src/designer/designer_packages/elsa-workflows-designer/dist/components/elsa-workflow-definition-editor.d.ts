import type { Components, JSX } from "../types/components";

interface ElsaWorkflowDefinitionEditor extends Components.ElsaWorkflowDefinitionEditor, HTMLElement {}
export const ElsaWorkflowDefinitionEditor: {
  prototype: ElsaWorkflowDefinitionEditor;
  new (): ElsaWorkflowDefinitionEditor;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
