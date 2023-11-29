import { h } from "@stencil/core";
import { InfoList } from "../../../../components/shared/forms/info-list";
export class WorkflowDefinitionActivityVersionSettings {
  constructor() {
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
  static get is() { return "elsa-workflow-definition-activity-version-settings"; }
  static get properties() {
    return {
      "renderContext": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "RenderActivityPropsContext",
          "resolved": "RenderActivityPropsContext",
          "references": {
            "RenderActivityPropsContext": {
              "location": "import",
              "path": "../models"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        }
      }
    };
  }
  static get states() {
    return {
      "currentVersion": {}
    };
  }
  static get watchers() {
    return [{
        "propName": "renderContext",
        "methodName": "onRenderContextChanged"
      }];
  }
}
//# sourceMappingURL=activity-version-settings.js.map
