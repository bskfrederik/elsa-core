import { h } from '@stencil/core';
import { getActivityIconCssClass } from "./models";
export const FlowchartIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("rect", { x: "3", y: "3", width: "6", height: "6", rx: "1" }), h("rect", { x: "15", y: "15", width: "6", height: "6", rx: "1" }), h("path", { d: "M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3" }), h("path", { d: "M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3" })));
//# sourceMappingURL=flowchart.js.map
