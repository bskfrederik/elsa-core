import { proxyCustomElement, HTMLElement, getAssetPath, h } from '@stencil/core/internal/client';
import { ab as Service, a as ElsaClientProvider, C as Container, B as EventBus } from './utils.js';
import { s as state } from './toolbar-component-store.js';
import './descriptors-store.js';
import { N as NotificationService, s as state$1 } from './notification-service.js';
import { d as defineCustomElement$5 } from './notification-template.js';
import { d as defineCustomElement$4 } from './notification-manager.js';
import { d as defineCustomElement$3 } from './toast-manager.js';
import { d as defineCustomElement$2 } from './toast-notification.js';
import { d as defineCustomElement$1 } from './workflow-toolbar-menu.js';

const NotificationEventTypes = {
  Add: 'notification-added',
  Update: 'notification-updated',
  Toggle: 'notification-toggle',
};

var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
let PackagesApi = class PackagesApi {
  constructor(provider) {
    this.getHttpClient = async () => await this.provider.getHttpClient();
    this.provider = provider;
  }
  async getVersion() {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`package/version`);
    return response.data;
  }
};
PackagesApi = __decorate([
  Service(),
  __metadata("design:paramtypes", [ElsaClientProvider])
], PackagesApi);

const WorkflowToolbar = /*@__PURE__*/ proxyCustomElement(class WorkflowToolbar extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onNotificationClick = async (e) => {
      e.stopPropagation();
      await this.eventBus.emit(NotificationEventTypes.Toggle, this);
      WorkflowToolbar.NotificationService.toggleNotification();
    };
    this.eventBus = Container.get(EventBus);
    this.packagesApi = Container.get(PackagesApi);
  }
  async componentWillLoad() {
    var response = await this.packagesApi.getVersion();
    return this.currentElsaVersion = response.packageVersion;
  }
  render() {
    const logoPath = getAssetPath('./assets/logo.png');
    const infoPanelBoolean = state$1.infoPanelBoolean;
    return (h("div", null, h("nav", { class: "tw-bg-gray-800" }, h("div", { class: "tw-mx-auto tw-px-2 sm:tw-px-6 lg:tw-px-6" }, h("div", { class: "tw-flex tw-items-center tw-h-16" }, h("div", { class: "tw-flex-shrink-0" }, h("div", { class: "tw-flex tw-items-end tw-space-x-1" }, h("div", null, h("a", { href: "#" }, h("img", { class: "tw-h-6 tw-w-6", src: logoPath, alt: "Workflow" }))), h("div", null, h("span", { class: "tw-text-gray-300 tw-text-sm" }, this.currentElsaVersion)))), h("div", { class: "tw-flex-grow" }), h("div", { class: "tw-relative tw-flex tw-items-center tw-justify-end tw-h-16" }, h("div", { class: "tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2 sm:tw-static sm:tw-inset-auto sm:tw-ml-6 sm:tw-pr-0 tw-z-40" }, h("div", { class: "tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2 sm:tw-static sm:tw-inset-auto sm:tw-ml-6 sm:tw-pr-0 tw-z-40" }, h("button", { onClick: e => this.onNotificationClick(e), type: "button", class: "tw-bg-gray-800 tw-p-1 tw-rounded-full tw-text-gray-400 hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800 focus:tw-ring-white tw-mr-4" }, h("span", { class: "tw-sr-only" }, "View notifications"), h("svg", { class: "tw-h-6 tw-w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }))), state.components.map(component => (h("div", { class: "tw-flex-shrink-0 tw-mr-4" }, component()))), h("elsa-workflow-toolbar-menu", null))))))), h("elsa-notifications-manager", { modalState: infoPanelBoolean }), h("elsa-toast-manager", null)));
  }
  static get assetsDirs() { return ["assets"]; }
}, [0, "elsa-workflow-toolbar"]);
WorkflowToolbar.NotificationService = NotificationService;
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-toolbar", "elsa-notification-template", "elsa-notifications-manager", "elsa-toast-manager", "elsa-toast-notification", "elsa-workflow-toolbar-menu"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-toolbar":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WorkflowToolbar);
      }
      break;
    case "elsa-notification-template":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "elsa-notifications-manager":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "elsa-toast-manager":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "elsa-toast-notification":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "elsa-workflow-toolbar-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WorkflowToolbar as W, defineCustomElement as d };

//# sourceMappingURL=workflow-toolbar.js.map