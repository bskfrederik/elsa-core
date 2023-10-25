import type { Components, JSX } from "../types/components";

interface ElsaNotificationTemplate extends Components.ElsaNotificationTemplate, HTMLElement {}
export const ElsaNotificationTemplate: {
  prototype: ElsaNotificationTemplate;
  new (): ElsaNotificationTemplate;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
