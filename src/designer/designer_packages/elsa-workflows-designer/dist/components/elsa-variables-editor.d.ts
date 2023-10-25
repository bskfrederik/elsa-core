import type { Components, JSX } from "../types/components";

interface ElsaVariablesEditor extends Components.ElsaVariablesEditor, HTMLElement {}
export const ElsaVariablesEditor: {
  prototype: ElsaVariablesEditor;
  new (): ElsaVariablesEditor;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
