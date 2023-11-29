'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
const descriptorsStore = require('./descriptors-store-815ac006.js');
const state = require('./state-cdf235f8.js');
require('./index-d016c735.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');
require('./state-tunnel-df062325.js');

const DefaultActivityTemplate = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.editChildActivity = index.createEvent(this, "editChildActivity", 7);
    this.childActivitySelected = index.createEvent(this, "childActivitySelected", 7);
    this.portElements = [];
    this.renderIcon = (icon) => {
      const iconCssClass = this.displayTypeIsPicker ? 'tw-px-2' : 'tw-px-4';
      if (!icon)
        return undefined;
      return (index.h("div", { class: `${iconCssClass} tw-py-1` }, icon()));
    };
    this.renderPorts = (activity, embeddedPorts) => {
      if (this.displayTypeIsPicker || !this.activityDescriptor)
        return;
      if (embeddedPorts.length == 0)
        return;
      return (index.h("div", { class: "activity-ports tw-mt-2 tw-flex tw-space-x-2" }, embeddedPorts.map(port => this.renderPort(activity, port))));
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
          return (index.h("div", { class: "tw-relative tw-block tw-w-full tw-border-2 tw-border-gray-300 tw-border-dashed tw-rounded-lg tw-p-3 tw-text-center focus:tw-outline-none" }, index.h("a", { href: "#", onClick: e => this.onEditChildActivityClick(e, activity, port), onMouseDown: e => e.stopPropagation(), class: "tw-text-gray-400 hover:tw-text-gray-600" }, index.h("div", { class: "tw-flex-grow" }, index.h("span", { class: `tw-text-sm ${displayTextClass}` }, port.displayName)))));
        }
        const propertyIsArray = Array.isArray(activityProperty);
        if (!propertyIsArray) {
          return (index.h("div", { class: `tw-relative tw-block tw-w-full tw-border-2 ${borderColor} tw-border-solid tw-rounded-lg tw-p-3 tw-text-center focus:tw-outline-none` }, index.h("div", { class: "tw-flex tw-space-x-2" }, index.h("a", { href: "#", onClick: e => this.onEditChildActivityClick(e, activity, port), onMouseDown: e => e.stopPropagation() }, index.h("div", { class: "tw-flex-grow" }, index.h("span", { class: `tw-text-sm ${displayTextClass}` }, port.displayName))))));
        }
        return (index.h("div", { class: `tw-relative tw-block tw-w-full tw-border-2 ${borderColor} tw-border-solid tw-rounded-lg tw-p-5 tw-text-center focus:tw-outline-none` }, index.h("div", { class: "tw-flex tw-space-x-2" }, index.h("a", { href: "#", onClick: e => this.onEditChildActivityClick(e, activity, port), onMouseDown: e => e.stopPropagation() }, index.h("div", { class: "tw-flex-grow" }, index.h("span", { class: `tw-text-sm ${displayTextClass}` }, port.displayName))))));
      };
      return (index.h("div", { class: "activity-port", "data-port-name": port.name, ref: el => this.portElements.push(el) }, index.h("div", null, renderActivityProperty())));
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
    this.iconRegistry = utils.Container.get(utils.ActivityIconRegistry);
    this.portProviderRegistry = utils.Container.get(utils.PortProviderRegistry);
  }
  componentWillLoad() {
    var _a;
    const iconRegistry = this.iconRegistry;
    const activityType = this.activityType;
    const activityTypeVersion = (_a = this.activityTypeVersion) !== null && _a !== void 0 ? _a : 0;
    this.activityDescriptor = descriptorsStore.state.activityDescriptors.find(x => x.typeName == activityType && x.version == activityTypeVersion);
    this.icon = iconRegistry.has(activityType) ? iconRegistry.get(activityType) : null;
  }
  componentWillRender() {
    this.portElements = [];
  }
  render() {
    const activityDescriptor = this.activityDescriptor;
    const activityId = this.activityId;
    const portProvider = this.portProviderRegistry.get(activityDescriptor.typeName);
    return (index.h(state.FlowchartTunnel.Consumer, null, ({ nodeMap }) => {
      var _a, _b, _c, _d, _e, _f;
      const activity = nodeMap[activityId];
      const ports = portProvider.getOutboundPorts({ activityDescriptor, activity });
      const embeddedPorts = ports.filter(x => x.type == utils.PortType.Embedded && x.isBrowsable !== false);
      const canStartWorkflow = (_e = (_d = (_b = (_a = activity === null || activity === void 0 ? void 0 : activity.customProperties) === null || _a === void 0 ? void 0 : _a.canStartWorkflow) !== null && _b !== void 0 ? _b : (_c = activity === null || activity === void 0 ? void 0 : activity.customProperties) === null || _c === void 0 ? void 0 : _c.CanStartWorkflow) !== null && _d !== void 0 ? _d : activity === null || activity === void 0 ? void 0 : activity.canStartWorkflow) !== null && _e !== void 0 ? _e : false;
      const icon = this.icon;
      const hasIcon = !!icon;
      const textColor = canStartWorkflow ? 'tw-text-white' : 'tw-text-gray-700';
      const isTrigger = (activityDescriptor === null || activityDescriptor === void 0 ? void 0 : activityDescriptor.kind) == utils.ActivityKind.Trigger;
      const backgroundColor = canStartWorkflow ? isTrigger ? 'tw-bg-green-400' : 'tw-bg-blue-400' : 'tw-bg-white';
      const iconBackgroundColor = isTrigger ? 'tw-bg-green-500' : 'tw-bg-blue-500';
      const borderColor = canStartWorkflow ? isTrigger ? 'tw-border-green-600' : 'tw-border-blue-600' : 'tw-border-gray-300';
      const displayTypeIsPicker = this.displayTypeIsPicker;
      const displayTypeIsEmbedded = this.displayTypeIsEmbedded;
      const containerCssClass = displayTypeIsEmbedded ? '' : 'tw-drop-shadow-md';
      const contentCssClass = displayTypeIsPicker ? 'tw-px-2 tw-py-2' : 'tw-px-4 tw-pt-0 tw-pb-3';
      let displayText = (_f = activity === null || activity === void 0 ? void 0 : activity.metadata) === null || _f === void 0 ? void 0 : _f.displayText;
      if (utils.isNullOrWhitespace(displayText))
        displayText = activityDescriptor === null || activityDescriptor === void 0 ? void 0 : activityDescriptor.displayName;
      if (embeddedPorts.length == 0 || displayTypeIsPicker) {
        return (index.h("div", null, index.h("div", { class: `activity-wrapper tw-border ${borderColor} ${backgroundColor} ${containerCssClass} tw-rounded tw-text-white tw-overflow-hidden` }, index.h("div", { class: "elsa-toolbar-menu-wrapper tw-flex tw-flex-row" }, index.h("div", { class: `tw-flex tw-flex-shrink tw-items-center ${iconBackgroundColor}` }, this.renderIcon(icon)), index.h("div", { class: "tw-flex tw-items-center" }, index.h("div", { class: displayTypeIsPicker ? `tw-m-2` : 'tw-m-3' }, index.h("span", { class: `${textColor}` }, displayText), index.h("div", null, this.renderPorts(activity, embeddedPorts))))))));
      }
      else {
        return (index.h("div", null, index.h("div", { class: `activity-wrapper tw-border ${borderColor} ${backgroundColor} ${containerCssClass} tw-rounded tw-overflow-hidden` }, index.h("div", { class: "tw-text-white" }, index.h("div", { class: `tw-flex tw-flex-shrink tw-items-center tw-py-3 ${hasIcon ? 'tw-pr-3' : 'tw-px-3'} ${iconBackgroundColor}` }, this.renderIcon(icon), index.h("span", null, displayText))), index.h("div", { class: "elsa-toolbar-menu-wrapper tw-flex tw-flex-col" }, index.h("div", { class: "tw-flex tw-items-center" }, index.h("div", { class: contentCssClass }, this.renderPorts(activity, embeddedPorts)))))));
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

exports.elsa_default_activity_template = DefaultActivityTemplate;

//# sourceMappingURL=elsa-default-activity-template.cjs.entry.js.map