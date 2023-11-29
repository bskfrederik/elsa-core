import { proxyCustomElement, HTMLElement, h } from '@stencil/core/internal/client';
import { I as InfoList } from './info-list.js';
import { d as defineCustomElement$2 } from './copy-button.js';

const WorkflowDefinitionActivityVersionSettings = /*@__PURE__*/ proxyCustomElement(class WorkflowDefinitionActivityVersionSettings extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.onUpdateClick = () => {
      const activity = this.renderContext.activity;
      activity.version = activity.latestAvailablePublishedVersion;
      activity.workflowDefinitionVersionId = activity.latestAvailablePublishedVersionId;
      this.currentVersion = activity.version;
      this.renderContext.notifyActivityChanged();
    };
    this.renderContext = undefined;
    this.currentVersion = undefined;
  }
  onRenderContextChanged(value) {
    var _a;
    const activity = value === null || value === void 0 ? void 0 : value.activity;
    this.currentVersion = (_a = activity === null || activity === void 0 ? void 0 : activity.version) !== null && _a !== void 0 ? _a : 0;
  }
  componentWillLoad() {
    this.onRenderContextChanged(this.renderContext);
  }
  render() {
    var _a;
    if (!this.renderContext)
      return h("div", null);
    const activity = this.renderContext.activity;
    const activityId = activity.id;
    const latestAvailablePublishedVersion = activity.latestAvailablePublishedVersion;
    const upgradeAvailable = activity.version < latestAvailablePublishedVersion;
    const key = `${activityId}`;
    const versionDetails = {
      'Current version': this.currentVersion.toString(),
      'Published version': (_a = latestAvailablePublishedVersion === null || latestAvailablePublishedVersion === void 0 ? void 0 : latestAvailablePublishedVersion.toString()) !== null && _a !== void 0 ? _a : '-',
    };
    return h("div", { key: key }, h(InfoList, { title: "Version", dictionary: versionDetails }), upgradeAvailable &&
      h("div", null, h("button", { class: "elsa-btn elsa-btn-default", onClick: e => this.onUpdateClick() }, "Upgrade")));
  }
  static get watchers() { return {
    "renderContext": ["onRenderContextChanged"]
  }; }
}, [0, "elsa-workflow-definition-activity-version-settings", {
    "renderContext": [16],
    "currentVersion": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-definition-activity-version-settings", "elsa-copy-button"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-definition-activity-version-settings":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WorkflowDefinitionActivityVersionSettings);
      }
      break;
    case "elsa-copy-button":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
  } });
}

const ElsaWorkflowDefinitionActivityVersionSettings = WorkflowDefinitionActivityVersionSettings;
const defineCustomElement = defineCustomElement$1;

export { ElsaWorkflowDefinitionActivityVersionSettings, defineCustomElement };

//# sourceMappingURL=elsa-workflow-definition-activity-version-settings.js.map