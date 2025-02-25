'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const index$1 = require('./index-f9ac3f14.js');
const utils = require('./utils-c73bd981.js');
const notificationService = require('./notification-service-99c155e7.js');
const toolbarComponentStore = require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./lodash-c9901408.js');

const Blank = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    return index.h("div", { class: "tw-bg-gray-800 tw-overflow-hidden tw-h-screen" });
  }
};

const ModalDialog = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.shown = index.createEvent(this, "shown", 7);
    this.hidden = index.createEvent(this, "hidden", 7);
    this.actionInvoked = index.createEvent(this, "actionInvoked", 7);
    this.handleDefaultClose = async () => {
      await this.hide();
    };
    this.modalDialogInstance = undefined;
    this.actions = [];
    this.size = 'tw-max-w-6xl';
    this.type = utils.ModalType.Default;
    this.autoHide = true;
    this.content = () => index.h("div", null);
    this.isVisible = true;
  }
  async show(animate = true) {
    this.showInternal(animate);
  }
  async hide(animate = true) {
    this.hideInternal(animate);
  }
  showInternal(animate) {
    this.isVisible = true;
    if (!animate) {
      this.overlay.style.opacity = '1';
      this.modal.style.opacity = '1';
    }
    index$1.enter(this.overlay);
    index$1.enter(this.modal).then(this.shown.emit);
  }
  hideInternal(animate) {
    if (!animate) {
      this.isVisible = false;
    }
    index$1.leave(this.overlay);
    index$1.leave(this.modal).then(() => {
      this.isVisible = false;
      this.hidden.emit();
    });
  }
  async handleKeyDown(e) {
    if (this.isVisible && e.key === 'Escape') {
      await this.hide(true);
    }
  }
  componentDidRender() {
    if (this.isVisible) {
      index$1.enter(this.overlay);
      index$1.enter(this.modal).then(this.shown.emit);
    }
    this.modalDialogInstance.modalDialogContentRef = this.element.querySelector('.modal-content').children[0];
  }
  render() {
    const actions = this.actions;
    const content = this.content();
    return (index.h(index.Host, { class: { 'hidden': !this.isVisible, 'tw-block': true } }, index.h("div", { class: "tw-fixed tw-z-50 tw-inset-0 tw-overflow-y-auto" }, index.h("div", { class: "tw-flex tw-items-end tw-justify-center tw-min-tw-h-screen tw-pt-4 tw-px-4 tw-pb-20 tw-text-center sm:tw-block sm:tw-p-0" }, index.h("div", { ref: el => this.overlay = el, onClick: () => this.hide(true), "data-transition-enter": "tw-ease-out tw-duration-300", "data-transition-enter-start": "tw-opacity-0", "data-transition-enter-end": "tw-opacity-0", "data-transition-leave": "tw-ease-in tw-duration-200", "data-transition-leave-start": "tw-opacity-0", "data-transition-leave-end": "tw-opacity-0", class: "hidden tw-fixed tw-inset-0 tw-transition-opacity", "aria-hidden": "true" }, index.h("div", { class: "tw-absolute tw-inset-0 tw-bg-gray-500 tw-opacity-75" })), index.h("span", { class: "hidden sm:tw-inline-block sm:tw-align-middle sm:tw-h-screen", "aria-hidden": "true" }), index.h("div", { ref: el => this.modal = el, "data-transition-enter": "tw-ease-out tw-duration-300", "data-transition-enter-start": "tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95", "data-transition-enter-end": "tw-opacity-0 tw-translate-y-0 sm:tw-scale-100", "data-transition-leave": "tw-ease-in tw-duration-200", "data-transition-leave-start": "tw-opacity-0 tw-translate-y-0 sm:tw-scale-100", "data-transition-leave-end": "tw-opacity-0 tw-translate-y-4 sm:tw-translate-y-0 sm:tw-scale-95", class: `hidden tw-inline-block sm:tw-align-top tw-bg-white tw-rounded-lg tw-text-left tw-overflow-visible tw-shadow-xl tw-transform tw-transition-all sm:tw-my-8 sm:tw-align-top ${this.size}`, role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-headline" }, index.h("div", { class: "modal-content" }, content), index.h("div", { class: "tw-bg-gray-50 tw-px-4 tw-py-3 sm:tw-px-6 sm:tw-flex sm:tw-flex-row-reverse" }, actions.map(action => {
      if (action.display)
        return action.display(action);
      const cssClass = action.isPrimary
        ? 'tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700 tw-border-transparent focus:tw-ring-blue-500'
        : action.isDangerous ? 'tw-text-white tw-bg-red-600 hover:tw-bg-red-700 tw-border-transparent focus:tw-ring-red-500'
          : 'tw-bg-white tw-border-gray-300 tw-text-gray-700 hover:tw-bg-gray-50 focus:tw-ring-blue-500';
      const buttonType = action.type == utils.ModalActionType.Submit ? 'submit' : 'button';
      const cancelHandler = () => this.hideInternal(true);
      const defaultHandler = (args) => this.actionInvoked.emit(args);
      const clickHandler = !!action.onClick ? action.onClick : action.type == utils.ModalActionType.Cancel ? cancelHandler : defaultHandler;
      return index.h("button", { type: buttonType, onClick: e => {
          clickHandler({ e, action, instance: this.modalDialogInstance });
          if (this.autoHide)
            this.hideInternal(true);
        }, class: `${cssClass} tw-mt-3 tw-w-full tw-inline-flex tw-justify-center tw-rounded-md tw-border tw-shadow-sm tw-px-4 tw-py-2 tw-text-base tw-font-medium focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 sm:tw-mt-0 sm:tw-ml-3 sm:tw-w-auto sm:tw-text-sm` }, action.text);
    })))))));
  }
  get element() { return index.getElement(this); }
};

const ModalDialogContainer = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onInstanceHidden = (instance) => {
      let instances = utils.state.instances;
      instances = instances.filter(x => x != instance);
      utils.state.instances = instances;
    };
  }
  render() {
    const instances = utils.state.instances;
    return (index.h(index.Host, null, instances.map(instance => {
      var _a, _b, _c;
      const options = instance.options;
      const actions = (_a = options === null || options === void 0 ? void 0 : options.actions) !== null && _a !== void 0 ? _a : [];
      const modalType = (_b = options === null || options === void 0 ? void 0 : options.modalType) !== null && _b !== void 0 ? _b : utils.ModalType.Default;
      const size = (_c = options === null || options === void 0 ? void 0 : options.size) !== null && _c !== void 0 ? _c : 'sm:tw-max-w-6xl';
      return (index.h("elsa-modal-dialog", { ref: el => instance.modalDialogRef = el, type: modalType, size: size, modalDialogInstance: instance, content: instance.content, actions: actions, onActionInvoked: e => {
          const args = e.detail;
          instance.actionInvoked(args);
        }, onHidden: () => this.onInstanceHidden(instance) }));
    })));
  }
};

const NotificationTemplate = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
    const { type = notificationService.NotificationDisplayType.Success } = notification;
    return (index.h("div", { class: "tw-flex tw-items-start tw-z-30" }, index.h("div", { class: "tw-flex-shrink-0 tw-z-30" }, type === notificationService.NotificationDisplayType.Success ?
      index.h("svg", { class: "tw-h-6 tw-w-6 tw-text-green-400 tw-z-30", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", "aria-hidden": "true" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })) : null, type === notificationService.NotificationDisplayType.InProgress ?
      index.h("svg", { class: "tw-animate-spin tw-h-6 tw-w-6 tw-text-green-400", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, index.h("circle", { class: "tw-opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", "stroke-width": "4" }), index.h("path", { class: "tw-opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" })) : null, type === notificationService.NotificationDisplayType.Warning ?
      index.h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", class: "tw-w-6 tw-h-6 tw-text-orange-600" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" }))
      : null, type === notificationService.NotificationDisplayType.Error ?
      index.h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", class: "tw-w-6 tw-h-6 tw-text-red-400" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" }))
      : null), index.h("div", { class: "tw-ml-3 tw-w-0 tw-flex-1 tw-pt-0.5 tw-z-30" }, index.h("p", { class: "tw-text-sm tw-font-medium tw-text-gray-900" }, notification.title), index.h("p", { class: "tw-mt-1 tw-text-sm tw-text-gray-500", innerHTML: utils.formatTextWithLineBreaks(notification.text) }), index.h("p", { class: "tw-mt-1 tw-text-sm tw-text-gray-700 tw-text-right" }, this.time)), index.h("div", { class: "tw-ml-4 tw-flex tw-flex-shrink-0 tw-z-30" }, index.h("slot", { name: "close-button" }))));
  }
};

const NotificationManager = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.deleteNotif = (id) => {
      notificationService.state.notifications = notificationService.state.notifications.filter(item => item.id !== id);
    };
    this.handleToggle = () => {
      NotificationManager.NotificationServiceLocal.toggleNotification();
      index$1.toggle(this.modal);
    };
    this.modalState = undefined;
  }
  onModalStateChange(value) {
    index$1.toggle(this.modal);
  }
  closeMenu() {
    index$1.leave(this.modal);
  }
  toggleMenu() {
    index$1.toggle(this.modal);
  }
  render() {
    const { notifications } = notificationService.state;
    return (index.h("div", null, index.h("div", { ref: el => this.modal = el, "data-transition-enter": "tw-transform tw-transition tw-ease-in-out tw-duration-100 sm:tw-duration-100", "data-transition-enter-start": "tw-translate-x-full", "data-transition-leave": "tw-transform tw-transition tw-ease-in-out tw-duration-100 sm:tw-duration-100", "data-transition-leave-start": "tw-translate-x-0", "data-transition-leave-end": "tw-translate-x-full", class: 'hidden tw-z-50 tw-top-16 tw-fixed tw-inset-y-0 tw-right-0 tw-flex tw-max-w-full tw-pl-10 sm:tw-pl-16' }, index.h("div", { class: "tw-w-screen tw-max-w-md" }, index.h("div", { class: "tw-flex tw-h-full tw-flex-col tw-overflow-y-scroll tw-bg-white tw-shadow-xl" }, index.h("div", { class: "tw-p-6 tw-border-b" }, index.h("div", { class: "tw-flex tw-items-start tw-justify-between" }, index.h("h2", { class: "tw-text-lg tw-font-medium tw-text-gray-900", id: "slide-over-title" }, "Notifications"), index.h("div", { class: "tw-ml-3 tw-flex tw-h-7 tw-items-center" }, index.h("button", { onClick: () => this.handleToggle(), type: "button", class: "tw-rounded-md tw-bg-white tw-text-gray-400 hover:tw-text-gray-500 focus:tw-ring-2 focus:tw-ring-blue-500" }, index.h("span", { class: "tw-sr-only" }, "Close panel"), index.h("svg", { class: "tw-h-6 tw-w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", "aria-hidden": "true" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M6 18L18 6M6 6l12 12" })))))), notifications.length === 0 && index.h("div", { class: "tw-p-6 tw-pointer-events-auto tw-w-full tw-overflow-hidden tw-border-b tw-ring-1 tw-ring-black tw-ring-opacity-5" }, "There are no notifications"), index.h("ul", { role: "list", class: "tw-pointer-events-auto tw-overflow-y-auto tw-flex-1 tw-divide-y tw-divide-gray-200 tw-overflow-y-auto" }, notifications.map(notification => (index.h("li", null, index.h("div", { class: "tw-border-b tw-group tw-relative tw-flex tw-items-center tw-py-6 tw-px-5" }, index.h("a", { href: "#", class: "-tw-m-1 tw-block tw-flex-1 tw-p-1" }, index.h("elsa-notification-template", { notification: notification }, index.h("div", { slot: "close-button", class: "tw-relative tw-ml-2 tw-inline-block tw-flex-shrink-0 tw-text-left" }, index.h("button", { onClick: () => this.deleteNotif(notification.id) }, index.h("svg", { class: "tw-h-6 tw-w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", "stroke-width": "1.5", stroke: "currentColor", "aria-hidden": "true" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", d: "M6 18L18 6M6 6l12 12" }))))))))))))))));
  }
  static get watchers() { return {
    "modalState": ["onModalStateChange"]
  }; }
};
NotificationManager.NotificationServiceLocal = notificationService.NotificationService;

const studioCss = ".elsa-studio-content{position:absolute;top:64px;left:0;right:0;bottom:0}";

const Studio = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.initializing = index.createEvent(this, "initializing", 7);
    this.serverUrl = undefined;
    this.monacoLibPath = undefined;
    this.enableFlexiblePorts = undefined;
    this.disableAuth = undefined;
    this.eventBus = utils.Container.get(utils.EventBus);
    this.workflowDefinitionManager = utils.Container.get(utils.WorkflowDefinitionManager);
    this.pluginRegistry = utils.Container.get(utils.PluginRegistry);
  }
  handleServerUrl(value) {
    const settings = utils.Container.get(utils.ServerSettings);
    settings.baseAddress = value;
  }
  handleMonacoLibPath(value) {
    const settings = utils.Container.get(utils.MonacoEditorSettings);
    settings.monacoLibPath = value;
  }
  async componentWillLoad() {
    const pluginRegistry = utils.Container.get(utils.PluginRegistry);
    const context = { container: utils.Container, pluginRegistry };
    this.initializing.emit(context);
    this.handleMonacoLibPath(this.monacoLibPath);
    this.handleServerUrl(this.serverUrl);
    utils.state$1.enableFlexiblePorts = this.enableFlexiblePorts;
    await this.eventBus.emit(utils.EventTypes.Studio.Initializing, this);
    await this.pluginRegistry.initialize();
    // If we have a valid session, emit the signed in event so that descriptors will be loaded.
    const authContext = utils.Container.get(utils.AuthContext);
    if (this.disableAuth || authContext.getIsSignedIn()) {
      const eventBus = utils.Container.get(utils.EventBus);
      await eventBus.emit(utils.EventTypes.Auth.SignedIn);
    }
  }
  render() {
    return index.h(index.Host, null, index.h("elsa-workflow-toolbar", null), index.h("div", { class: "elsa-studio-content" }, utils.state$2.activeComponentFactory()), utils.state$2.modalComponents.map(modal => modal()), index.h("elsa-modal-dialog-container", null));
  }
  get el() { return index.getElement(this); }
  static get watchers() { return {
    "serverUrl": ["handleServerUrl"],
    "monacoLibPath": ["handleMonacoLibPath"]
  }; }
};
Studio.style = studioCss;

const ToastManager = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
  }
  render() {
    const { notifications } = notificationService.state;
    const notification = notifications.find(notification => notification.showToast !== false);
    if (notification) {
      return (index.h("elsa-toast-notification", { notification: notification }));
    }
    else {
      return null;
    }
  }
};

const ToastNotification = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.handleClick = () => {
      this.hideToast();
    };
    this.hideToast = () => {
      notificationService.NotificationService.hideToast(this.notification);
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
    const { infoPanelBoolean } = notificationService.state;
    return ((this.notification.showToast !== false && !infoPanelBoolean) ? (index.h("div", { class: "tw-mt-2 tw-pr-2 tw-flex tw-w-full tw-flex-col tw-items-center tw-space-y-4 sm:tw-items-end" }, index.h("div", { class: "tw-pointer-events-auto tw-w-full tw-max-w-sm tw-rounded-lg tw-z-50 tw-bg-white tw-shadow-lg tw-ring-1 tw-ring-black tw-ring-opacity-5" }, index.h("div", { class: "tw-p-4 tw-z-30" }, index.h("elsa-notification-template", { notification: this.notification }, index.h("siv", { slot: "close-button" }, index.h("button", { type: "button", onClick: this.handleClick, class: "tw-inline-flex tw-rounded-md tw-bg-white tw-text-gray-400 hover:tw-text-gray-500 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-ring-offset-2" }, index.h("span", { class: "tw-sr-only" }, "Close"), index.h("svg", { class: "tw-h-5 tw-w-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, index.h("path", { d: "M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" }))))))))) : null);
  }
};

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
  utils.Service(),
  __metadata("design:paramtypes", [utils.ElsaClientProvider])
], PackagesApi);

const WorkflowToolbar = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.onNotificationClick = async (e) => {
      e.stopPropagation();
      await this.eventBus.emit(NotificationEventTypes.Toggle, this);
      WorkflowToolbar.NotificationService.toggleNotification();
    };
    this.eventBus = utils.Container.get(utils.EventBus);
    this.packagesApi = utils.Container.get(PackagesApi);
  }
  async componentWillLoad() {
    var response = await this.packagesApi.getVersion();
    return this.currentElsaVersion = response.packageVersion;
  }
  render() {
    const logoPath = index.getAssetPath('./assets/logo.png');
    const infoPanelBoolean = notificationService.state.infoPanelBoolean;
    return (index.h("div", null, index.h("nav", { class: "tw-bg-gray-800" }, index.h("div", { class: "tw-mx-auto tw-px-2 sm:tw-px-6 lg:tw-px-6" }, index.h("div", { class: "tw-flex tw-items-center tw-h-16" }, index.h("div", { class: "tw-flex-shrink-0" }, index.h("div", { class: "tw-flex tw-items-end tw-space-x-1" }, index.h("div", null, index.h("a", { href: "#" }, index.h("img", { class: "tw-h-6 tw-w-6", src: logoPath, alt: "Workflow" }))), index.h("div", null, index.h("span", { class: "tw-text-gray-300 tw-text-sm" }, this.currentElsaVersion)))), index.h("div", { class: "tw-flex-grow" }), index.h("div", { class: "tw-relative tw-flex tw-items-center tw-justify-end tw-h-16" }, index.h("div", { class: "tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2 sm:tw-static sm:tw-inset-auto sm:tw-ml-6 sm:tw-pr-0 tw-z-40" }, index.h("div", { class: "tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-pr-2 sm:tw-static sm:tw-inset-auto sm:tw-ml-6 sm:tw-pr-0 tw-z-40" }, index.h("button", { onClick: e => this.onNotificationClick(e), type: "button", class: "tw-bg-gray-800 tw-p-1 tw-rounded-full tw-text-gray-400 hover:tw-text-white focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2 focus:tw-ring-offset-gray-800 focus:tw-ring-white tw-mr-4" }, index.h("span", { class: "tw-sr-only" }, "View notifications"), index.h("svg", { class: "tw-h-6 tw-w-6", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", "aria-hidden": "true" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }))), toolbarComponentStore.state.components.map(component => (index.h("div", { class: "tw-flex-shrink-0 tw-mr-4" }, component()))), index.h("elsa-workflow-toolbar-menu", null))))))), index.h("elsa-notifications-manager", { modalState: infoPanelBoolean }), index.h("elsa-toast-manager", null)));
  }
  static get assetsDirs() { return ["assets"]; }
};
WorkflowToolbar.NotificationService = notificationService.NotificationService;

const WorkflowToolbarMenu = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.isMenuOpen = false;
    this.closeMenu = () => {
      index$1.leave(this.menu);
      this.isMenuOpen = false;
    };
    this.toggleMenu = () => {
      index$1.toggle(this.menu);
      this.isMenuOpen = !this.isMenuOpen;
      if (this.isMenuOpen) {
        notificationService.NotificationService.hideAllNotifications();
      }
    };
    this.onMenuItemClick = async (e, menuItem) => {
      e.preventDefault();
      await menuItem.onClick();
      this.closeMenu();
    };
    this.eventBus = utils.Container.get(utils.EventBus);
  }
  render() {
    const menuItems = utils.state$3.items;
    return (index.h(index.Host, { class: "tw-block", ref: el => this.element = el }, index.h("div", { class: "elsa-toolbar-menu-wrapper tw-relative" }, index.h("div", null, index.h("button", { onClick: () => this.toggleMenu(), type: "button", class: "tw-bg-gray-800 tw-flex tw-text-sm tw-rounded-full focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-offset-1 focus:tw-ring-gray-600", "aria-expanded": "false", "aria-haspopup": "true" }, index.h("span", { class: "tw-sr-only" }, "Open user menu"), index.h("svg", { class: "tw-h-8 tw-w-8 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" }, index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" })))), index.h("div", { ref: el => this.menu = el, "data-transition-enter": "tw-transition tw-ease-out tw-duration-100", "data-transition-enter-start": "tw-transform tw-opacity-0 tw-scale-95", "data-transition-enter-end": "tw-transform tw-opacity-100 tw-scale-100", "data-transition-leave": "tw-transition tw-ease-in tw-duration-75", "data-transition-leave-start": "tw-transform tw-opacity-100 tw-scale-100", "data-transition-leave-end": "tw-transform tw-opacity-0 tw-scale-95", class: "hidden tw-origin-top-right tw-absolute tw-right-0 tw-mt-2 tw-w-48 tw-rounded-md tw-shadow-lg tw-py-1 tw-bg-white tw-ring-1 tw-ring-black tw-ring-opacity-5 focus:tw-outline-none", role: "menu", "aria-orientation": "vertical", "aria-labelledby": "user-menu-button", tabindex: "-1" }, menuItems.map(menuItem => index.h("a", { onClick: e => this.onMenuItemClick(e, menuItem), href: "#", role: "menuitem", tabindex: "-1" }, menuItem.text))))));
  }
  onWindowClicked(event) {
    const target = event.target;
    if (!this.element.contains(target))
      this.closeMenu();
  }
};

exports.elsa_blank = Blank;
exports.elsa_modal_dialog = ModalDialog;
exports.elsa_modal_dialog_container = ModalDialogContainer;
exports.elsa_notification_template = NotificationTemplate;
exports.elsa_notifications_manager = NotificationManager;
exports.elsa_studio = Studio;
exports.elsa_toast_manager = ToastManager;
exports.elsa_toast_notification = ToastNotification;
exports.elsa_workflow_toolbar = WorkflowToolbar;
exports.elsa_workflow_toolbar_menu = WorkflowToolbarMenu;

//# sourceMappingURL=elsa-blank_10.cjs.entry.js.map