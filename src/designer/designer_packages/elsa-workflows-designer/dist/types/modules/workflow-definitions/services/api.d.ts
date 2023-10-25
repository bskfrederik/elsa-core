import { WorkflowDefinition, WorkflowDefinitionSummary } from "../models/entities";
import { PagedList, VersionOptions } from "../../../models";
import { ElsaClientProvider } from "../../../services";
export declare class WorkflowDefinitionsApi {
  private provider;
  constructor(provider: ElsaClientProvider);
  publish(request: PublishWorkflowDefinitionRequest): Promise<WorkflowDefinition>;
  retract(request: RetractWorkflowDefinitionRequest): Promise<WorkflowDefinition>;
  delete(request: DeleteWorkflowDefinitionRequest): Promise<WorkflowDefinition>;
  deleteVersion(request: DeleteWorkflowVersionRequest): Promise<WorkflowDefinition>;
  revertVersion(request: RevertWorkflowVersionRequest): Promise<WorkflowDefinition>;
  post(request: SaveWorkflowDefinitionRequest): Promise<WorkflowDefinition>;
  get(request: GetWorkflowRequest): Promise<WorkflowDefinition>;
  getVersions(workflowDefinitionId: string): Promise<Array<WorkflowDefinition>>;
  list(request: ListWorkflowDefinitionsRequest): Promise<PagedList<WorkflowDefinitionSummary>>;
  export(request: ExportWorkflowRequest): Promise<ExportWorkflowResponse>;
  import(request: ImportWorkflowRequest): Promise<ImportWorkflowResponse>;
  deleteMany(request: DeleteManyWorkflowDefinitionRequest): Promise<DeleteManyWorkflowDefinitionResponse>;
  publishMany(request: PublishManyWorkflowDefinitionRequest): Promise<PublishManyWorkflowDefinitionResponse>;
  unpublishMany(request: UnpublishManyWorkflowDefinitionRequest): Promise<UnpublishManyWorkflowDefinitionResponse>;
  updateWorkflowReferences(request: UpdateWorkflowReferencesRequest): Promise<UpdateWorkflowReferencesResponse>;
  private getHttpClient;
}
export interface SaveWorkflowDefinitionRequest {
  model: WorkflowDefinition;
  publish: boolean;
}
export interface BaseManyWorkflowDefinitionRequest {
  definitionIds: string[];
}
export interface DeleteManyWorkflowDefinitionRequest extends BaseManyWorkflowDefinitionRequest {
}
export interface PublishManyWorkflowDefinitionRequest extends BaseManyWorkflowDefinitionRequest {
}
export interface UnpublishManyWorkflowDefinitionRequest extends BaseManyWorkflowDefinitionRequest {
}
export interface DeleteWorkflowDefinitionRequest {
  definitionId: string;
}
export interface DeleteWorkflowVersionRequest {
  definitionId: string;
  version: number;
}
export interface RevertWorkflowVersionRequest {
  definitionId: string;
  version: number;
}
export interface RetractWorkflowDefinitionRequest {
  definitionId: string;
}
export interface PublishWorkflowDefinitionRequest {
  definitionId: string;
}
export interface GetWorkflowRequest {
  definitionId: string;
  versionOptions?: VersionOptions;
  includeCompositeRoot?: boolean;
}
export interface ExportWorkflowRequest {
  definitionId: string;
  versionOptions?: VersionOptions;
}
export interface ExportWorkflowResponse {
  fileName: string;
  data: Blob;
}
export interface ImportWorkflowRequest {
  definitionId?: string;
  file: File;
}
export interface ImportWorkflowResponse {
  workflowDefinition: WorkflowDefinition;
}
export declare enum WorkflowDefinitionsOrderBy {
  Name = "Name",
  Created = "Created"
}
export interface ListWorkflowDefinitionsRequest {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
  definitionIds?: Array<string>;
  versionOptions?: VersionOptions;
  materializerName?: string;
  orderBy?: WorkflowDefinitionsOrderBy;
  label?: Array<string>;
}
export interface DeleteManyWorkflowDefinitionResponse {
  deleted: number;
}
export interface PublishManyWorkflowDefinitionResponse {
  published: string[];
  alreadyPublished: string[];
  notFound: string[];
}
export interface UnpublishManyWorkflowDefinitionResponse {
  retracted: string[];
  notPublished: string[];
  notFound: string[];
}
export interface UpdateWorkflowReferencesRequest {
  definitionId: string;
  consumingWorkflowIds?: Array<string>;
}
export interface UpdateWorkflowReferencesResponse {
  affectedWorkflows: Array<string>;
}
