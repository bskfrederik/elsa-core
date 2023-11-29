import { h } from '@stencil/core';
import { getActivityIconCssClass } from "./models";
export const StartAtIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("rect", { x: "4", y: "5", width: "16", height: "16", rx: "2" }), h("line", { x1: "16", y1: "3", x2: "16", y2: "7" }), h("line", { x1: "8", y1: "3", x2: "8", y2: "7" }), h("line", { x1: "4", y1: "11", x2: "20", y2: "11" }), h("line", { x1: "11", y1: "15", x2: "12", y2: "15" }), h("line", { x1: "12", y1: "15", x2: "12", y2: "18" })));
//# sourceMappingURL=startat.js.map
