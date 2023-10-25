import { r as registerInstance, e as createEvent, h } from './index-dc0ae4f5.js';
import { D as DefaultContents, C as Container, M as ModalDialogService, b as DeleteIcon, R as RevertIcon, d as PublishedIcon } from './index-1637bf51.js';
import { D as EventBus, a3 as WorkflowDefinitionsApi } from './index-7d63808a.js';
import { h as hooks } from './notification-service-ffb5a824.js';
import { M as ModalType } from './modal-type-12f51d83.js';
import { D as DefaultModalActions } from './models-09298028.js';
import './Reflect-563aa1b4.js';
import './_commonjsHelpers-a4f66ccd.js';
import './state-450cc93e.js';
import './index-4ac684d0.js';
import './descriptors-store-02a4f91c.js';
import './lodash-cadbac1e.js';
import './toolbar-component-store-1febdbe0.js';
import './notification-store-40f3cb5a.js';

const WorkflowDefinitionVersionHistory = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.versionSelected = createEvent(this, "versionSelected", 7);
    this.deleteVersionClicked = createEvent(this, "deleteVersionClicked", 7);
    this.revertVersionClicked = createEvent(this, "revertVersionClicked", 7);
    this.onViewVersionClick = (e, version) => {
      e.preventDefault();
      this.versionSelected.emit(version);
    };
    this.onDeleteVersionClick = async (e, version) => {
      e.preventDefault();
      this.modalDialogService.show(() => DefaultContents.Warning("Are you sure you want to delete this version?"), {
        modalType: ModalType.Confirmation,
        actions: [DefaultModalActions.Delete(() => this.deleteVersionClicked.emit(version)), DefaultModalActions.Cancel()]
      });
    };
    this.onRevertVersionClick = (e, version) => {
      e.preventDefault();
      this.revertVersionClicked.emit(version);
    };
    this.selectedVersion = undefined;
    this.workflowVersions = undefined;
    this.serverUrl = undefined;
    this.eventBus = Container.get(EventBus);
    this.workflowDefinitionApi = Container.get(WorkflowDefinitionsApi);
    this.modalDialogService = Container.get(ModalDialogService);
  }
  render() {
    return (h("div", null, h("table", null, h("thead", null, h("tr", null, h("th", null), h("th", null, "Version"), h("th", null, "Created"), h("th", null), h("th", null))), h("tbody", null, this.workflowVersions.map(v => {
      let menuItems = [];
      menuItems.push({ text: 'Delete', handler: e => this.onDeleteVersionClick(e, v), icon: h(DeleteIcon, null) });
      if (!v.isLatest)
        menuItems.push({ text: 'Revert', handler: e => this.onRevertVersionClick(e, v), icon: h(RevertIcon, null) });
      return (h("tr", null, h("td", null, v.isPublished ? h(PublishedIcon, null) : ""), h("td", null, v.version), h("td", null, hooks(v.createdAt).format('DD-MM-YYYY HH:mm:ss')), h("td", null, h("button", { onClick: e => this.onViewVersionClick(e, v), type: "button", disabled: this.selectedVersion.version == v.version, class: this.selectedVersion.version == v.version ? "elsa-btn elsa-btn-primary" : "elsa-btn elsa-btn-secondary" }, "View")), h("td", null, v.isPublished || v.isPublished ? undefined : h("elsa-context-menu", { menuItems: menuItems }))));
    })))));
  }
};

export { WorkflowDefinitionVersionHistory as elsa_workflow_definition_version_history };

//# sourceMappingURL=elsa-workflow-definition-version-history.entry.js.map