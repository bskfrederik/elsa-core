import { r as registerInstance, e as createEvent, h, k as Host, j as getElement } from './index-dc0ae4f5.js';
import './Reflect-563aa1b4.js';
import { C as Container } from './index-1637bf51.js';
import { D as EventBus, a6 as WorkflowDefinitionManager, P as PluginRegistry, S as ServerSettings, T as MonacoEditorSettings, aa as state, $ as EventTypes, C as AuthContext, ab as state$1 } from './index-7d63808a.js';
import './_commonjsHelpers-a4f66ccd.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './lodash-cadbac1e.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';

const studioCss = ":host{position:absolute;left:0;top:0;right:0;bottom:0}.elsa-studio-content{position:absolute;top:64px;left:0;right:0;bottom:0}";

const Studio = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
  get el() { return getElement(this); }
  static get watchers() { return {
    "serverUrl": ["handleServerUrl"],
    "monacoLibPath": ["handleMonacoLibPath"]
  }; }
};
Studio.style = studioCss;

export { Studio as elsa_studio };

//# sourceMappingURL=elsa-studio.entry.js.map