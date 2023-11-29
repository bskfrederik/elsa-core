'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');

const ButtonGroup = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.renderButtons = () => {
      const buttons = this.buttons;
      if (buttons.length == 0)
        return;
      return index.h("div", { class: "tw-py-1" }, buttons.map(this.renderButton));
    };
    this.renderButton = (button, index$1) => {
      const buttons = this.buttons;
      const cssClass = buttons.length == 1 ? `tw-relative tw-rounded-l-md tw-rounded-r-md` : index$1 == 0 ? 'tw-relative tw-rounded-l-md' : index$1 == this.buttons.length - 1 ? '-tw-ml-px tw-rounded-r-md' : '-tw-ml-px';
      return index.h("button", { onClick: e => ButtonGroup.onButtonClick(e, button), type: "button", class: `${cssClass} tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-bg-white tw-text-sm tw-font-medium tw-text-gray-700 hover:tw-bg-gray-50 focus:tw-z-10 focus:tw-outline-none focus:tw-ring-1 focus:tw-ring-blue-500 focus:tw-border-blue-500` }, button.text);
    };
    this.buttons = [];
  }
  render() {
    return (index.h("span", { class: "tw-relative tw-z-0 tw-inline-flex tw-rounded-md" }, this.renderButtons()));
  }
  static async onButtonClick(e, button) {
    e.preventDefault();
    if (!!button.clickHandler)
      button.clickHandler(e);
  }
};

exports.elsa_button_group = ButtonGroup;

//# sourceMappingURL=elsa-button-group.cjs.entry.js.map