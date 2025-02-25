export declare enum WorkflowStatus {
  Running = "Running",
  Finished = "Finished"
}
export declare enum WorkflowSubStatus {
  Executing = "Executing",
  Suspended = "Suspended",
  Finished = "Finished",
  Compensating = "Compensating",
  Cancelled = "Cancelled",
  Faulted = "Faulted"
}
export declare enum OrderBy {
  Created = "Created",
  Updated = "Updated",
  Finished = "Finished"
}
export declare enum OrderDirection {
  Ascending = "Ascending",
  Descending = "Descending"
}
export interface WorkflowInstanceSummary {
  id: string;
  definitionId: string;
  definitionVersionId: string;
  version: number;
  status: WorkflowStatus;
  subStatus: WorkflowSubStatus;
  correlationId: string;
  name?: string;
  createdAt: Date;
  updatedAt?: Date;
  finishedAt?: Date;
}
export interface WorkflowInstance extends WorkflowInstanceSummary {
  properties: any;
}
export interface PagedList<T> {
  items: Array<T>;
  page?: number;
  pageSize?: number;
  totalCount: number;
}
export interface List<T> {
  items: Array<T>;
  count: number;
}
export interface VersionOptions {
  isLatest?: boolean;
  isLatestOrPublished?: boolean;
  isPublished?: boolean;
  isDraft?: boolean;
  allVersions?: boolean;
  version?: number;
}
export interface IntellisenseContext {
  activityTypeName: string;
  propertyName: string;
}
export interface StorageDriverDescriptor {
  typeName: string;
  displayName: string;
}
export interface WorkflowActivationStrategyDescriptor {
  displayName: string;
  description: string;
  typeName: string;
}
export interface PackageVersion {
  packageVersion: string;
}
