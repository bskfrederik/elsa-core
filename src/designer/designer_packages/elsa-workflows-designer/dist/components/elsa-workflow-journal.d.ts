import type { Components, JSX } from "../types/components";

interface ElsaWorkflowJournal extends Components.ElsaWorkflowJournal, HTMLElement {}
export const ElsaWorkflowJournal: {
  prototype: ElsaWorkflowJournal;
  new (): ElsaWorkflowJournal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
