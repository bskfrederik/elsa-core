import { h } from '@stencil/core';
import { isNullOrWhitespace } from "../../../utils";
import { PanelActionType } from "./models";
export class FormPanel {
  constructor() {
    this.mainTitle = undefined;
    this.subTitle = undefined;
    this.isReadonly = undefined;
    this.orientation = 'Portrait';
    this.tabs = [];
    this.selectedTabIndex = undefined;
    this.actions = [];
  }
  render() {
    return this.renderPanel();
  }
  onTabClick(e, tab) {
    e.preventDefault();
    const selectedTabIndex = this.selectedTabIndex = this.tabs.findIndex(x => tab == x);
    this.selectedTabIndexChanged.emit({ selectedTabIndex: selectedTabIndex });
  }
  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    this.submitted.emit(formData);
  }
  renderPanel() {
    const tabs = this.tabs.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);
    const selectedTabIndex = this.selectedTabIndex;
    const actions = this.actions;
    const mainTitle = this.mainTitle;
    const subTitle = this.subTitle;
    const orientation = this.orientation;
    const readonly = this.isReadonly;
    return (h("div", { class: "tw-absolute tw-inset-0 tw-overflow-hidden" }, h("form", { class: "tw-h-full tw-flex tw-flex-col tw-bg-white tw-shadow-xl", onSubmit: e => this.onSubmit(e), method: "post" }, h("div", { class: "tw-flex tw-flex-col tw-flex-1" }, orientation == 'Portrait' && (h("div", { class: "tw-px-4 tw-py-6 tw-bg-gray-50" }, h("div", { class: "tw-flex tw-items-start tw-justify-between tw-space-x-3" }, h("div", { class: "tw-space-y-1" }, h("h2", { class: "tw-text-lg tw-font-medium tw-text-gray-900" }, mainTitle), !isNullOrWhitespace(subTitle) ? h("h3", { class: "tw-text-sm tw-text-gray-700" }, subTitle) : undefined)))), orientation == 'Landscape' && (h("div", { class: "tw-px-10 tw-py-4 tw-bg-gray-50" }, h("div", { class: "tw-flex tw-items-start tw-justify-between tw-space-x-3" }, h("div", { class: "tw-space-y-0" }, h("h2", { class: "tw-text-base tw-font-medium tw-text-gray-900" }, mainTitle), !isNullOrWhitespace(subTitle) ? h("h3", { class: "tw-text-xs tw-text-gray-700" }, subTitle) : undefined)))), h("div", { class: `tw-border-b tw-border-gray-200 ${orientation == 'Landscape' ? 'tw-pl-10' : 'tw-pl-4'}` }, h("nav", { class: "-tw-mb-px tw-flex tw-justify-start tw-space-x-5", "aria-label": "Tabs" }, tabs.map((tab, tabIndex) => {
      const cssClass = tabIndex == selectedTabIndex ? 'tw-border-blue-500 tw-text-blue-600' : 'tw-border-transparent tw-text-gray-500 hover:tw-text-gray-700 hover:tw-border-gray-300';
      return h("a", { href: "#", onClick: e => this.onTabClick(e, tab), class: `${cssClass} tw-py-4 tw-px-1 tw-text-center tw-border-b-2 tw-font-medium tw-text-sm` }, tab.displayText);
    }))), h("div", { class: `tw-flex-1 tw-relative` }, h("div", { class: `tw-absolute tw-inset-0 tw-overflow-y-scroll ${orientation == 'Landscape' ? 'tw-px-6' : ''}` }, tabs.map((tab, tabIndex) => {
      const cssClass = tabIndex == selectedTabIndex ? '' : 'hidden';
      return h("div", { class: cssClass }, h("fieldset", { disabled: readonly }, tab.content()));
    })))), actions.length > 0 ? (h("div", { class: "tw-flex-shrink-0 tw-px-4 tw-border-t tw-border-gray-200 tw-py-5 sm:tw-px-6" }, h("div", { class: "tw-space-x-3 tw-flex tw-justify-end" }, actions.map(action => {
      if (action.display)
        return action.display(action);
      const cssClass = action.isPrimary
        ? 'tw-text-white tw-bg-blue-600 hover:tw-bg-blue-700 tw-border-transparent focus:tw-ring-blue-500'
        : action.isDangerous ? 'tw-text-white tw-bg-red-600 hover:tw-bg-red-700 tw-border-transparent focus:tw-ring-red-500'
          : 'tw-bg-white tw-border-gray-300 tw-text-gray-700 hover:tw-bg-gray-50 focus:tw-ring-blue-500';
      const buttonType = action.type == PanelActionType.Submit ? 'submit' : 'button';
      const cancelHandler = () => {
      };
      const defaultHandler = (e, action) => this.actionInvoked.emit({ e, action: action });
      const clickHandler = !!action.onClick ? action.onClick : action.type == PanelActionType.Cancel ? cancelHandler : defaultHandler;
      return h("button", { type: buttonType, onClick: e => clickHandler(e, action), class: `${cssClass} tw-py-2 tw-px-4 tw-border tw-rounded-md tw-shadow-sm tw-text-sm tw-font-medium focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-offset-2` }, action.text);
    })))) : undefined)));
  }
  static get is() { return "elsa-form-panel"; }
  static get properties() {
    return {
      "mainTitle": {
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
        "attribute": "main-title",
        "reflect": false
      },
      "subTitle": {
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
        "attribute": "sub-title",
        "reflect": false
      },
      "isReadonly": {
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
        "attribute": "is-readonly",
        "reflect": false
      },
      "orientation": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'Landscape' | 'Portrait'",
          "resolved": "\"Landscape\" | \"Portrait\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "orientation",
        "reflect": false,
        "defaultValue": "'Portrait'"
      },
      "tabs": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<TabDefinition>",
          "resolved": "TabDefinition[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "TabDefinition": {
              "location": "import",
              "path": "../../../models"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      },
      "selectedTabIndex": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "selected-tab-index",
        "reflect": false
      },
      "actions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<PanelActionDefinition>",
          "resolved": "PanelActionDefinition[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "PanelActionDefinition": {
              "location": "import",
              "path": "./models"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      }
    };
  }
  static get events() {
    return [{
        "method": "submitted",
        "name": "submitted",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "FormData",
          "resolved": "FormData",
          "references": {
            "FormData": {
              "location": "global"
            }
          }
        }
      }, {
        "method": "selectedTabIndexChanged",
        "name": "selectedTabIndexChanged",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "TabChangedArgs",
          "resolved": "TabChangedArgs",
          "references": {
            "TabChangedArgs": {
              "location": "import",
              "path": "../../../models"
            }
          }
        }
      }, {
        "method": "actionInvoked",
        "name": "actionInvoked",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "PanelActionClickArgs",
          "resolved": "PanelActionClickArgs",
          "references": {
            "PanelActionClickArgs": {
              "location": "import",
              "path": "./models"
            }
          }
        }
      }];
  }
}
//# sourceMappingURL=form-panel.js.map
