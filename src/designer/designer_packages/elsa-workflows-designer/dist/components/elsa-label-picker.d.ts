import type { Components, JSX } from "../types/components";

interface ElsaLabelPicker extends Components.ElsaLabelPicker, HTMLElement {}
export const ElsaLabelPicker: {
  prototype: ElsaLabelPicker;
  new (): ElsaLabelPicker;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
