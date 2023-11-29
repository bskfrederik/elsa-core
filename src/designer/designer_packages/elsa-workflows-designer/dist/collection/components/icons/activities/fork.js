import { h } from '@stencil/core';
import { getActivityIconCssClass } from "./models";
export const ForkIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("circle", { cx: "12", cy: "18", r: "2" }), h("circle", { cx: "7", cy: "6", r: "2" }), h("circle", { cx: "17", cy: "6", r: "2" }), h("path", { d: "M7 8v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2 -2v-2" }), h("line", { x1: "12", y1: "12", x2: "12", y2: "16" })));
//# sourceMappingURL=fork.js.map
