import { h } from '@stencil/core';
export class Toolbar {
  constructor() {
    this.zoomToFit = undefined;
  }
  render() {
    const layoutButtons = [{
        text: 'Horizontally',
        handler: () => this.autoLayout.emit('LR')
      }, {
        text: 'Vertically',
        handler: () => this.autoLayout.emit('TB')
      }];
    return (h("div", { class: "elsa-panel-toolbar tw-flex tw-justify-center tw-absolute tw-border-b tw-border-gray-200 tw-top-0 tw-px-1 tw-pl-4 tw-pb-2 tw-text-sm tw-bg-white tw-z-10 tw-space-x-2" }, h("elsa-dropdown-button", { text: "Auto-layout", theme: "Primary", items: layoutButtons, class: "tw-mt-2" }), h("button", { onClick: this.zoomToFit, class: "elsa-btn elsa-btn-primary" }, "Zoom to fit")));
  }
  static get is() { return "elsa-workflow-definition-editor-toolbar"; }
  static get properties() {
    return {
      "zoomToFit": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "() => Promise<void>",
          "resolved": "() => Promise<void>",
          "references": {
            "Promise": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get events() {
    return [{
        "method": "autoLayout",
        "name": "autoLayout",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "LayoutDirection",
          "resolved": "\"BT\" | \"LR\" | \"RL\" | \"TB\"",
          "references": {
            "LayoutDirection": {
              "location": "import",
              "path": "../../flowchart/models"
            }
          }
        }
      }];
  }
}
//# sourceMappingURL=toolbar.js.map
