import { h } from '@stencil/core';
import { getActivityIconCssClass } from "./models";
export const CompleteIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), "  ", h("circle", { cx: "12", cy: "12", r: "9" }), "  ", h("path", { d: "M9 12l2 2l4 -4" })));
//# sourceMappingURL=complete.js.map
