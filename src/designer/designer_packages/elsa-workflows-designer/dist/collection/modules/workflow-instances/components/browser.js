import { h, Host } from '@stencil/core';
import _ from 'lodash';
import { Search } from "./search";
import { Filter } from "./filter";
import { WorkflowInstancesApi } from "../services/workflow-instances-api";
import { getRequest, persistRequest } from '../services/lookup-persistence';
import { OrderDirection } from "../../../models";
import { Container } from "typedi";
import { WorkflowDefinitionsApi } from "../../workflow-definitions";
import { getSubStatusColor, updateSelectedWorkflowInstances } from "../services/utils";
import { formatTimestamp } from "../../../utils";
import { DeleteIcon, EditIcon } from "../../../components/icons/tooling";
import { DefaultContents, DefaultModalActions, ModalDialogService, ModalType } from '../../../components/shared/modal-dialog';
import { getLocaleComponentStrings } from '../../../utils/locale';
export class WorkflowInstanceBrowser {
  constructor() {
    this.publishedOrLatestWorkflows = [];
    this.onDeleteManyClick = async () => {
      if (this.selectedWorkflowInstanceIds.length == 0)
        return;
      this.modalDialogService.show(() => DefaultContents.Warning("Are you sure you want to delete selected workflow instances?"), {
        actions: [DefaultModalActions.Delete(async () => {
            await this.workflowInstancesApi.deleteMany({ workflowInstanceIds: this.selectedWorkflowInstanceIds });
            await this.loadWorkflowInstances();
          }), DefaultModalActions.Cancel()],
        modalType: ModalType.Confirmation
      });
    };
    this.onCancelManyClick = async () => {
      if (this.selectedWorkflowInstanceIds.length == 0)
        return;
      this.modalDialogService.show(() => DefaultContents.Warning("Are you sure you want to cancel selected workflow instances?"), {
        actions: [DefaultModalActions.Yes(async () => {
            await this.workflowInstancesApi.cancelMany({ workflowInstanceIds: this.selectedWorkflowInstanceIds });
            await this.loadWorkflowInstances();
          }), DefaultModalActions.Cancel()],
        modalType: ModalType.Confirmation
      });
    };
    this.resetPagination = () => {
      this.currentPage = 0;
      this.selectedWorkflowInstanceIds = [];
    };
    this.loadWorkflowDefinitions = async () => {
      const versionOptions = { allVersions: true };
      const workflows = await this.workflowDefinitionsApi.list({ versionOptions });
      this.publishedOrLatestWorkflows = this.selectLatestWorkflows(workflows.items);
    };
    this.getSelectAllState = () => {
      const { items } = this.workflowInstances;
      const selectedWorkflowInstanceIds = this.selectedWorkflowInstanceIds;
      return items.findIndex(item => !selectedWorkflowInstanceIds.includes(item.id)) < 0;
    };
    this.setSelectAllIndeterminateState = () => {
      if (this.selectAllCheckbox) {
        const selectedItems = this.workflowInstances.items.filter(item => this.selectedWorkflowInstanceIds.includes(item.id));
        this.selectAllCheckbox.indeterminate = selectedItems.length != 0 && selectedItems.length != this.workflowInstances.items.length;
      }
    };
    this.selectLatestWorkflows = (workflows) => {
      const groups = _.groupBy(workflows, 'definitionId');
      return _.map(groups, x => _.first(_.orderBy(x, 'version', 'desc')));
    };
    this.onSearch = async (term) => {
      this.searchTerm = term;
      this.resetPagination();
      await this.loadWorkflowInstances();
    };
    this.onPageSizeChanged = async (pageSize) => {
      this.currentPageSize = pageSize;
      this.resetPagination();
      await this.loadWorkflowInstances();
    };
    this.onWorkflowChanged = async (definitionId) => {
      this.selectedWorkflowDefinitionId = definitionId;
      this.resetPagination();
      await this.loadWorkflowInstances();
    };
    this.onWorkflowStatusChanged = async (status) => {
      this.selectedStatus = status;
      this.resetPagination();
      await this.loadWorkflowInstances();
    };
    this.onWorkflowSubStatusChanged = async (status) => {
      this.selectedSubStatus = status;
      this.resetPagination();
      await this.loadWorkflowInstances();
    };
    this.onOrderByChanged = async (orderBy) => {
      this.orderBy = orderBy;
      await this.loadWorkflowInstances();
    };
    this.onWorkflowInstanceClick = async (e, workflowInstance) => {
      e.preventDefault();
      this.workflowInstanceSelected.emit(workflowInstance);
    };
    this.onPaginated = async (e) => {
      this.currentPage = e.detail.page;
      await this.loadWorkflowInstances();
    };
    this.workflowDefinition = undefined;
    this.workflowInstances = { items: [], totalCount: 0 };
    this.workflows = [];
    this.selectAllChecked = undefined;
    this.selectedWorkflowInstanceIds = [];
    this.searchTerm = undefined;
    this.currentPage = 0;
    this.currentPageSize = WorkflowInstanceBrowser.DEFAULT_PAGE_SIZE;
    this.selectedWorkflowDefinitionId = undefined;
    this.selectedStatus = undefined;
    this.selectedSubStatus = undefined;
    this.orderBy = undefined;
    this.workflowInstancesApi = Container.get(WorkflowInstancesApi);
    this.workflowDefinitionsApi = Container.get(WorkflowDefinitionsApi);
    this.modalDialogService = Container.get(ModalDialogService);
  }
  async componentWillLoad() {
    this.strings = await getLocaleComponentStrings(this.element);
    var persistedRequest = getRequest();
    if (persistedRequest) {
      // TODO: Persist search term, need to bind the value to the input
      //this.searchTerm = persistedRequest.searchTerm
      this.currentPage = persistedRequest.page;
      this.currentPageSize = persistedRequest.pageSize;
      this.orderBy = persistedRequest.orderBy;
      this.selectedWorkflowDefinitionId = persistedRequest.definitionId;
      this.selectedStatus = persistedRequest.status;
      this.selectedSubStatus = persistedRequest.subStatus;
    }
    if (this.workflowDefinition != null)
      this.selectedWorkflowDefinitionId = this.workflowDefinition.definitionId;
    await this.loadWorkflowDefinitions();
    await this.loadWorkflowInstances();
  }
  render() {
    const publishedOrLatestWorkflows = this.publishedOrLatestWorkflows;
    const workflowInstances = this.workflowInstances;
    const totalCount = workflowInstances.totalCount;
    const filterProps = {
      resetText: this.strings.resetText,
      bulkText: this.strings.bulkText,
      bulkDeleteText: this.strings.bulkDeleteText,
      bulkCancelText: this.strings.bulkCancelText,
      pageSizeFilter: {
        selectedPageSize: this.currentPageSize,
        onChange: this.onPageSizeChanged,
        pageSizeText: this.strings.pageSizes,
      },
      orderByFilter: {
        selectedOrderBy: this.orderBy,
        onChange: this.onOrderByChanged,
        orderByText: this.strings.orderBy,
      },
      statusFilter: {
        selectedStatus: this.selectedStatus,
        onChange: this.onWorkflowStatusChanged
      },
      subStatusFilter: {
        selectedStatus: this.selectedSubStatus,
        onChange: this.onWorkflowSubStatusChanged
      },
      workflowFilter: {
        workflows: publishedOrLatestWorkflows,
        selectedWorkflowDefinitionId: this.selectedWorkflowDefinitionId,
        onChange: this.onWorkflowChanged,
        workflowText: this.strings.allWorkflows
      },
      resetFilter: async () => {
        this.resetPagination();
        this.currentPageSize = WorkflowInstanceBrowser.DEFAULT_PAGE_SIZE;
        this.selectedStatus = undefined;
        this.selectedSubStatus = undefined;
        this.orderBy = undefined;
        this.selectedWorkflowDefinitionId = undefined;
        await this.loadWorkflowInstances();
      },
      onBulkDelete: this.onDeleteManyClick,
      onBulkCancel: this.onCancelManyClick
    };
    return (h(Host, { class: "tw-block" }, h("div", { class: "tw-pt-4" }, h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, this.strings.name), h(Search, { onSearch: this.onSearch, searchTextPlaceholder: this.strings.searchTextPlaceholder }), h(Filter, Object.assign({}, filterProps)), h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, h("table", { class: "default-table" }, h("thead", null, h("tr", null, h("th", null, h("input", { type: "checkbox", value: "true", checked: this.getSelectAllState(), onChange: e => this.onSelectAllCheckChange(e), ref: el => this.selectAllCheckbox = el })), h("th", null, h("span", { class: "lg:tw-pl-2" }, this.strings.id)), h("th", null, this.strings.correlation), h("th", null, this.strings.worfklow), h("th", { class: "tw-align-right" }, this.strings.version), h("th", null, this.strings.workflowName), h("th", null, this.strings.status), h("th", null, this.strings.created), h("th", null, this.strings.finished), h("th", null))), h("tbody", { class: "tw-bg-white tw-divide-y tw-divide-gray-100" }, workflowInstances.items.map(workflowInstance => {
      const statusColor = getSubStatusColor(workflowInstance.subStatus);
      const isSelected = this.selectedWorkflowInstanceIds.findIndex(x => x === workflowInstance.id) >= 0;
      const workflow = publishedOrLatestWorkflows.find(x => x.definitionId == workflowInstance.definitionId);
      const workflowName = !!workflow ? (workflow.name || 'Untitled') : '(Definition not found)';
      return (h("tr", null, h("td", null, h("input", { type: "checkbox", value: workflowInstance.id, checked: isSelected, onChange: e => this.onWorkflowInstanceCheckChange(e, workflowInstance) })), h("td", null, h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, h("a", { onClick: e => this.onWorkflowInstanceClick(e, workflowInstance), href: "#", class: "tw-truncate hover:tw-text-gray-600" }, h("span", null, workflowInstance.id)))), h("td", null, workflowInstance.correlationId), h("td", null, workflowName), h("td", { class: "tw-align-right" }, workflowInstance.version), h("td", null, workflowInstance.name), h("td", null, h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, h("div", { class: `tw-flex-shrink-0 tw-w-2.5 tw-h-2.5 tw-rounded-full ${statusColor}` }), h("span", null, workflowInstance.status))), h("td", null, formatTimestamp(workflowInstance.createdAt, '-')), h("td", null, formatTimestamp(workflowInstance.finishedAt, '-')), h("td", { class: "tw-pr-6" }, h("elsa-context-menu", { menuItems: [
          { text: 'Edit', handler: e => this.onWorkflowInstanceClick(e, workflowInstance), icon: h(EditIcon, null) },
          { text: 'Delete', handler: e => this.onDeleteClick(e, workflowInstance), icon: h(DeleteIcon, null) }
        ] }))));
    }))), h("elsa-pager", { page: this.currentPage, pageSize: this.currentPageSize, totalCount: totalCount, onPaginated: this.onPaginated })))));
  }
  async loadWorkflowInstances() {
    const request = {
      searchTerm: this.searchTerm,
      definitionId: this.selectedWorkflowDefinitionId,
      status: this.selectedStatus,
      subStatus: this.selectedSubStatus,
      orderBy: this.orderBy,
      orderDirection: OrderDirection.Descending,
      page: this.currentPage,
      pageSize: this.currentPageSize
    };
    persistRequest(request);
    this.workflowInstances = await this.workflowInstancesApi.list(request);
  }
  async onDeleteClick(e, workflowInstance) {
    // const result = await this.confirmDialog.show(t('DeleteConfirmationModel.Title'), t('DeleteConfirmationModel.Message'));
    //
    // if (!result)
    //   return;
    //
    await this.workflowInstancesApi.delete(workflowInstance);
    await this.loadWorkflowInstances();
  }
  onSelectAllCheckChange(e) {
    const checkBox = e.target;
    const isChecked = checkBox.checked;
    this.selectAllChecked = isChecked;
    this.selectedWorkflowInstanceIds = updateSelectedWorkflowInstances(isChecked, this.workflowInstances, this.selectedWorkflowInstanceIds);
  }
  onWorkflowInstanceCheckChange(e, workflowInstance) {
    const checkBox = e.target;
    const isChecked = checkBox.checked;
    if (isChecked)
      this.selectedWorkflowInstanceIds = [...this.selectedWorkflowInstanceIds, workflowInstance.id];
    else
      this.selectedWorkflowInstanceIds = this.selectedWorkflowInstanceIds.filter(x => x != workflowInstance.id);
    this.setSelectAllIndeterminateState();
  }
  static get is() { return "elsa-workflow-instance-browser"; }
  static get properties() {
    return {
      "workflowDefinition": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "WorkflowDefinition",
          "resolved": "WorkflowDefinition",
          "references": {
            "WorkflowDefinition": {
              "location": "import",
              "path": "../../workflow-definitions/models/entities"
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
      "workflowInstances": {},
      "workflows": {},
      "selectAllChecked": {},
      "selectedWorkflowInstanceIds": {},
      "searchTerm": {},
      "currentPage": {},
      "currentPageSize": {},
      "selectedWorkflowDefinitionId": {},
      "selectedStatus": {},
      "selectedSubStatus": {},
      "orderBy": {}
    };
  }
  static get events() {
    return [{
        "method": "workflowInstanceSelected",
        "name": "workflowInstanceSelected",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "WorkflowInstanceSummary",
          "resolved": "WorkflowInstanceSummary",
          "references": {
            "WorkflowInstanceSummary": {
              "location": "import",
              "path": "../../../models"
            }
          }
        }
      }];
  }
  static get elementRef() { return "element"; }
}
WorkflowInstanceBrowser.DEFAULT_PAGE_SIZE = 15;
WorkflowInstanceBrowser.MIN_PAGE_SIZE = 5;
WorkflowInstanceBrowser.MAX_PAGE_SIZE = 100;
WorkflowInstanceBrowser.START_PAGE = 0;
//# sourceMappingURL=browser.js.map
