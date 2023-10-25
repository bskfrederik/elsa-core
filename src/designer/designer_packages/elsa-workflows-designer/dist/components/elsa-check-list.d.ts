import type { Components, JSX } from "../types/components";

interface ElsaCheckList extends Components.ElsaCheckList, HTMLElement {}
export const ElsaCheckList: {
  prototype: ElsaCheckList;
  new (): ElsaCheckList;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
