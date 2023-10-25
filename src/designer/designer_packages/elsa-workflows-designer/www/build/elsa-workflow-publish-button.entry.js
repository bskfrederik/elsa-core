import { r as registerInstance, e as createEvent, h } from './index-dc0ae4f5.js';
import { N as NotificationService } from './notification-service-ffb5a824.js';
import './notification-store-40f3cb5a.js';
import './index-4ac684d0.js';

const PublishButton = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.newClicked = createEvent(this, "newClicked", 7);
    this.publishClicked = createEvent(this, "publishClicked", 7);
    this.unPublishClicked = createEvent(this, "unPublishClicked", 7);
    this.exportClicked = createEvent(this, "exportClicked", 7);
    this.importClicked = createEvent(this, "importClicked", 7);
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
    return h("svg", { class: "tw-animate-spin -tw-ml-1 tw-mr-3 tw-h-5 tw-w-5 tw-text-blue-400", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24" }, h("circle", { class: "tw-opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", "stroke-width": "4" }), h("path", { class: "tw-opacity-75", fill: "currentColor", d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" }));
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
    return h("elsa-dropdown-button", { disabled: this.disabled, text: mainItem.text, handler: mainItem.handler, items: items, icon: this.publishingIcon(), onMenuOpened: () => NotificationService.hideAllNotifications() });
  }
};

export { PublishButton as elsa_workflow_publish_button };

//# sourceMappingURL=elsa-workflow-publish-button.entry.js.map