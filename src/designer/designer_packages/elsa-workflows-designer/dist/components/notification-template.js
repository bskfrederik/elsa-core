import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { a as NotificationDisplayType } from './notification-service.js';
import { v as formatTextWithLineBreaks } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';

const NotificationTemplate = /*@__PURE__*/ proxyCustomElement(class NotificationTemplate extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.notification = undefined;
    this.time = undefined;
  }
  connectedCallback() {
    this.time = this.notification.timestamp.fromNow();
    this.timer = window.setInterval(() => {
      this.time = this.notification.timestamp.fromNow();
    }, 60 * 1000);
  }
  disconnectedCallback() {
    window.clearInterval(this.timer);
  }
  render() {
    const { notification } = this;
    const { type = NotificationDisplayType.Success } = notification;
    return (h("div", { class: "tw-flex tw-items-start tw-z-30" }, h("div", { class: "tw-flex-shrink-0 tw-z-30" }, type === NotificationDisplayType.Success ?
      h("svg", { class: "tw-h-6 tw-w-6 tw-text-green-400 tw-z-30", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", "aria-hidden": "true" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) : null, type === NotificationDisplayType.InProgress ?
      h("svg", { class: "tw-animate-spin tw-h-6 tw-w-6 tw-text-green-400", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, h("circle", { class: "tw-opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", "stroke-width": "4" }), h("path", { class: "tw-opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })) : null, type === NotificationDisplayType.Warning ?
      h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", class: "tw-w-6 tw-h-6 tw-text-orange-600" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" }))
      : null, type === NotificationDisplayType.Error ?
      h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", class: "tw-w-6 tw-h-6 tw-text-red-400" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" }))
      : null), h("div", { class: "tw-ml-3 tw-w-0 tw-flex-1 tw-pt-0.5 tw-z-30" }, h("p", { class: "tw-text-sm tw-font-medium tw-text-gray-900" }, notification.title), h("p", { class: "tw-mt-1 tw-text-sm tw-text-gray-500", innerHTML: formatTextWithLineBreaks(notification.text) }), h("p", { class: "tw-mt-1 tw-text-sm tw-text-gray-700 tw-text-right" }, this.time)), h("div", { class: "tw-ml-4 tw-flex tw-flex-shrink-0 tw-z-30" }, h("slot", { name: "close-button" }))));
  }
}, [4, "elsa-notification-template", {
    "notification": [16],
    "time": [32]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-notification-template"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-notification-template":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, NotificationTemplate);
      }
      break;
  } });
}

export { NotificationTemplate as N, defineCustomElement as d };

//# sourceMappingURL=notification-template.js.map