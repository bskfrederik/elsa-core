import { h, Host } from '@stencil/core';
import 'reflect-metadata';
import { Container } from 'typedi';
import { AuthContext, EventBus, PluginRegistry, ServerSettings } from '../../services';
import { MonacoEditorSettings } from "../../services/monaco-editor-settings";
import { WorkflowDefinitionManager } from "../../modules/workflow-definitions/services/manager";
import { EventTypes } from "../../models";
import studioComponentStore from "../../data/studio-component-store";
import optionsStore from '../../data/designer-options-store';
export class Studio {
  constructor() {
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
    optionsStore.enableFlexiblePorts = this.enableFlexiblePorts;
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
    return h(Host, null, h("elsa-workflow-toolbar", null), h("div", { class: "elsa-studio-content" }, studioComponentStore.activeComponentFactory()), studioComponentStore.modalComponents.map(modal => modal()), h("elsa-modal-dialog-container", null));
  }
  static get is() { return "elsa-studio"; }
  static get originalStyleUrls() {
    return {
      "$": ["studio.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["studio.css"]
    };
  }
  static get properties() {
    return {
      "serverUrl": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "server",
        "reflect": false
      },
      "monacoLibPath": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "monaco-lib-path",
        "reflect": false
      },
      "enableFlexiblePorts": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "enable-flexible-ports",
        "reflect": false
      },
      "disableAuth": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "disable-auth",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "initializing",
        "name": "initializing",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "StudioInitializingContext",
          "resolved": "StudioInitializingContext",
          "references": {
            "StudioInitializingContext": {
              "location": "import",
              "path": "../../models/studio"
            }
          }
        }
      }];
  }
  static get elementRef() { return "el"; }
  static get watchers() {
    return [{
        "propName": "serverUrl",
        "methodName": "handleServerUrl"
      }, {
        "propName": "monacoLibPath",
        "methodName": "handleMonacoLibPath"
      }];
  }
}
//# sourceMappingURL=studio.js.map
