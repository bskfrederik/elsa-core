import { h } from '@stencil/core';
import NotificationService from "../../notifications/notification-service";
export class PublishButton {
  constructor() {
    this.publishing = undefined;
    this.disabled = undefined;
  }
  onPublishClick() {
    this.publishClicked.emit({
      begin: () => this.publishing = true,
      complete: () => this.publishing = false
    });
  }
  onUnPublishClick() {
    this.unPublishClicked.emit();
  }
  async onExportClick() {
    this.exportClicked.emit();
  }
  async onImportClick() {
    this.importClicked.emit();
  }
  publishingIcon() {
    if (!this.publishing)
      return null;
    return h("svg", { class: "tw-animate-spin -tw-ml-1 tw-mr-3 tw-h-5 tw-w-5 tw-text-blue-400", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, h("circle", { class: "tw-opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", "stroke-width": "4" }), h("path", { class: "tw-opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }));
  }
  render() {
    const publishing = this.publishing;
    const items = [{
        text: 'Export',
        handler: () => this.onExportClick(),
        group: 1
      }, {
        text: 'Import',
        handler: () => this.onImportClick(),
        group: 1
      }, {
        text: 'Unpublish',
        handler: () => this.onUnPublishClick(),
        group: 2
      }];
    const mainItem = {
      text: publishing ? 'Publishing' : 'Publish',
      handler: publishing ? () => { } : () => this.onPublishClick()
    };
    return h("elsa-dropdown-button", { disabled: this.disabled, text: mainItem.text, handler: mainItem.handler, items: items, icon: this.publishingIcon(), onMenuOpened: () => NotificationService.hideAllNotifications() });
  }
  static get is() { return "elsa-workflow-publish-button"; }
  static get properties() {
    return {
      "publishing": {
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
        "attribute": "publishing",
        "reflect": false
      },
      "disabled": {
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
        "attribute": "disabled",
        "reflect": false
      }
    };
  }
  static get events() {
    return [{
        "method": "newClicked",
        "name": "newClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "publishClicked",
        "name": "publishClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "PublishClickedArgs",
          "resolved": "PublishClickedArgs",
          "references": {
            "PublishClickedArgs": {
              "location": "local",
              "path": "C:/dev/elsav3/elsa-core/src/designer/designer_packages/elsa-workflows-designer/src/modules/workflow-definitions/components/publish-button.tsx"
            }
          }
        }
      }, {
        "method": "unPublishClicked",
        "name": "unPublishClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "exportClicked",
        "name": "exportClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "importClicked",
        "name": "importClicked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "File",
          "resolved": "File",
          "references": {
            "File": {
              "location": "global"
            }
          }
        }
      }];
  }
}
//# sourceMappingURL=publish-button.js.map
