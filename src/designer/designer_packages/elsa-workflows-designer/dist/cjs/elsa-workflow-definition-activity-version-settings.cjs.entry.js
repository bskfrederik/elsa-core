'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const infoList = require('./info-list-d2663efb.js');
require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-d016c735.js');
require('./descriptors-store-815ac006.js');
require('./lodash-c9901408.js');
require('./notification-service-99c155e7.js');

const WorkflowDefinitionActivityVersionSettings = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
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
      return index.h("div", null);
    const activity = this.renderContext.activity;
    const activityId = activity.id;
    const latestAvailablePublishedVersion = activity.latestAvailablePublishedVersion;
    const upgradeAvailable = activity.version < latestAvailablePublishedVersion;
    const key = `${activityId}`;
    const versionDetails = {
      'Current version': this.currentVersion.toString(),
      'Published version': (_a = latestAvailablePublishedVersion === null || latestAvailablePublishedVersion === void 0 ? void 0 : latestAvailablePublishedVersion.toString()) !== null && _a !== void 0 ? _a : '-',
    };
    return index.h("div", { key: key }, index.h(infoList.InfoList, { title: "Version", dictionary: versionDetails }), upgradeAvailable &&
      index.h("div", null, index.h("button", { class: "elsa-btn elsa-btn-default", onClick: e => this.onUpdateClick() }, "Upgrade")));
  }
  static get watchers() { return {
    "renderContext": ["onRenderContextChanged"]
  }; }
};

exports.elsa_workflow_definition_activity_version_settings = WorkflowDefinitionActivityVersionSettings;

//# sourceMappingURL=elsa-workflow-definition-activity-version-settings.cjs.entry.js.map