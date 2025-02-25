import { h } from '@stencil/core/internal/client';

const DeleteIcon = () => h("svg", { class: "tw-h-5 tw-w-5 tw-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  h("line", { x1: "4", y1: "7", x2: "20", y2: "7" }),
  h("line", { x1: "10", y1: "11", x2: "10", y2: "17" }),
  h("line", { x1: "14", y1: "11", x2: "14", y2: "17" }),
  h("path", { d: "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" }),
  h("path", { d: "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" }));

export { DeleteIcon as D };

//# sourceMappingURL=delete.js.map