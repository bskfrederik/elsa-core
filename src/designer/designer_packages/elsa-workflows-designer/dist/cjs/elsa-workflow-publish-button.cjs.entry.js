'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const notificationService = require('./notification-service-99c155e7.js');
require('./index-d016c735.js');

const PublishButton = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.newClicked = index.createEvent(this, "newClicked", 7);
    this.publishClicked = index.createEvent(this, "publishClicked", 7);
    this.unPublishClicked = index.createEvent(this, "unPublishClicked", 7);
    this.exportClicked = index.createEvent(this, "exportClicked", 7);
    this.importClicked = index.createEvent(this, "importClicked", 7);
    this.publishing = undefined;
    this.disabled = undefined;
  }
  onPublishClick() {
    this.publishClicked.emit({
      begin: () => this.publishing = true,
      complete: () => this.publishing = false
    });
  }
  onUnPublishClick() {
    this.unPublishClicked.emit();
  }
  async onExportClick() {
    this.exportClicked.emit();
  }
  async onImportClick() {
    this.importClicked.emit();
  }
  publishingIcon() {
    if (!this.publishing)
      return null;
    return index.h("svg", { class: "tw-animate-spin -tw-ml-1 tw-mr-3 tw-h-5 tw-w-5 tw-text-blue-400", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, index.h("circle", { class: "tw-opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", "stroke-width": "4" }), index.h("path", { class: "tw-opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }));
  }
  render() {
    const publishing = this.publishing;
    const items = [{
        text: 'Export',
        handler: () => this.onExportClick(),
        group: 1
      }, {
        text: 'Import',
        handler: () => this.onImportClick(),
        group: 1
      }, {
        text: 'Unpublish',
        handler: () => this.onUnPublishClick(),
        group: 2
      }];
    const mainItem = {
      text: publishing ? 'Publishing' : 'Publish',
      handler: publishing ? () => { } : () => this.onPublishClick()
    };
    return index.h("elsa-dropdown-button", { disabled: this.disabled, text: mainItem.text, handler: mainItem.handler, items: items, icon: this.publishingIcon(), onMenuOpened: () => notificationService.NotificationService.hideAllNotifications() });
  }
};

exports.elsa_workflow_publish_button = PublishButton;

//# sourceMappingURL=elsa-workflow-publish-button.cjs.entry.js.map