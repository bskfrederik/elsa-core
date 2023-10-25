import type { Components, JSX } from "../types/components";

interface ElsaLoginPage extends Components.ElsaLoginPage, HTMLElement {}
export const ElsaLoginPage: {
  prototype: ElsaLoginPage;
  new (): ElsaLoginPage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
