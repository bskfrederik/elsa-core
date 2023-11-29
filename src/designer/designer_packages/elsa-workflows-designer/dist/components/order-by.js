import { h } from '@stencil/core/internal/client';

const BulkActionsIcon = () => h("svg", { class: "tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "1", d: "M13 10V3L4 14h7v7l9-11h-7z" }));

const PageSizeIcon = () => h("svg", { class: "tw-h-5 tw-w-5 tw-text-gray-400 tw-mr-2", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  h("line", { x1: "9", y1: "6", x2: "20", y2: "6" }),
  h("line", { x1: "9", y1: "12", x2: "20", y2: "12" }),
  h("line", { x1: "9", y1: "18", x2: "20", y2: "18" }),
  h("line", { x1: "5", y1: "6", x2: "5", y2: "6.01" }),
  h("line", { x1: "5", y1: "12", x2: "5", y2: "12.01" }),
  h("line", { x1: "5", y1: "18", x2: "5", y2: "18.01" }));

const OrderByIcon = () => h("svg", { class: "tw-mr-3 tw-h-5 tw-w-5 tw-text-gray-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" }));

export { BulkActionsIcon as B, OrderByIcon as O, PageSizeIcon as P };

//# sourceMappingURL=order-by.js.map