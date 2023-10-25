import type { Components, JSX } from "../types/components";

interface ElsaSwitchEditor extends Components.ElsaSwitchEditor, HTMLElement {}
export const ElsaSwitchEditor: {
  prototype: ElsaSwitchEditor;
  new (): ElsaSwitchEditor;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
