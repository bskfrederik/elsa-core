'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-2c400919.js');
const edit = require('./edit-8886065b.js');
const lodash = require('./lodash-c9901408.js');
const models = require('./models-06a27d45.js');
const orderBy = require('./order-by-2382f0ca.js');
const utils = require('./utils-c73bd981.js');
require('./toolbar-component-store-27cb56e9.js');
require('./descriptors-store-815ac006.js');
const locale = require('./locale-4dbc7596.js');
require('./_commonjsHelpers-dcc4cf71.js');
require('./index-d016c735.js');
require('./notification-service-99c155e7.js');

const PublishIcon = () => index.h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "tw-h-5 tw-w-5 tw-text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" }));

const UnPublishIcon = () => index.h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "tw-h-5 tw-w-5 tw-text-gray-500", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
  index.h("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" }));

const RunWorkflowIcon = () => (index.h("svg", { class: "tw-h-5 tw-w-5 tw-text-gray-400", width: "24", height: "24", viewBox: "0 0 24 24", "stroke-width": "2", stroke: "currentColor", fill: "none", "stroke-linecap": "round", "stroke-linejoin": "round" },
  index.h("path", { d: "M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z", "stroke-width": "2", "stroke-linejoin": "round" })));

const Search = ({ onSearch, displayText }) => {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const searchTerm = formData.get('searchTerm').toString();
    onSearch(searchTerm);
  };
  const onSearchDebounced = lodash.lodash.debounce(onSearch, 200);
  const onKeyUp = (e) => {
    const term = e.target.value;
    onSearchDebounced(term);
  };
  return (index.h("div", { class: "tw-relative tw-z-10 tw-flex-shrink-0 tw-flex tw-h-16 tw-bg-white tw-border-b tw-border-gray-200" },
    index.h("div", { class: "tw-flex-1 tw-px-4 tw-flex tw-justify-between sm:tw-px-6 lg:tw-px-8" },
      index.h("div", { class: "tw-flex-1 tw-flex" },
        index.h("form", { class: "tw-w-full tw-flex md:tw-ml-0", onSubmit: onSubmit },
          index.h("label", { htmlFor: "search_field", class: "tw-sr-only" }, displayText),
          index.h("div", { class: "tw-relative tw-w-full tw-text-gray-400 focus-within:tw-text-gray-600" },
            index.h("div", { class: "tw-absolute tw-inset-y-0 tw-left-0 tw-flex tw-items-center tw-pointer-events-none" },
              index.h("svg", { class: "tw-h-5 tw-w-5", fill: "currentColor", viewBox: "0 0 20 20" },
                index.h("path", { "fill-rule": "evenodd", "clip-rule": "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" }))),
            index.h("input", { name: "searchTerm", onKeyUp: onKeyUp, class: "tw-block tw-w-full tw-h-full tw-pl-8 tw-pr-3 tw-py-2 tw-rounded-md tw-text-gray-900 tw-placeholder-cool-gray-500 focus:tw-placeholder-cool-gray-400 sm:tw-text-sm tw-border-0 focus:tw-outline-none focus:tw-ring-0", placeholder: displayText, type: "search" })))))));
};

const Filter = ({ pageSizeFilter, orderByFilter, onBulkDelete, onBulkPublish, onBulkUnpublish, labelFilter, bulkActionsText, bulkDeleteText, bulkPublishText, bulkUnpublishText }) => {
  return (index.h("div", { class: "tw-p-8 tw-flex tw-content-end tw-justify-right tw-bg-white tw-space-x-4" },
    index.h("div", { class: "tw-flex-shrink-0" },
      index.h(BulkActions, { onBulkDelete: onBulkDelete, onBulkPublish: onBulkPublish, onBulkUnpublish: onBulkUnpublish, bulkActionsText: bulkActionsText, bulkDeleteText: bulkDeleteText, bulkPublishText: bulkPublishText, bulkUnpublishText: bulkUnpublishText })),
    index.h("div", { class: "tw-flex-1" }, "\u00A0"),
    index.h(PageSizeFilter, Object.assign({}, pageSizeFilter)),
    index.h(OrderByFilter, Object.assign({}, orderByFilter))));
};
const BulkActions = ({ onBulkDelete, onBulkPublish, onBulkUnpublish, bulkActionsText, bulkDeleteText, bulkPublishText, bulkUnpublishText }) => {
  const bulkActions = [
    {
      text: bulkDeleteText,
      name: 'Delete',
    },
    {
      text: bulkPublishText,
      name: 'Publish',
    },
    {
      text: bulkUnpublishText,
      name: 'Unpublish',
    },
  ];
  const onBulkActionSelected = (e) => {
    const action = e.detail;
    switch (action.name) {
      case 'Delete':
        onBulkDelete();
        break;
      case 'Publish':
        onBulkPublish();
        break;
      case 'Unpublish':
        onBulkUnpublish();
        break;
      default:
        action.handler();
    }
  };
  return index.h("elsa-dropdown-button", { text: bulkActionsText, items: bulkActions, theme: "Secondary", icon: index.h(orderBy.BulkActionsIcon, null), origin: models.DropdownButtonOrigin.TopLeft, onItemSelected: onBulkActionSelected });
};
const PageSizeFilter = ({ selectedPageSize, onChange, pageSizeText }) => {
  const selectedPageSizeText = `${pageSizeText}: ${selectedPageSize}`;
  const pageSizes = [5, 10, 15, 20, 30, 50, 100];
  const items = pageSizes.map(x => {
    const text = '' + x;
    return { text: text, isSelected: x == selectedPageSize, value: x };
  });
  const onPageSizeChanged = (e) => onChange(parseInt(e.detail.value));
  return index.h("elsa-dropdown-button", { text: selectedPageSizeText, items: items, theme: "Secondary", icon: index.h(orderBy.PageSizeIcon, null), origin: models.DropdownButtonOrigin.TopRight, onItemSelected: onPageSizeChanged });
};
const OrderByFilter = ({ selectedOrderBy, onChange, orderByText }) => {
  const selectedOrderByText = !!selectedOrderBy ? `${orderByText}: ${selectedOrderBy}` : orderByText;
  const orderByValues = [utils.WorkflowDefinitionsOrderBy.Name, utils.WorkflowDefinitionsOrderBy.Created];
  const items = orderByValues.map(x => ({ text: x, value: x, isSelected: x == selectedOrderBy }));
  const onOrderByChanged = (e) => onChange(e.detail.value);
  return index.h("elsa-dropdown-button", { text: selectedOrderByText, items: items, theme: "Secondary", icon: index.h(orderBy.OrderByIcon, null), origin: models.DropdownButtonOrigin.TopRight, onItemSelected: onOrderByChanged });
};

function updateSelectedWorkflowDefinitions(isChecked, workflowDefinitions, selectedWorkflowDefinitionIds) {
  const currentItems = workflowDefinitions.items.filter(item => !item.isReadonly).map(x => x.definitionId);
  return isChecked
    ? selectedWorkflowDefinitionIds.concat(currentItems.filter(item => !selectedWorkflowDefinitionIds.includes(item)))
    : selectedWorkflowDefinitionIds.filter(item => !currentItems.includes(item));
}

const key = 'LS/wfDefinitionBrowser';
function getRequest() {
  var json = localStorage.getItem(key);
  if (!json)
    return;
  return JSON.parse(json);
}
function persistRequest(request) {
  localStorage.setItem(key, JSON.stringify(request));
}

const WorkflowDefinitionBrowser = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.workflowDefinitionSelected = index.createEvent(this, "workflowDefinitionSelected", 7);
    this.workflowInstancesSelected = index.createEvent(this, "workflowInstancesSelected", 7);
    this.workflowInstanceStarted = index.createEvent(this, "workflowInstanceStarted", 7);
    this.newWorkflowDefinitionSelected = index.createEvent(this, "newWorkflowDefinitionSelected", 7);
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
      this.modalDialogService.show(() => utils.DefaultContents.Warning('Are you sure you want to delete selected workflow definitions?'), {
        actions: [
          utils.DefaultModalActions.Delete(async () => {
            await this.api.deleteMany({ definitionIds: this.selectedWorkflowDefinitionIds });
            await this.loadWorkflowDefinitions();
            await this.activityDescriptorManager.refresh();
          }),
          utils.DefaultModalActions.Cancel(),
        ],
        modalType: utils.ModalType.Confirmation,
      });
    };
    this.onPublishManyClick = async () => {
      if (this.selectedWorkflowDefinitionIds.length == 0)
        return;
      this.modalDialogService.show(() => utils.DefaultContents.Warning('Are you sure you want to publish selected workflow definitions?'), {
        actions: [
          utils.DefaultModalActions.Publish(async () => {
            await this.api.publishMany({ definitionIds: this.selectedWorkflowDefinitionIds });
            await this.loadWorkflowDefinitions();
          }),
          utils.DefaultModalActions.Cancel(),
        ],
        modalType: utils.ModalType.Confirmation,
      });
    };
    this.onUnpublishManyClick = async () => {
      if (this.selectedWorkflowDefinitionIds.length == 0)
        return;
      this.modalDialogService.show(() => utils.DefaultContents.Warning('Are you sure you want to unpublish selected workflow definitions?'), {
        actions: [
          utils.DefaultModalActions.Unpublish(async () => {
            await this.api.unpublishMany({ definitionIds: this.selectedWorkflowDefinitionIds });
            await this.loadWorkflowDefinitions();
          }),
          utils.DefaultModalActions.Cancel(),
        ],
        modalType: utils.ModalType.Confirmation,
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
    this.api = utils.Container.get(utils.WorkflowDefinitionsApi);
    this.modalDialogService = utils.Container.get(utils.ModalDialogService);
    this.activityDescriptorManager = utils.Container.get(utils.ActivityDescriptorManager);
  }
  async componentWillLoad() {
    this.strings = await locale.getLocaleComponentStrings(this.element);
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
    this.modalDialogService.show(() => utils.DefaultContents.Warning('Are you sure you want to delete this workflow definition?'), {
      actions: [
        utils.DefaultModalActions.Delete(async () => {
          await this.api.delete(workflowDefinition);
          await this.loadWorkflowDefinitions();
          await this.activityDescriptorManager.refresh();
        }),
        utils.DefaultModalActions.Cancel(),
      ],
      modalType: utils.ModalType.Confirmation,
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
    return (index.h(index.Host, { class: "tw-block" }, index.h("div", { class: "tw-pt-4" }, index.h("h2", { class: "tw-text-lg tw-font-medium tw-ml-4 tw-mb-2" }, this.strings.title), index.h(Search, { onSearch: this.onSearch, displayText: this.strings.search }), index.h(Filter, Object.assign({}, filterProps)), index.h("div", { class: "tw-align-middle tw-inline-block tw-min-w-full tw-border-b tw-border-gray-200" }, index.h("table", { class: "default-table" }, index.h("thead", null, index.h("tr", null, index.h("th", null, index.h("input", { type: "checkbox", value: "true", checked: this.getSelectAllState(), onChange: e => this.onSelectAllCheckChange(e), ref: el => (this.selectAllCheckbox = el) })), index.h("th", null, index.h("span", { class: "lg:tw-pl-2" }, this.strings.name)), index.h("th", null, this.strings.instances), index.h("th", { class: "tw-text-center" }, this.strings.latestVersion), index.h("th", { class: "tw-text-center" }, this.strings.publishedVersion), index.h("th", null))), index.h("tbody", null, workflowDefinitions.items.map(workflowDefinition => {
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
      return (index.h("tr", null, index.h("td", null, index.h("input", { disabled: isReadonly, type: "checkbox", value: workflowDefinition.definitionId, checked: isSelected, onChange: e => this.onWorkflowDefinitionCheckChange(e, workflowDefinition) })), index.h("td", null, index.h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, index.h("a", { onClick: e => this.onWorkflowDefinitionClick(e, workflowDefinition), href: "#", class: "tw-truncate hover:tw-text-gray-600" }, index.h("span", null, workflowDisplayName)))), index.h("td", null, index.h("div", { class: "tw-flex tw-items-center tw-space-x-3 lg:tw-pl-2" }, index.h("a", { onClick: e => this.onWorkflowInstancesClick(e, workflowDefinition), href: "#", class: "tw-truncate hover:tw-text-gray-600" }, "Instances"))), index.h("td", { class: "tw-text-center" }, latestVersionNumber), index.h("td", { class: "tw-text-center" }, publishedVersionNumber), index.h("td", { class: "tw-pr-6" }, isReadonly ? ('') : (index.h("elsa-context-menu", { menuItems: [
          { text: 'Start', handler: e => this.onWorkflowInstanceStarted(e, workflowDefinition), icon: index.h(RunWorkflowIcon, null) },
          { text: this.strings.buttonEdit, handler: e => this.onWorkflowDefinitionClick(e, workflowDefinition), icon: index.h(edit.EditIcon, null) },
          isPublished
            ? { text: 'Unpublish', handler: e => this.onUnPublishClick(e, workflowDefinition), icon: index.h(UnPublishIcon, null) }
            : {
              text: this.strings.buttonPublish,
              handler: e => this.onPublishClick(e, workflowDefinition),
              icon: index.h(PublishIcon, null),
            },
          { text: this.strings.buttonDelete, handler: e => this.onDeleteClick(e, workflowDefinition), icon: index.h(edit.DeleteIcon, null) },
        ].concat(...this.customActions.map(x => ({
          text: x.text,
          handler: e => x.callbackFn(workflowDefinition),
          icon: null,
        }))) })))));
    }))), index.h("elsa-pager", { page: this.currentPage, pageSize: this.currentPageSize, totalCount: totalCount, onPaginated: this.onPaginated })))));
  }
  get element() { return index.getElement(this); }
};
WorkflowDefinitionBrowser.DEFAULT_PAGE_SIZE = 15;
WorkflowDefinitionBrowser.MIN_PAGE_SIZE = 5;
WorkflowDefinitionBrowser.MAX_PAGE_SIZE = 100;
WorkflowDefinitionBrowser.START_PAGE = 0;

exports.elsa_workflow_definition_browser = WorkflowDefinitionBrowser;

//# sourceMappingURL=elsa-workflow-definition-browser.cjs.entry.js.map