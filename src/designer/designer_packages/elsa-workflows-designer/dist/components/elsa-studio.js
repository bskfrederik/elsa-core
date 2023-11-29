import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import './toolbar-component-store.js';
import { C as Container, B as EventBus, $ as WorkflowDefinitionManager, P as PluginRegistry, S as ServerSettings, M as MonacoEditorSettings, aK as state, T as EventTypes, z as AuthContext, aL as state$1 } from './utils.js';
import './descriptors-store.js';
import { d as defineCustomElement$a } from './blank.js';
import { d as defineCustomElement$9 } from './modal-dialog.js';
import { d as defineCustomElement$8 } from './modal-dialog-container.js';
import { d as defineCustomElement$7 } from './notification-template.js';
import { d as defineCustomElement$6 } from './notification-manager.js';
import { d as defineCustomElement$5 } from './toast-manager.js';
import { d as defineCustomElement$4 } from './toast-notification.js';
import { d as defineCustomElement$3 } from './workflow-toolbar.js';
import { d as defineCustomElement$2 } from './workflow-toolbar-menu.js';

const studioCss = ".elsa-studio-content{position:absolute;top:64px;left:0;right:0;bottom:0}";

const Studio = /*@__PURE__*/ proxyCustomElement(class Studio extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.initializing = createEvent(this, "initializing", 7);
    this.serverUrl = undefined;
    this.monacoLibPath = undefined;
    this.enableFlexiblePorts = undefined;
    this.disableAuth = undefined;
    this.eventBus = Container.get(EventBus);
    this.workflowDefinitionManager = Container.get(WorkflowDefinitionManager);
    this.pluginRegistry = Container.get(PluginRegistry);
  }
  handleServerUrl(value) {
    const settings = Container.get(ServerSettings);
    settings.baseAddress = value;
  }
  handleMonacoLibPath(value) {
    const settings = Container.get(MonacoEditorSettings);
    settings.monacoLibPath = value;
  }
  async componentWillLoad() {
    const pluginRegistry = Container.get(PluginRegistry);
    const context = { container: Container, pluginRegistry };
    this.initializing.emit(context);
    this.handleMonacoLibPath(this.monacoLibPath);
    this.handleServerUrl(this.serverUrl);
    state.enableFlexiblePorts = this.enableFlexiblePorts;
    await this.eventBus.emit(EventTypes.Studio.Initializing, this);
    await this.pluginRegistry.initialize();
    // If we have a valid session, emit the signed in event so that descriptors will be loaded.
    const authContext = Container.get(AuthContext);
    if (this.disableAuth || authContext.getIsSignedIn()) {
      const eventBus = Container.get(EventBus);
      await eventBus.emit(EventTypes.Auth.SignedIn);
    }
  }
  render() {
    return h(Host, null, h("elsa-workflow-toolbar", null), h("div", { class: "elsa-studio-content" }, state$1.activeComponentFactory()), state$1.modalComponents.map(modal => modal()), h("elsa-modal-dialog-container", null));
  }
  get el() { return this; }
  static get watchers() { return {
    "serverUrl": ["handleServerUrl"],
    "monacoLibPath": ["handleMonacoLibPath"]
  }; }
  static get style() { return studioCss; }
}, [0, "elsa-studio", {
    "serverUrl": [1, "server"],
    "monacoLibPath": [1, "monaco-lib-path"],
    "enableFlexiblePorts": [4, "enable-flexible-ports"],
    "disableAuth": [4, "disable-auth"]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-studio", "elsa-blank", "elsa-modal-dialog", "elsa-modal-dialog-container", "elsa-notification-template", "elsa-notifications-manager", "elsa-toast-manager", "elsa-toast-notification", "elsa-workflow-toolbar", "elsa-workflow-toolbar-menu"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-studio":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Studio);
      }
      break;
    case "elsa-blank":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "elsa-modal-dialog":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "elsa-modal-dialog-container":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "elsa-notification-template":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "elsa-notifications-manager":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "elsa-toast-manager":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "elsa-toast-notification":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "elsa-workflow-toolbar":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "elsa-workflow-toolbar-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ElsaStudio = Studio;
const defineCustomElement = defineCustomElement$1;

export { ElsaStudio, defineCustomElement };

//# sourceMappingURL=elsa-studio.js.map