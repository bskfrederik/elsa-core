import type { Components, JSX } from "../types/components";

interface ElsaNotificationsManager extends Components.ElsaNotificationsManager, HTMLElement {}
export const ElsaNotificationsManager: {
  prototype: ElsaNotificationsManager;
  new (): ElsaNotificationsManager;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
