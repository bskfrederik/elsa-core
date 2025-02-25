import { h } from '@stencil/core';
import { getActivityIconCssClass } from "./models";
export const EventIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("polyline", { points: "13 3 13 10 19 10 11 21 11 14 5 14 13 3" })));
//# sourceMappingURL=event.js.map
