import type { Components, JSX } from "../types/components";

interface ElsaHomePage extends Components.ElsaHomePage, HTMLElement {}
export const ElsaHomePage: {
  prototype: ElsaHomePage;
  new (): ElsaHomePage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
