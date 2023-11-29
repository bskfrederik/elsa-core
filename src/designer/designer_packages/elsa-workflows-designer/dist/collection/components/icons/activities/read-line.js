import { h } from '@stencil/core';
import { getActivityIconCssClass } from "./models";
export const ReadLineIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("path", { d: "M5 5h3m4 0h9" }), h("path", { d: "M3 10h11m4 0h1" }), h("path", { d: "M5 15h5m4 0h7" }), h("path", { d: "M3 20h9m4 0h3" })));
//# sourceMappingURL=read-line.js.map
