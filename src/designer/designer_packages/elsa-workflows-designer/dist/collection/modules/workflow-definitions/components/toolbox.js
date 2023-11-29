import { h } from '@stencil/core';
export class Toolbox {
  constructor() {
    this.onTabSelected = (e, index) => {
      e.preventDefault();
      this.selectedTabIndex = index;
    };
    this.graph = undefined;
    this.isReadonly = undefined;
    this.selectedTabIndex = 0;
  }
  render() {
    const selectedTabIndex = this.selectedTabIndex;
    const selectedCss = 'tw-border-blue-500 tw-text-blue-600';
    const defaultCss = 'tw-border-transparent tw-text-gray-500 hover:tw-text-gray-700 hover:tw-border-gray-300';
    const activitiesTabCssClass = selectedTabIndex == 0 ? selectedCss : defaultCss;
    return (h("div", { class: "activity-list tw-absolute tw-inset-0 tw-overflow-hidden" }, h("div", { class: "tw-h-full tw-flex tw-flex-col" }, h("div", { class: "tw-border-b tw-border-gray-200" }, h("nav", { class: "-tw-mb-px tw-flex", "aria-label": "Tabs" }, h("a", { href: "#", onClick: e => this.onTabSelected(e, 0), class: `${activitiesTabCssClass} tw-w-1/2 tw-py-4 tw-px-1 tw-text-center tw-border-b-2 tw-font-medium tw-text-sm` }, "Activities"))), h("div", { class: "tw-flex-1 tw-relative" }, h("div", { class: "tw-absolute tw-inset-0 tw-overflow-y-scroll" }, h("elsa-workflow-definition-editor-toolbox-activities", { isReadonly: this.isReadonly, graph: this.graph, class: selectedTabIndex == 0 ? '' : 'hidden' }))))));
  }
  static get is() { return "elsa-workflow-definition-editor-toolbox"; }
  static get properties() {
    return {
      "graph": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Graph",
          "resolved": "Graph",
          "references": {
            "Graph": {
              "location": "import",
              "path": "@antv/x6"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
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
      }
    };
  }
  static get states() {
    return {
      "selectedTabIndex": {}
    };
  }
}
//# sourceMappingURL=toolbox.js.map
