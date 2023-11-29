import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { s as state } from './notification-service.js';
import { d as defineCustomElement$2 } from './notification-template.js';
import { d as defineCustomElement$1 } from './toast-notification.js';

const ToastManager = /*@__PURE__*/ proxyCustomElement(class ToastManager extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
  }
  render() {
    const { notifications } = state;
    const notification = notifications.find(notification => notification.showToast !== false);
    if (notification) {
      return (h("elsa-toast-notification", { notification: notification }));
    }
    else {
      return null;
    }
  }
}, [0, "elsa-toast-manager"]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-toast-manager", "elsa-notification-template", "elsa-toast-notification"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-toast-manager":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, ToastManager);
      }
      break;
    case "elsa-notification-template":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "elsa-toast-notification":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { ToastManager as T, defineCustomElement as d };

//# sourceMappingURL=toast-manager.js.map