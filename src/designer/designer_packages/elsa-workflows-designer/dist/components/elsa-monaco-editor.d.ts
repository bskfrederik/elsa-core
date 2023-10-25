import type { Components, JSX } from "../types/components";

interface ElsaMonacoEditor extends Components.ElsaMonacoEditor, HTMLElement {}
export const ElsaMonacoEditor: {
  prototype: ElsaMonacoEditor;
  new (): ElsaMonacoEditor;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
