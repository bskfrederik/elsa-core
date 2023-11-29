import { r as registerInstance, c as createEvent, h } from './index-08112852.js';
import { C as Container, x as ActivityIconRegistry, J as PortProviderRegistry, Q as PortType, o as isNullOrWhitespace, N as ActivityKind } from './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import { s as state } from './descriptors-store-6bb78eef.js';
import { F as FlowchartTunnel } from './state-b09f9898.js';
import './index-01748867.js';
import './_commonjsHelpers-7db8bc26.js';
import './lodash-fa7ebcea.js';
import './notification-service-c7fdb37c.js';
import './state-tunnel-464fcd1b.js';

const DefaultActivityTemplate = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.editChildActivity = createEvent(this, "editChildActivity", 7);
    this.childActivitySelected = createEvent(this, "childActivitySelected", 7);
    this.portElements = [];
    this.renderIcon = (icon) => {
      const iconCssClass = this.displayTypeIsPicker ? 'tw-px-2' : 'tw-px-4';
      if (!icon)
        return undefined;
      return (h("div", { class: `${iconCssClass} tw-py-1` }, icon()));
    };
    this.renderPorts = (activity, embeddedPorts) => {
      if (this.displayTypeIsPicker || !this.activityDescriptor)
        return;
      if (embeddedPorts.length == 0)
        return;
      return (h("div", { class: "activity-ports tw-mt-2 tw-flex tw-space-x-2" }, embeddedPorts.map(port => this.renderPort(activity, port))));
    };
    this.renderPort = (activity, port) => {
      const canStartWorkflow = (activity === null || activity === void 0 ? void 0 : activity.canStartWorkflow) == true;
      const displayTextClass = canStartWorkflow ? 'tw-text-white' : 'tw-text-gray-600';
      const borderColor = port.name == this.selectedPortName ? 'tw-border-blue-600' : 'tw-border-gray-300';
      const activityDescriptor = this.activityDescriptor;
      const portProvider = this.portProviderRegistry.get(activityDescriptor.typeName);
      const activityProperty = portProvider.resolvePort(port.name, { activity, activityDescriptor });
      const renderActivityProperty = () => {
        if (!activityProperty) {
          return (h("div", { class: "tw-relative tw-block tw-w-full tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-lg tw-p-3 tw-text-center focus:tw-outline-none" }, h("a", { href: "#", onClick: e => this.onEditChildActivityClick(e, activity, port), onMouseDown: e => e.stopPropagation(), class: "tw-text-gray-400 hover:tw-text-gray-600" }, h("div", { class: "tw-flex-grow" }, h("span", { class: `tw-text-sm ${displayTextClass}` }, port.displayName)))));
        }
        const propertyIsArray = Array.isArray(activityProperty);
        if (!propertyIsArray) {
          return (h("div", { class: `tw-relative tw-block tw-w-full tw-border-2 ${borderColor} tw-border-solid tw-rounded-lg tw-p-3 tw-text-center focus:tw-outline-none` }, h("div", { class: "tw-flex tw-space-x-2" }, h("a", { href: "#", onClick: e => this.onEditChildActivityClick(e, activity, port), onMouseDown: e => e.stopPropagation() }, h("div", { class: "tw-flex-grow" }, h("span", { class: `tw-text-sm ${displayTextClass}` }, port.displayName))))));
        }
        return (h("div", { class: `tw-relative tw-block tw-w-full tw-border-2 ${borderColor} tw-border-solid tw-rounded-lg tw-p-5 tw-text-center focus:tw-outline-none` }, h("div", { class: "tw-flex tw-space-x-2" }, h("a", { href: "#", onClick: e => this.onEditChildActivityClick(e, activity, port), onMouseDown: e => e.stopPropagation() }, h("div", { class: "tw-flex-grow" }, h("span", { class: `tw-text-sm ${displayTextClass}` }, port.displayName))))));
      };
      return (h("div", { class: "activity-port", "data-port-name": port.name, ref: el => this.portElements.push(el) }, h("div", null, renderActivityProperty())));
    };
    this.onEditChildActivityClick = (e, parentActivity, port) => {
      e.preventDefault();
      this.editChildActivity.emit({ parentActivityId: parentActivity.id, port: port });
    };
    this.activityType = undefined;
    this.activityTypeVersion = 1;
    this.displayType = undefined;
    this.activityId = undefined;
    this.selectedPortName = undefined;
    this.iconRegistry = Container.get(ActivityIconRegistry);
    this.portProviderRegistry = Container.get(PortProviderRegistry);
  }
  componentWillLoad() {
    var _a;
    const iconRegistry = this.iconRegistry;
    const activityType = this.activityType;
    const activityTypeVersion = (_a = this.activityTypeVersion) !== null && _a !== void 0 ? _a : 0;
    this.activityDescriptor = state.activityDescriptors.find(x => x.typeName == activityType && x.version == activityTypeVersion);
    this.icon = iconRegistry.has(activityType) ? iconRegistry.get(activityType) : null;
  }
  componentWillRender() {
    this.portElements = [];
  }
  render() {
    const activityDescriptor = this.activityDescriptor;
    const activityId = this.activityId;
    const portProvider = this.portProviderRegistry.get(activityDescriptor.typeName);
    return (h(FlowchartTunnel.Consumer, null, ({ nodeMap }) => {
      var _a, _b, _c, _d, _e, _f;
      const activity = nodeMap[activityId];
      const ports = portProvider.getOutboundPorts({ activityDescriptor, activity });
      const embeddedPorts = ports.filter(x => x.type == PortType.Embedded && x.isBrowsable !== false);
      const canStartWorkflow = (_e = (_d = (_b = (_a = activity === null || activity === void 0 ? void 0 : activity.customProperties) === null || _a === void 0 ? void 0 : _a.canStartWorkflow) !== null && _b !== void 0 ? _b : (_c = activity === null || activity === void 0 ? void 0 : activity.customProperties) === null || _c === void 0 ? void 0 : _c.CanStartWorkflow) !== null && _d !== void 0 ? _d : activity === null || activity === void 0 ? void 0 : activity.canStartWorkflow) !== null && _e !== void 0 ? _e : false;
      const icon = this.icon;
      const hasIcon = !!icon;
      const textColor = canStartWorkflow ? 'tw-text-white' : 'tw-text-gray-700';
      const isTrigger = (activityDescriptor === null || activityDescriptor === void 0 ? void 0 : activityDescriptor.kind) == ActivityKind.Trigger;
      const backgroundColor = canStartWorkflow ? isTrigger ? 'tw-bg-green-400' : 'tw-bg-blue-400' : 'tw-bg-white';
      const iconBackgroundColor = isTrigger ? 'tw-bg-green-500' : 'tw-bg-blue-500';
      const borderColor = canStartWorkflow ? isTrigger ? 'tw-border-green-600' : 'tw-border-blue-600' : 'tw-border-gray-300';
      const displayTypeIsPicker = this.displayTypeIsPicker;
      const displayTypeIsEmbedded = this.displayTypeIsEmbedded;
      const containerCssClass = displayTypeIsEmbedded ? '' : 'tw-drop-shadow-md';
      const contentCssClass = displayTypeIsPicker ? 'tw-px-2 tw-py-2' : 'tw-px-4 tw-pt-0 tw-pb-3';
      let displayText = (_f = activity === null || activity === void 0 ? void 0 : activity.metadata) === null || _f === void 0 ? void 0 : _f.displayText;
      if (isNullOrWhitespace(displayText))
        displayText = activityDescriptor === null || activityDescriptor === void 0 ? void 0 : activityDescriptor.displayName;
      if (embeddedPorts.length == 0 || displayTypeIsPicker) {
        return (h("div", null, h("div", { class: `activity-wrapper tw-border ${borderColor} ${backgroundColor} ${containerCssClass} tw-rounded tw-text-white tw-overflow-hidden` }, h("div", { class: "elsa-toolbar-menu-wrapper tw-flex tw-flex-row" }, h("div", { class: `tw-flex tw-flex-shrink tw-items-center ${iconBackgroundColor}` }, this.renderIcon(icon)), h("div", { class: "tw-flex tw-items-center" }, h("div", { class: displayTypeIsPicker ? `tw-m-2` : 'tw-m-3' }, h("span", { class: `${textColor}` }, displayText), h("div", null, this.renderPorts(activity, embeddedPorts))))))));
      }
      else {
        return (h("div", null, h("div", { class: `activity-wrapper tw-border ${borderColor} ${backgroundColor} ${containerCssClass} tw-rounded tw-overflow-hidden` }, h("div", { class: "tw-text-white" }, h("div", { class: `tw-flex tw-flex-shrink tw-items-center tw-py-3 ${hasIcon ? 'tw-pr-3' : 'tw-px-3'} ${iconBackgroundColor}` }, this.renderIcon(icon), h("span", null, displayText))), h("div", { class: "elsa-toolbar-menu-wrapper tw-flex tw-flex-col" }, h("div", { class: "tw-flex tw-items-center" }, h("div", { class: contentCssClass }, this.renderPorts(activity, embeddedPorts)))))));
      }
    }));
  }
  get displayTypeIsPicker() {
    return this.displayType == "picker";
  }
  get displayTypeIsEmbedded() {
    return this.displayType == "embedded";
  }
  onWindowClicked(event) {
    const target = event.target;
    for (const portElement of this.portElements)
      if (portElement.contains(target))
        return;
    this.selectedPortName = null;
  }
};

export { DefaultActivityTemplate as elsa_default_activity_template };

//# sourceMappingURL=elsa-default-activity-template.entry.js.map