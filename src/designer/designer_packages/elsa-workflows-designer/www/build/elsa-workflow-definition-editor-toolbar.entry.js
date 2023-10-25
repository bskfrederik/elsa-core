import { r as registerInstance, e as createEvent, h } from './index-dc0ae4f5.js';

const Toolbar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.autoLayout = createEvent(this, "autoLayout", 7);
    this.zoomToFit = undefined;
  }
  render() {
    const layoutButtons = [{
        text: 'Horizontally',
        handler: () => this.autoLayout.emit('LR')
      }, {
        text: 'Vertically',
        handler: () => this.autoLayout.emit('TB')
      }];
    return (h("div", { class: "elsa-panel-toolbar tw-flex tw-justify-center tw-absolute tw-border-b tw-border-gray-200 tw-top-0 tw-px-1 tw-pl-4 tw-pb-2 tw-text-sm tw-bg-white tw-z-10 tw-space-x-2" }, h("elsa-dropdown-button", { text: "Auto-layout", theme: "Primary", items: layoutButtons, class: "tw-mt-2" }), h("button", { onClick: this.zoomToFit, class: "elsa-btn elsa-btn-primary" }, "Zoom to fit")));
  }
};

export { Toolbar as elsa_workflow_definition_editor_toolbar };

//# sourceMappingURL=elsa-workflow-definition-editor-toolbar.entry.js.map