import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { s as state } from './notification-store-40f3cb5a.js';
import { N as NotificationService } from './notification-service-ffb5a824.js';
import './index-4ac684d0.js';

const ToastNotification = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.handleClick = () => {
      this.hideToast();
    };
    this.hideToast = () => {
      NotificationService.hideToast(this.notification);
    };
    this.notification = undefined;
    this.showDuration = 6000;
  }
  componentDidRender() {
    this.timer = setTimeout(() => {
      this.hideToast();
    }, this.showDuration);
  }
  disconnectedCallback() {
    window.clearTimeout(this.timer);
    this.hideToast();
  }
  render() {
    const { infoPanelBoolean } = state;
    return ((this.notification.showToast !== false && !infoPanelBoolean) ? (h("div", { class: "tw-mt-2 tw-pr-2 tw-flex tw-w-full tw-flex-col tw-items-center tw-space-y-4 sm:tw-items-end" }, h("div", { class: "tw-pointer-events-auto tw-w-full tw-max-w-sm tw-rounded-lg tw-z-50 tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5" }, h("div", { class: "tw-p-4 tw-z-30" }, h("elsa-notification-template", { notification: this.notification }, h("siv", { slot: "close-button" }, h("button", { type: "button", onClick: this.handleClick, class: "tw-inline-flex tw-rounded-md tw-bg-white tw-text-gray-400 hover:tw-text-gray-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2" }, h("span", { class: "tw-sr-only" }, "Close"), h("svg", { class: "tw-h-5 tw-w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, h("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" }))))))))) : null);
  }
};

export { ToastNotification as elsa_toast_notification };

//# sourceMappingURL=elsa-toast-notification.entry.js.map