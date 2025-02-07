import { h } from '@stencil/core';
import { getActivityIconCssClass } from "./models";
export const WriteLineIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("path", { d: "M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4" }), h("line", { x1: "13.5", y1: "6.5", x2: "17.5", y2: "10.5" })));
//# sourceMappingURL=write-line.js.map
