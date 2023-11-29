import { h } from "@stencil/core";
import { TinyColor } from '@ctrl/tinycolor';
export const Badge = ({ text, color }) => {
  const foreColor = color;
  const backColor = new TinyColor(color).lighten(55).toHexString();
  const style = {
    color: foreColor,
    backgroundColor: backColor
  };
  return h("span", { class: "tw-inline-flex tw-items-center tw-px-3 tw-py-0.5 tw-rounded-full tw-text-sm tw-font-medium", style: style }, text);
};
//# sourceMappingURL=badge.js.map
