import { h } from '@stencil/core';
import { getActivityIconCssClass } from "./models";
export const StartIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("circle", { cx: "12", cy: "12", r: "10" })));
//# sourceMappingURL=start.js.map
