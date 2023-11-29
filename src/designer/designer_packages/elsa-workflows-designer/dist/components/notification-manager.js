import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { t as toggle, l as leave } from './index3.js';
import { N as NotificationService, s as state } from './notification-service.js';
import { d as defineCustomElement$1 } from './notification-template.js';

const NotificationManager = /*@__PURE__*/ proxyCustomElement(class NotificationManager extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.deleteNotif = (id) => {
      state.notifications = state.notifications.filter(item => item.id !== id);
    };
    this.handleToggle = () => {
      NotificationManager.NotificationServiceLocal.toggleNotification();
      toggle(this.modal);
    };
    this.modalState = undefined;
  }
  onModalStateChange(value) {
    toggle(this.modal);
  }
  closeMenu() {
    leave(this.modal);
  }
  toggleMenu() {
    toggle(this.modal);
  }
  render() {
    const { notifications } = state;
    return (h("div", null, h("div", { ref: el => this.modal = el, "data-transition-enter": "tw-transform tw-transition tw-ease-in-out tw-duration-100 sm:tw-duration-100", "data-transition-enter-start": "tw-translate-x-full", "data-transition-leave": "tw-transform tw-transition tw-ease-in-out tw-duration-100 sm:tw-duration-100", "data-transition-leave-start": "tw-translate-x-0", "data-transition-leave-end": "tw-translate-x-full", class: 'hidden tw-z-50 tw-top-16 tw-fixed tw-inset-y-0 tw-right-0 tw-flex tw-max-w-full tw-pl-10 sm:tw-pl-16' }, h("div", { class: "tw-w-screen tw-max-w-md" }, h("div", { class: "tw-flex tw-h-full tw-flex-col tw-overflow-y-scroll tw-bg-white tw-shadow-xl" }, h("div", { class: "tw-p-6 tw-border-b" }, h("div", { class: "tw-flex tw-items-start tw-justify-between" }, h("h2", { class: "tw-text-lg tw-font-medium tw-text-gray-900", id: "slide-over-title" }, "Notifications"), h("div", { class: "tw-ml-3 tw-flex tw-h-7 tw-items-center" }, h("button", { onClick: () => this.handleToggle(), type: "button", class: "tw-rounded-md tw-bg-white tw-text-gray-400 hover:tw-text-gray-500 focus:tw-ring-2 focus:tw-ring-blue-500" }, h("span", { class: "tw-sr-only" }, "Close panel"), h("svg", { class: "tw-h-6 tw-w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", "aria-hidden": "true" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M6 18L18 6M6 6l12 12" })))))), notifications.length === 0 && h("div", { class: "tw-p-6 tw-pointer-events-auto tw-w-full tw-overflow-hidden tw-border-b tw-ring-1 tw-ring-black tw-ring-opacity-5" }, "There are no notifications"), h("ul", { role: "list", class: "tw-pointer-events-auto tw-overflow-y-auto tw-flex-1 tw-divide-y tw-divide-gray-200 tw-overflow-y-auto" }, notifications.map(notification => (h("li", null, h("div", { class: "tw-border-b tw-group tw-relative tw-flex tw-items-center tw-py-6 tw-px-5" }, h("a", { href: "#", class: "-tw-m-1 tw-block tw-flex-1 tw-p-1" }, h("elsa-notification-template", { notification: notification }, h("div", { slot: "close-button", class: "tw-relative tw-ml-2 tw-inline-block tw-flex-shrink-0 tw-text-left" }, h("button", { onClick: () => this.deleteNotif(notification.id) }, h("svg", { class: "tw-h-6 tw-w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", "aria-hidden": "true" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M6 18L18 6M6 6l12 12" }))))))))))))))));
  }
  static get watchers() { return {
    "modalState": ["onModalStateChange"]
  }; }
}, [0, "elsa-notifications-manager", {
    "modalState": [4, "modal-state"]
  }]);
NotificationManager.NotificationServiceLocal = NotificationService;
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-notifications-manager", "elsa-notification-template"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-notifications-manager":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, NotificationManager);
      }
      break;
    case "elsa-notification-template":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { NotificationManager as N, defineCustomElement as d };

//# sourceMappingURL=notification-manager.js.map