import type { Components, JSX } from "../types/components";

interface ElsaSlideOverPanel extends Components.ElsaSlideOverPanel, HTMLElement {}
export const ElsaSlideOverPanel: {
  prototype: ElsaSlideOverPanel;
  new (): ElsaSlideOverPanel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
