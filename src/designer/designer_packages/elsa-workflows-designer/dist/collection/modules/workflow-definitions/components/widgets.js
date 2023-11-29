import { h } from '@stencil/core';
export class Widgets {
  constructor() {
    this.widgets = [];
  }
  render() {
    const widgets = this.widgets.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);
    return h("div", null, widgets.map(widget => widget.content()));
  }
  static get is() { return "elsa-widgets"; }
  static get properties() {
    return {
      "widgets": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Array<Widget>",
          "resolved": "Widget[]",
          "references": {
            "Array": {
              "location": "global"
            },
            "Widget": {
              "location": "import",
              "path": "../models/ui"
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
}
//# sourceMappingURL=widgets.js.map
