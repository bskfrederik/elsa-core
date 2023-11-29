import { h } from '@stencil/core';
import { getActivityIconCssClass } from "../../components/icons/activities";
export const HttpRequestIcon = (settings) => (h("svg", { class: getActivityIconCssClass(settings), width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" }, h("path", { stroke: "none", d: "M0 0h24v24H0z" }), h("circle", { cx: "12", cy: "12", r: "9" }), h("line", { x1: "3.6", y1: "9", x2: "20.4", y2: "9" }), h("line", { x1: "3.6", y1: "15", x2: "20.4", y2: "15" }), h("path", { d: "M11.5 3a17 17 0 0 0 0 18" }), h("path", { d: "M12.5 3a17 17 0 0 1 0 18" })));
//# sourceMappingURL=icons.js.map
