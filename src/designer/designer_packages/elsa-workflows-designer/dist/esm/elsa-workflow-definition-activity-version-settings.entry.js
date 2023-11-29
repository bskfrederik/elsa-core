import { r as registerInstance, h } from './index-08112852.js';
import { I as InfoList } from './info-list-bcdc458e.js';
import './utils-972bf8be.js';
import './toolbar-component-store-9c84420b.js';
import './_commonjsHelpers-7db8bc26.js';
import './index-01748867.js';
import './descriptors-store-6bb78eef.js';
import './lodash-fa7ebcea.js';
import './notification-service-c7fdb37c.js';

const WorkflowDefinitionActivityVersionSettings = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
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
};

export { WorkflowDefinitionActivityVersionSettings as elsa_workflow_definition_activity_version_settings };

//# sourceMappingURL=elsa-workflow-definition-activity-version-settings.entry.js.map