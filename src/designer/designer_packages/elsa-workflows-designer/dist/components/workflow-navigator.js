import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';
import { C as Container, x as ActivityIconRegistry, J as PortProviderRegistry, aJ as FlowchartIcon } from './utils.js';
import { f as flatten, w as walkActivities } from './activity-walker.js';
import { s as state } from './descriptors-store.js';

const WorkflowNavigator = /*@__PURE__*/ proxyCustomElement(class WorkflowNavigator extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.navigate = createEvent(this, "navigate", 7);
    this.renderPathItem = (item, index, nodes) => {
      const activityId = item.activityId;
      const activity = nodes.find(x => x.activity.id == activityId).activity;
      const activityDescriptor = state.activityDescriptors.find(x => x.typeName == activity.type);
      const icon = this.iconRegistry.getOrDefault(activity.type)();
      const listElements = [];
      const isLastItem = index == this.items.length - 1;
      const onItemClick = (e, item) => {
        e.preventDefault();
        this.onItemClick(item);
      };
      let port = null;
      if (!!item.portName) {
        const portProvider = this.portProviderRegistry.get(activity.type);
        const ports = portProvider.getOutboundPorts({ activity, activityDescriptor });
        if (ports.length > 1)
          port = ports.find(x => x.name == item.portName);
      }
      if (isLastItem) {
        listElements.push(h("li", null, h("div", { class: "tw-flex tw-items-center" }, h("span", { class: "tw-block tw-flex tw-items-center tw-text-gray-500" }, h("div", { class: "tw-bg-blue-500 tw-rounded" }, icon), h("span", { class: "tw-ml-4 tw-text-sm tw-font-medium tw-text-gray-500" }, activityId)), !!port ? (h("svg", { class: "tw-ml-2 tw-flex-shrink-0 tw-h-5 tw-w-5 tw-text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, h("path", { "fill-rule": "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule": "evenodd" }))) : undefined)));
      }
      else {
        listElements.push(h("li", null, h("div", { class: "tw-flex tw-items-center" }, h("a", { onClick: e => onItemClick(e, item), href: "#", class: "tw-block tw-flex tw-items-center tw-text-gray-400 hover:tw-text-gray-500" }, h("div", { class: "tw-bg-blue-500 tw-rounded" }, icon), h("span", { class: "tw-ml-4 tw-text-sm tw-font-medium tw-text-gray-500 hover:tw-text-gray-700" }, activityId)), h("svg", { class: "tw-ml-2 tw-flex-shrink-0 tw-h-5 tw-w-5 tw-text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, h("path", { "fill-rule": "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule": "evenodd" })))));
      }
      if (!!port) {
        listElements.push(h("li", null, h("div", { class: "tw-flex tw-items-center" }, h("span", { class: "tw-text-sm tw-font-medium tw-text-gray-500", "aria-current": "page" }, port.displayName))));
      }
      return listElements;
    };
    this.onItemClick = (item) => this.navigate.emit(item);
    this.items = [];
    this.rootActivity = undefined;
    this.iconRegistry = Container.get(ActivityIconRegistry);
    this.portProviderRegistry = Container.get(PortProviderRegistry);
  }
  render() {
    let items = this.items;
    if (items.length <= 0)
      return null;
    if (!this.rootActivity)
      return;
    const nodes = flatten(walkActivities(this.rootActivity));
    return h("div", { class: "tw-ml-8" }, h("nav", { class: "tw-flex", "aria-label": "Breadcrumb" }, h("ol", { role: "list", class: "tw-flex tw-items-center tw-space-x-3" }, items.length > 0 && (h("li", null, h("div", { class: "tw-flex tw-items-center" }, h("a", { onClick: e => this.onItemClick(null), href: "#", class: "tw-block tw-flex tw-items-center tw-text-gray-400 hover:tw-text-gray-500" }, h("div", { class: "tw-bg-blue-500 tw-rounded" }, h(FlowchartIcon, null)), h("span", { class: "tw-ml-4 tw-text-sm tw-font-medium tw-text-gray-500 hover:tw-text-gray-700" }, this.rootActivity.id)), h("svg", { class: "tw-ml-2 tw-flex-shrink-0 tw-h-5 tw-w-5 tw-text-gray-500", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", "aria-hidden": "true" }, h("path", { "fill-rule": "evenodd", d: "M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z", "clip-rule": "evenodd" }))))), items.map((item, index) => this.renderPathItem(item, index, nodes)))));
  }
}, [0, "elsa-workflow-navigator", {
    "items": [16],
    "rootActivity": [16]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-navigator"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-navigator":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WorkflowNavigator);
      }
      break;
  } });
}

export { WorkflowNavigator as W, defineCustomElement as d };

//# sourceMappingURL=workflow-navigator.js.map