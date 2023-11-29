export function updateSelectedWorkflowDefinitions(isChecked, workflowDefinitions, selectedWorkflowDefinitionIds) {
  const currentItems = workflowDefinitions.items.filter(item => !item.isReadonly).map(x => x.definitionId);
  return isChecked
    ? selectedWorkflowDefinitionIds.concat(currentItems.filter(item => !selectedWorkflowDefinitionIds.includes(item)))
    : selectedWorkflowDefinitionIds.filter(item => !currentItems.includes(item));
}
//# sourceMappingURL=utils.js.map
