export var WorkflowStatus;
(function (WorkflowStatus) {
  WorkflowStatus["Running"] = "Running";
  WorkflowStatus["Finished"] = "Finished";
})(WorkflowStatus || (WorkflowStatus = {}));
export var WorkflowSubStatus;
(function (WorkflowSubStatus) {
  WorkflowSubStatus["Executing"] = "Executing";
  WorkflowSubStatus["Suspended"] = "Suspended";
  WorkflowSubStatus["Finished"] = "Finished";
  WorkflowSubStatus["Compensating"] = "Compensating";
  WorkflowSubStatus["Cancelled"] = "Cancelled";
  WorkflowSubStatus["Faulted"] = "Faulted";
})(WorkflowSubStatus || (WorkflowSubStatus = {}));
export var OrderBy;
(function (OrderBy) {
  OrderBy["Created"] = "Created";
  OrderBy["Updated"] = "Updated";
  OrderBy["Finished"] = "Finished";
})(OrderBy || (OrderBy = {}));
export var OrderDirection;
(function (OrderDirection) {
  OrderDirection["Ascending"] = "Ascending";
  OrderDirection["Descending"] = "Descending";
})(OrderDirection || (OrderDirection = {}));
//# sourceMappingURL=api.js.map
