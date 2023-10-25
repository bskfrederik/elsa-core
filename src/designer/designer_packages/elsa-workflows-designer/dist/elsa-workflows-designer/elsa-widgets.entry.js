import { r as registerInstance, h } from './index-dc0ae4f5.js';

const Widgets = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.widgets = [];
  }
  render() {
    const widgets = this.widgets.sort((a, b) => a.order < b.order ? -1 : a.order > b.order ? 1 : 0);
    return h("div", null, widgets.map(widget => widget.content()));
  }
};

export { Widgets as elsa_widgets };

//# sourceMappingURL=elsa-widgets.entry.js.map