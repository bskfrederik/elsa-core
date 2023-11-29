import { h, Host } from '@stencil/core';
import { Container } from 'typedi';
import { DeleteIcon, EditIcon, PublishIcon, UnPublishIcon } from '../../../components/icons/tooling';
import { Search } from './search';
import { Filter } from './filter';
import { updateSelectedWorkflowDefinitions } from '../services/utils';
import { WorkflowDefinitionsApi } from '../services/api';
import { ModalDialogService, DefaultModalActions, DefaultContents, ModalType } from '../../../components/shared/modal-dialog';
import { ActivityDescriptorManager } from '../../../services';
import { getRequest, persistRequest } from '../services/lookup-persistence';
import { RunWorkflowIcon } from '../../../components/icons/tooling/run-workflow';
import { getLocaleComponentStrings } from '../../../utils/locale';
export class WorkflowDefinitionBrowser {
  constructor() {
    this.onNewDefinitionClick = async () => {
      this.newWorkflowDefinitionSelected.emit();
    };
    this.onSearch = async (term) => {
      this.searchTerm = term;
      this.resetPagination();
      await this.loadWorkflowDefinitions();
    };
    this.onDeleteManyClick = async () => {
      if (this.selectedWorkflowDefinitionIds.length == 0)
        return;
      this.modalDialogService.show(() => DefaultContents.Warning('Are you sure you want to delete selected workflow definitions?'), {
        actions: [
          DefaultModalActions.Delete(async () => {
            await this.api.deleteMany({ definitionIds: this.selectedWorkflowDefinitionIds });
            await this.loadWorkflowDefinitions();
            await this.activityDescriptorManager.refresh();
          }),
          DefaultModalActions.Cancel(),
        ],
        modalType: ModalType.Confirmation,
      });
    };
    this.onPublishManyClick = async () => {
      if (this.selectedWorkflowDefinitionIds.length == 0)
        return;
      this.modalDialogService.show(() => DefaultContents.Warning('Are you sure you want to publish selected workflow definitions?'), {
        actions: [
          DefaultModalActions.Publish(async () => {
            await this.api.publishMany({ definitionIds: this.selectedWorkflowDefinitionIds });
            await this.loadWorkflowDefinitions();
          }),
          DefaultModalActions.Cancel(),
        ],
        modalType: ModalType.Confirmation,
      });
    };
    this.onUnpublishManyClick = async () => {
      if (this.selectedWorkflowDefinitionIds.length == 0)
        return;
      this.modalDialogService.show(() => DefaultContents.Warning('Are you sure you want to unpublish selected workflow definitions?'), {
        actions: [
          DefaultModalActions.Unpublish(async () => {
            await this.api.unpublishMany({ definitionIds: this.selectedWorkflowDefinitionIds });
            await this.loadWorkflowDefinitions();
          }),
          DefaultModalActions.Cancel(),
        ],
        modalType: ModalType.Confirmation,
      });
    };
    this.onWorkflowDefinitionClick = async (e, workflowDefinition) => {
      e.preventDefault();
      this.workflowDefinitionSelected.emit(workflowDefinition);
    };
    this.onWorkflowInstanceStarted = async (e, workflowDefinition) => {
      e.preventDefault();
      await this.onWorkflowStartClick(e, workflowDefinition);
      this.workflowInstanceStarted.emit(workflowDefinition);
    };
    this.onWorkflowInstancesClick = async (e, workflowDefinition) => {
      e.preventDefault();
      this.workflowInstancesSelected.emit(workflowDefinition);
    };
    this.onPaginated = async (e) => {
      this.currentPage = e.detail.page;
      await this.loadWorkflowDefinitions();
    };
    this.onPageSizeChanged = async (pageSize) => {
      this.currentPageSize = pageSize;
      this.resetPagination();
      await this.loadWorkflowDefinitions();
    };
    this.onOrderByChanged = async (orderBy) => {
      this.orderBy = orderBy;
      await this.loadWorkflowDefinitions();
    };
    this.onLabelChange = async (e) => {
      this.labels = e.detail;
      await this.loadWorkflowDefinitions();
    };
    this.resetPagination = () => {
      this.currentPage = 0;
      this.selectedWorkflowDefinitionIds = [];
    };
    this.getSelectAllState = () => {
      const { items } = this.workflowDefinitions;
      const selectedWorkflowInstanceIds = this.selectedWorkflowDefinitionIds;
      return items.findIndex(item => !selectedWorkflowInstanceIds.includes(item.definitionId)) < 0;
    };
    this.setSelectAllIndeterminateState = () => {
      if (this.selectAllCheckbox) {
        const selectedItems = this.workflowDefinitions.items.filter(item => this.selectedWorkflowDefinitionIds.includes(item.definitionId));
        this.selectAllCheckbox.indeterminate = selectedItems.length != 0 && selectedItems.length != this.workflowDefinitions.items.length;
      }
    };
    this.customActions = [];
    this.workflowDefinitions = { items: [], totalCount: 0 };
    this.publishedWorkflowDefinitions = { items: [], totalCount: 0 };
    this.selectedWorkflowDefinitionIds = [];
    this.currentPage = 0;
    this.currentPageSize = WorkflowDefinitionBrowser.DEFAULT_PAGE_SIZE;
    this.orderBy = undefined;
    this.labels = undefined;
    this.selectAllChecked = undefined;
    this.searchTerm = undefined;
    this.api = Container.get(WorkflowDefinitionsApi);
    this.modalDialogService = Container.get(ModalDialogService);
    this.activityDescriptorManager = Container.get(ActivityDescriptorManager);
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    const persistedRequest = getRequest();
    if (persistedRequest) {
      this.currentPage = persistedRequest.page;
      this.currentPageSize = persistedRequest.pageSize;
      this.orderBy = persistedRequest.orderBy;
    }
    await this.loadWorkflowDefinitions();
  }
  async onPublishClick(e, workflowDefinition) {
    await this.api.publish(workflowDefinition);
    await this.loadWorkflowDefinitions();
  }
  async onUnPublishClick(e, workflowDefinition) {
    await this.api.retract(workflowDefinition);
    await this.loadWorkflowDefinitions();
  }
  async onWorkflowStartClick(e, workflowDefinition) {
    await this.api.execute(workflowDefinition.definitionId);
    await this.loadWorkflowDefinitions();
  }
  async onDeleteClick(e, workflowDefinition) {
    this.modalDialogService.show(() => DefaultContents.Warning('Are you sure you want to delete this workflow definition?'), {
      actions: [
        DefaultModalActions.Delete(async () => {
          await this.api.delete(workflowDefinition);
          await this.loadWorkflowDefinitions();
          await this.activityDescriptorManager.refresh();
        }),
        DefaultModalActions.Cancel(),
      ],
      modalType: ModalType.Confirmation,
    });
  }
  async loadWorkflowDefinitions() {
    // TODO: Load only json-based workflow definitions for now.
    // Later, also allow CLR-based workflows to be "edited" (publish / unpublish / position activities / set variables, etc.)
    const materializerName = 'Json';
    const request = {
      searchTerm: this.searchTerm,
      materializerName,
      page: this.currentPage,
      pageSize: this.currentPageSize,
      versionOptions: { isLatest: true },
      orderBy: this.orderBy,
      label: this.labels,
    };
    persistRequest(request);
    const latestWorkflowDefinitions = await this.api.list(request);
    const unpublishedWorkflowDefinitionIds = latestWorkflowDefinitions.items.filter(x => !x.isPublished).map(x => x.definitionId);
    this.publishedWorkflowDefinitions = await this.api.list({
      materializerName,
      definitionIds: unpublishedWorkflowDefinitionIds,
      versionOptions: { isPublished: true },
    });
    this.workflowDefinitions = latestWorkflowDefinitions;
  }
  onWorkflowDefinitionCheckChange(e, workflowDefinition) {
    const checkBox = e.target;
    const isChecked = checkBox.checked;
    if (isChecked)
      this.selectedWorkflowDefinitionIds = [...this.selectedWorkflowDefinitionIds, workflowDefinition.definitionId];
    else
      this.selectedWorkflowDefinitionIds = this.selectedWorkflowDefinitionIds.filter(x => x != workflowDefinition.definitionId);
    this.setSelectAllIndeterminateState();
  }
  onSelectAllCheckChange(e) {
    const checkBox = e.target;
    const isChecked = checkBox.checked;
    this.selectAllChecked = isChecked;
    this.selectedWorkflowDefinitionIds = updateSelectedWorkflowDefinitions(isChecked, this.workflowDefinitions, this.selectedWorkflowDefinitionIds);
  }
  render() {
    const workflowDefinitions = this.workflowDefinitions;
    const publishedWorkflowDefinitions = this.publishedWorkflowDefinitions.items;
    const totalCount = workflowDefinitions.totalCount;
    const filterProps = {
      pageSizeFilter: {
        selectedPageSize: this.currentPageSize,
        onChange: this.onPageSizeChanged,
        pageSizeText: this.strings.pageSize,
      },
      orderByFilter: {
        selectedOrderBy: this.orderBy,
        onChange: this.onOrderByChanged,
        orderByText: this.strings.orderBy,
      },
      labelFilter: {
        selectedLabels: this.labels,
        onSelectedLabelsChanged: this.onLabelChange,
        buttonClass: 'tw-text-gray-500 hover:tw-text-gray-300',
        containerClass: 'tw-mt-1.5',
      },
      onBulkDelete: this.onDeleteManyClick,
      onBulkPublish: this.onPublishManyClick,
      onBulkUnpublish: this.onUnpublishManyClick,
      bulkActionsText: this.strings.bulkActions,
      bulkDeleteText: this.strings.bulkDelete,
      bulkPublishText: this.strings.bulkPublish,
      bulkUnpublishText: this.strings.bulkUnpublish,
    };
    return (h(Host, { class: "tw-block" }, h("div", { class: "tw-pt-4" }, h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, this.strings.title), h(Search, { onSearch: this.onSearch, displayText: this.strings.search }), h(Filter, Object.assign({}, filterProps)), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", null, h("input", { type: "checkbox", value: "true", checked: this.getSelectAllState(), onChange: e => this.onSelectAllCheckChange(e), ref: el => (this.selectAllCheckbox = el) })), h("th", null, h("span", { class: "lg:tw-pl-2" }, this.strings.name)), h("th", null, this.strings.instances), h("th", { class: "tw-text-center" }, this.strings.latestVersion), h("th", { class: "tw-text-center" }, this.strings.publishedVersion), h("th", null))), h("tbody", null, workflowDefinitions.items.map(workflowDefinition => {
      const latestVersionNumber = workflowDefinition.version;
      const { isPublished } = workflowDefinition;
      const publishedVersion = isPublished
        ? workflowDefinition
        : publishedWorkflowDefinitions.find(x => x.definitionId == workflowDefinition.definitionId);
      const publishedVersionNumber = !!publishedVersion ? publishedVersion.version : '-';
      const isReadonly = workflowDefinition.isReadonly;
      const isSelected = this.selectedWorkflowDefinitionIds.findIndex(x => x === workflowDefinition.definitionId) >= 0;
      let workflowDisplayName = workflowDefinition.name;
      if (!workflowDisplayName || workflowDisplayName.trim().length == 0)
        workflowDisplayName = 'Untitled';
      return (h("tr", null, h("td", null, h("input", { disabled: isReadonly, type: "checkbox", value: workflowDefinition.definitionId, checked: isSelected, onChange: e => this.onWorkflowDefinitionCheckChange(e, workflowDefinition) })), h("td", null, h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, h("a", { onClick: e => this.onWorkflowDefinitionClick(e, workflowDefinition), href: "#", class: "tw-truncate hover:tw-text-gray-600" }, h("span", null, workflowDisplayName)))), h("td", null, h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, h("a", { onClick: e => this.onWorkflowInstancesClick(e, workflowDefinition), href: "#", class: "tw-truncate hover:tw-text-gray-600" }, "Instances"))), h("td", { class: "tw-text-center" }, latestVersionNumber), h("td", { class: "tw-text-center" }, publishedVersionNumber), h("td", { class: "tw-pr-6" }, isReadonly ? ('') : (h("elsa-context-menu", { menuItems: [
          { text: 'Start', handler: e => this.onWorkflowInstanceStarted(e, workflowDefinition), icon: h(RunWorkflowIcon, null) },
          { text: this.strings.buttonEdit, handler: e => this.onWorkflowDefinitionClick(e, workflowDefinition), icon: h(EditIcon, null) },
          isPublished
            ? { text: 'Unpublish', handler: e => this.onUnPublishClick(e, workflowDefinition), icon: h(UnPublishIcon, null) }
            : {
              text: this.strings.buttonPublish,
              handler: e => this.onPublishClick(e, workflowDefinition),
              icon: h(PublishIcon, null),
            },
          { text: this.strings.buttonDelete, handler: e => this.onDeleteClick(e, workflowDefinition), icon: h(DeleteIcon, null) },
        ].concat(...this.customActions.map(x => ({
          text: x.text,
          handler: e => x.callbackFn(workflowDefinition),
          icon: null,
        }))) })))));
    }))), h("elsa-pager", { page: this.currentPage, pageSize: this.currentPageSize, totalCount: totalCount, onPaginated: this.onPaginated })))));
  }
  static get is() { return "elsa-workflow-definition-browser"; }
  static get properties() {
    return {
      "customActions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "CustomAction[]",
          "resolved": "CustomAction[]",
          "references": {
            "CustomAction": {
              "location": "local",
              "path": "C:/dev/elsav3/elsa-core/src/designer/designer_packages/elsa-workflows-designer/src/modules/workflow-definitions/components/browser.tsx"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "workflowDefinitions": {},
      "publishedWorkflowDefinitions": {},
      "selectedWorkflowDefinitionIds": {},
      "currentPage": {},
      "currentPageSize": {},
      "orderBy": {},
      "labels": {},
      "selectAllChecked": {},
      "searchTerm": {}
    };
  }
  static get events() {
    return [{
        "method": "workflowDefinitionSelected",
        "name": "workflowDefinitionSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowDefinitionSummary",
          "resolved": "WorkflowDefinitionSummary",
          "references": {
            "WorkflowDefinitionSummary": {
              "location": "import",
              "path": "../models/entities"
            }
          }
        }
      }, {
        "method": "workflowInstancesSelected",
        "name": "workflowInstancesSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowDefinitionSummary",
          "resolved": "WorkflowDefinitionSummary",
          "references": {
            "WorkflowDefinitionSummary": {
              "location": "import",
              "path": "../models/entities"
            }
          }
        }
      }, {
        "method": "workflowInstanceStarted",
        "name": "workflowInstanceStarted",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowDefinitionSummary",
          "resolved": "WorkflowDefinitionSummary",
          "references": {
            "WorkflowDefinitionSummary": {
              "location": "import",
              "path": "../models/entities"
            }
          }
        }
      }, {
        "method": "newWorkflowDefinitionSelected",
        "name": "newWorkflowDefinitionSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
}
WorkflowDefinitionBrowser.DEFAULT_PAGE_SIZE = 15;
WorkflowDefinitionBrowser.MIN_PAGE_SIZE = 5;
WorkflowDefinitionBrowser.MAX_PAGE_SIZE = 100;
WorkflowDefinitionBrowser.START_PAGE = 0;
//# sourceMappingURL=browser.js.map
