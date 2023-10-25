import { r as registerInstance, i as getAssetPath, h } from './index-dc0ae4f5.js';
import { S as Service, C as Container } from './index-1637bf51.js';
import { a as ElsaClientProvider, D as EventBus } from './index-7d63808a.js';
import { s as state$1 } from './toolbar-component-store-1febdbe0.js';
import { N as NotificationService } from './notification-service-ffb5a824.js';
import { s as state } from './notification-store-40f3cb5a.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './lodash-cadbac1e.js';

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

const WorkflowToolbar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
    const infoPanelBoolean = state.infoPanelBoolean;
    return (h("div", null, h("nav", { class: "tw-bg-gray-800" }, h("div", { class: "tw-mx-auto tw-px-2 sm:tw-px-6 lg:tw-px-6" }, h("div", { class: "tw-flex tw-items-center tw-h-16" }, h("div", { class: "tw-flex-shrink-0" }, h("div", { class: "tw-flex tw-items-end tw-space-x-1" }, h("div", null, h("a", { href: "#" }, h("img", { class: "tw-h-6 tw-w-6", src: logoPath, alt: "Workflow" }))), h("div", null, h("span", { class: "tw-text-gray-300 tw-text-sm" }, this.currentElsaVersion)))), h("div", { class: "tw-flex-grow" }), h("div", { class: "tw-relative tw-flex tw-items-center tw-justify-end tw-h-16" }, h("div", { class: "tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2 sm:tw-static sm:tw-inset-auto sm:tw-ml-6 sm:tw-pr-0 tw-z-40" }, h("div", { class: "tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2 sm:tw-static sm:tw-inset-auto sm:tw-ml-6 sm:tw-pr-0 tw-z-40" }, h("button", { onClick: e => this.onNotificationClick(e), type: "button", class: "tw-bg-gray-800 tw-p-1 tw-rounded-full tw-text-gray-400 hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800 focus:tw-ring-white tw-mr-4" }, h("span", { class: "tw-sr-only" }, "View notifications"), h("svg", { class: "tw-h-6 tw-w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" }, h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }))), state$1.components.map(component => (h("div", { class: "tw-flex-shrink-0 tw-mr-4" }, component()))), h("elsa-workflow-toolbar-menu", null))))))), h("elsa-notifications-manager", { modalState: infoPanelBoolean }), h("elsa-toast-manager", null)));
  }
  static get assetsDirs() { return ["assets"]; }
};
WorkflowToolbar.NotificationService = NotificationService;

export { WorkflowToolbar as elsa_workflow_toolbar };

//# sourceMappingURL=elsa-workflow-toolbar.entry.js.map