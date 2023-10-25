import { r as registerInstance, h } from './index-dc0ae4f5.js';
import { I as InfoList } from './info-list-bd19439b.js';
import './index-7d63808a.js';
import './index-1637bf51.js';
import './models-09298028.js';
import './modal-type-12f51d83.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './lodash-cadbac1e.js';
import './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './toolbar-component-store-1febdbe0.js';

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