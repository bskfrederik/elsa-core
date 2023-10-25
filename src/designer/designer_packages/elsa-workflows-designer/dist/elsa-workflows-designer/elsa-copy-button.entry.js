import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { x as copyTextToClipboard } from './index-7d63808a.js';
import './index-1637bf51.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './lodash-cadbac1e.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';

const ElsaCopyButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};

export { ElsaCopyButton as elsa_copy_button };

//# sourceMappingURL=elsa-copy-button.entry.js.map