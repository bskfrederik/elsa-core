import { h } from '@stencil/core';
import { getActivityIconCssClass } from "./models";
export const SetNameIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), "  ", h("line", { x1: "11", y1: "5", x2: "17", y2: "5" }), "  ", h("line", { x1: "7", y1: "19", x2: "13", y2: "19" }), "  ", h("line", { x1: "14", y1: "5", x2: "10", y2: "19" })));
//# sourceMappingURL=set-name.js.map
