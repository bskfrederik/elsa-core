import { h } from '@stencil/core';
import { copyTextToClipboard } from '../../../utils';
export class ElsaCopyButton {
  constructor() {
    this.copyToClipboard = () => {
      this.isCopied = true;
      copyTextToClipboard(this.value);
      setTimeout(() => {
        this.isCopied = false;
      }, 500);
    };
    this.isCopied = false;
    this.value = '';
  }
  render() {
    return (h("a", { href: "#", class: "tw-ml-2 tw-h-6 tw-w-6 tw-inline-block tw-text-blue-500 hover:tw-text-blue-300", title: "Copy value" }, !this.isCopied ? (h("svg", { onClick: () => this.copyToClipboard(), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("rect", { x: "8", y: "8", width: "12", height: "12", rx: "2" }), h("path", { d: "M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" }))) : (h("svg", { width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), " ", h("polyline", { points: "9 11 12 14 20 6" }), " ", h("path", { d: "M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9" })))));
  }
  static get is() { return "elsa-copy-button"; }
  static get properties() {
    return {
      "value": {
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
        "attribute": "value",
        "reflect": false,
        "defaultValue": "''"
      }
    };
  }
  static get states() {
    return {
      "isCopied": {}
    };
  }
}
//# sourceMappingURL=copy-button.js.map
