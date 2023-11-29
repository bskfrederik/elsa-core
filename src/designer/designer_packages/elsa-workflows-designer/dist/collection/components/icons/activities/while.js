import { h } from '@stencil/core';
import { getActivityIconCssClass } from "./models";
export const WhileIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), "  ", h("path", { d: "M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" }), "  ", h("path", { d: "M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3-3l3-3" })));
//# sourceMappingURL=while.js.map
