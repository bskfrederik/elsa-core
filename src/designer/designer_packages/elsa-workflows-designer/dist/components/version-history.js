import { h, proxyCustomElement, HTMLElement, createEvent } from '@stencil/core/internal/client';
import { aO as DefaultContents, C as Container, B as EventBus, Y as WorkflowDefinitionsApi, aN as ModalDialogService } from './utils.js';
import './toolbar-component-store.js';
import './descriptors-store.js';
import { D as DeleteIcon } from './delete.js';
import { h as hooks } from './notification-service.js';
import { M as ModalType, D as DefaultModalActions } from './modal-type.js';
import { g as getLocaleComponentStrings } from './locale.js';
import { d as defineCustomElement$1 } from './context-menu.js';

const RevertIcon = () => h("svg", { class: "tw-h-6 tw-w-6 tw-text-gray-500", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { stroke: "none", d: "M0 0h24v24H0z" }),
  h("path", { d: "M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" }));

const PublishedIcon = () => h("svg", { class: "tw-h-6 tw-w-6 tw-text-blue-500", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round" },
  h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" }));

const WorkflowDefinitionVersionHistory = /*@__PURE__*/ proxyCustomElement(class WorkflowDefinitionVersionHistory extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
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
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
  }
  render() {
    return (h("div", null, h("table", null, h("thead", null, h("tr", null, h("th", null), h("th", null, this.strings.version), h("th", null, this.strings.created), h("th", null), h("th", null))), h("tbody", null, this.workflowVersions.map(v => {
      let menuItems = [];
      menuItems.push({ text: this.strings.delete, handler: e => this.onDeleteVersionClick(e, v), icon: h(DeleteIcon, null) });
      if (!v.isLatest)
        menuItems.push({ text: this.strings.revert, handler: e => this.onRevertVersionClick(e, v), icon: h(RevertIcon, null) });
      return (h("tr", null, h("td", null, v.isPublished ? h(PublishedIcon, null) : ""), h("td", null, v.version), h("td", null, hooks(v.createdAt).format('DD-MM-YYYY HH:mm:ss')), h("td", null, h("button", { onClick: e => this.onViewVersionClick(e, v), type: "button", disabled: this.selectedVersion.version == v.version, class: this.selectedVersion.version == v.version ? "elsa-btn elsa-btn-primary" : "elsa-btn elsa-btn-secondary" }, this.strings.view)), h("td", null, v.isPublished || v.isPublished ? undefined : h("elsa-context-menu", { menuItems: menuItems }))));
    })))));
  }
  get element() { return this; }
}, [0, "elsa-workflow-definition-version-history", {
    "selectedVersion": [16],
    "workflowVersions": [16],
    "serverUrl": [1, "server-url"]
  }]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["elsa-workflow-definition-version-history", "elsa-context-menu"];
  components.forEach(tagName => { switch (tagName) {
    case "elsa-workflow-definition-version-history":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WorkflowDefinitionVersionHistory);
      }
      break;
    case "elsa-context-menu":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WorkflowDefinitionVersionHistory as W, defineCustomElement as d };

//# sourceMappingURL=version-history.js.map