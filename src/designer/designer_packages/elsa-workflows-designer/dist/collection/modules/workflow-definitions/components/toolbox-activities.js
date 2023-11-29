import { h } from '@stencil/core';
import { Addon } from '@antv/x6';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import { Container } from 'typedi';
import descriptorsStore from '../../../data/descriptors-store';
import { ActivityDescriptorManager, ActivityDriverRegistry } from '../../../services';
import { getLocaleComponentStrings } from '../../../utils/locale';
export class ToolboxActivities {
  constructor() {
    this.buildModel = (searchVal = '') => {
      let browsableDescriptors = uniqBy(descriptorsStore.activityDescriptors.filter(x => x.isBrowsable !== false).sort((a, b) => (a.version > b.version ? 1 : -1)), x => `${x.typeName}:${x.version}`);
      if (searchVal) {
        browsableDescriptors = browsableDescriptors.filter(activity => activity.displayName.toLocaleLowerCase().includes(searchVal.toLocaleLowerCase()));
      }
      const categorizedActivitiesLookup = groupBy(browsableDescriptors, x => x.category);
      const categories = Object.keys(categorizedActivitiesLookup).sort((a, b) => a.localeCompare(b));
      const renderedActivities = new Map();
      // Group activities by category
      const activityCategoryModels = categories.map(x => {
        const model = {
          category: x,
          expanded: !!this.expandedCategories.find(c => c == x),
          activities: categorizedActivitiesLookup[x],
        };
        return model;
      });
      // Render activities.
      const activityDriverRegistry = Container.get(ActivityDriverRegistry);
      for (const activityDescriptor of browsableDescriptors) {
        const activityType = activityDescriptor.typeName;
        const driver = activityDriverRegistry.createDriver(activityType);
        const html = driver.display({ displayType: 'picker', activityDescriptor: activityDescriptor });
        renderedActivities.set(activityType, html);
      }
      this.categoryModels = activityCategoryModels;
      this.renderedActivities = renderedActivities;
      return {
        categories: activityCategoryModels,
        activities: renderedActivities,
      };
    };
    this.graph = undefined;
    this.isReadonly = undefined;
    this.expandedCategories = [];
    this.categoryModels = [];
    this.renderedActivities = [];
  }
  handleGraphChanged(value) {
    if (this.dnd)
      this.dnd.dispose();
    this.dnd = new Addon.Dnd({
      target: value,
      scaled: false,
      animation: true,
    });
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    const activityDescriptorManager = Container.get(ActivityDescriptorManager);
    activityDescriptorManager.onActivityDescriptorsUpdated(this.buildModel);
    this.buildModel();
  }
  static onActivityStartDrag(e, activityDescriptor) {
    const json = JSON.stringify(activityDescriptor);
    e.dataTransfer.setData('activity-descriptor', json);
  }
  onToggleActivityCategory(categoryModel) {
    const category = categoryModel.category;
    const expandedCategories = this.expandedCategories;
    const isExpanded = !!expandedCategories.find(x => x == category);
    if (isExpanded)
      this.expandedCategories = expandedCategories.filter(x => x != category);
    else
      this.expandedCategories = [...expandedCategories, category];
    categoryModel.expanded = !categoryModel.expanded;
  }
  filterActivities(ev) {
    var _a;
    let val = ((_a = ev.target) === null || _a === void 0 ? void 0 : _a.value) || '';
    this.buildModel(val);
  }
  render() {
    return (h("nav", { class: "tw-flex-1 tw-px-2 tw-space-y-1 tw-font-sans tw-text-sm tw-text-gray-600" }, h("input", { class: "tw-my-1", placeholder: this.strings.searchActivities, type: "text", name: "activity-search", id: "activitySearch", onInput: this.filterActivities.bind(this) }), this.categoryModels.map(categoryModel => {
      const category = categoryModel.category;
      const activityDescriptors = categoryModel.activities;
      const categoryButtonClass = categoryModel.expanded ? 'tw-rotate-90' : '';
      const categoryContentClass = categoryModel.expanded ? '' : 'hidden';
      return (h("div", { class: "tw-space-y-1" }, h("button", { type: "button", onClick: () => this.onToggleActivityCategory(categoryModel), class: "tw-text-gray-600 hover:tw-bg-gray-50 hover:tw-text-gray-900 tw-group tw-w-full tw-flex tw-items-center tw-pr-2 tw-py-2 tw-text-left tw-text-sm tw-font-medium tw-rounded-md focus:tw-outline-none" }, h("svg", { class: `${categoryButtonClass} tw-text-gray-300 tw-mr-2 tw-flex-shrink-0 tw-h-5 tw-w-5 tw-transform group-hover:tw-text-gray-400 tw-transition-colors tw-ease-in-out tw-duration-150`, viewBox: "0 0 20 20", "aria-hidden": "true" }, h("path", { d: "M6 6L14 10L6 14V6Z", fill: "currentColor" })), category), h("div", { class: `tw-space-y-0.5 ${categoryContentClass}` }, activityDescriptors.map(activityDescriptor => {
        const activityHtml = this.renderedActivities.get(activityDescriptor.typeName);
        return (h("div", { class: "tw-w-full tw-flex tw-items-center tw-pl-10 tw-pr-2 tw-py-2" }, h("div", { class: "tw-relative tw-cursor-move", onDragStart: e => ToolboxActivities.onActivityStartDrag(e, activityDescriptor) }, h("elsa-tooltip", { tooltipPosition: "right", tooltipContent: activityDescriptor.description }, h("div", { innerHTML: activityHtml, draggable: !this.isReadonly })))));
      }))));
    })));
  }
  static get is() { return "elsa-workflow-definition-editor-toolbox-activities"; }
  static get properties() {
    return {
      "graph": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Graph",
          "resolved": "Graph",
          "references": {
            "Graph": {
              "location": "import",
              "path": "@antv/x6"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      },
      "isReadonly": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "is-readonly",
        "reflect": false
      }
    };
  }
  static get states() {
    return {
      "expandedCategories": {},
      "categoryModels": {},
      "renderedActivities": {}
    };
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "graph",
        "methodName": "handleGraphChanged"
      }];
  }
}
//# sourceMappingURL=toolbox-activities.js.map
