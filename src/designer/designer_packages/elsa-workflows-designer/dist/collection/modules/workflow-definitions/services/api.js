var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
import { getVersionOptionsString, serializeQueryString } from '../../../utils';
import { Service } from 'typedi';
import { removeGuidsFromPortNames, addGuidsToPortNames } from '../../../utils/graph';
import { cloneDeep } from '@antv/x6/lib/util/object/object';
import { ElsaClientProvider } from '../../../services';
let WorkflowDefinitionsApi = class WorkflowDefinitionsApi {
  constructor(provider) {
    this.getHttpClient = async () => await this.provider.getHttpClient();
    this.provider = provider;
  }
  async publish(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.post(`workflow-definitions/${request.definitionId}/publish`, request);
    return response.data;
  }
  async execute(definitionId) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.post(`workflow-definitions/${definitionId}/execute`, {
      definitionId: definitionId,
    });
    return response.data;
  }
  async retract(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.post(`workflow-definitions/${request.definitionId}/retract`, request);
    return response.data;
  }
  async delete(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.delete(`workflow-definitions/${request.definitionId}`);
    return response.data;
  }
  async deleteVersion(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.delete(`workflow-definitions/${request.definitionId}/version/${request.version}`);
    return response.data;
  }
  async revertVersion(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.post(`workflow-definitions/${request.definitionId}/revert/${request.version}`);
    return response.data;
  }
  async post(request) {
    //TODO: Written as a workaround for different server and client models.
    //To be deleted after the port model on backend is updated.
    const requestClone = cloneDeep(request);
    removeGuidsFromPortNames(requestClone.model.root);
    const httpClient = await this.getHttpClient();
    const response = await httpClient.post('workflow-definitions', requestClone);
    addGuidsToPortNames(response.data.root);
    return response.data;
  }
  async get(request) {
    const queryString = {};
    if (!!request.versionOptions)
      queryString['versionOptions'] = getVersionOptionsString(request.versionOptions);
    if (request.includeCompositeRoot === true)
      queryString['includeCompositeRoot'] = true;
    const queryStringText = serializeQueryString(queryString);
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`workflow-definitions/${request.definitionId}${queryStringText}`);
    return response.data;
  }
  async getVersions(workflowDefinitionId) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`workflow-definitions/${workflowDefinitionId}/versions`);
    return response.data;
  }
  async list(request) {
    const queryString = {};
    if (!!request.materializerName)
      queryString.materializer = request.materializerName;
    if (!!request.versionOptions)
      queryString.versionOptions = getVersionOptionsString(request.versionOptions);
    if (!!request.page)
      queryString.page = request.page;
    if (!!request.pageSize)
      queryString.pageSize = request.pageSize;
    if (!!request.pageSize)
      queryString.orderBy = request.orderBy;
    if (!!request.label)
      queryString.label = request.label;
    if (!!request.searchTerm)
      queryString.searchTerm = request.searchTerm;
    const queryStringText = serializeQueryString(queryString);
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`workflow-definitions${queryStringText}`);
    return response.data;
  }
  async export(request) {
    const queryString = {};
    if (!!request.versionOptions)
      queryString['versionOptions'] = getVersionOptionsString(request.versionOptions);
    const queryStringText = serializeQueryString(queryString);
    const definitionId = request.definitionId;
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`workflow-definitions/${request.definitionId}/export${queryStringText}`, {
      responseType: 'blob',
    });
    const contentDispositionHeader = response.headers['content-disposition']; // Only available if the Elsa Server exposes the "Content-Disposition" header.
    const fileName = contentDispositionHeader ? contentDispositionHeader.split(';')[1].split('=')[1] : `workflow-definition-${definitionId}.json`;
    const data = response.data;
    return {
      fileName: fileName,
      data: data,
    };
  }
  async import(request) {
    const file = request.file;
    const definitionId = request.definitionId;
    const json = await file.text();
    const httpClient = await this.getHttpClient();
    let response;
    if (!definitionId) {
      response = await httpClient.put(`workflow-definitions/import`, json, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    else {
      response = await httpClient.post(`workflow-definitions/${definitionId}/import`, json, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    const workflowDefinition = response.data;
    // TODO: Written as a workaround for different server and client models.
    // To be deleted after the connection model on backend is updated.
    addGuidsToPortNames(workflowDefinition.root);
    return { workflowDefinition: workflowDefinition };
  }
  async deleteMany(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.post(`bulk-actions/delete/workflow-definitions/by-definition-id`, {
      definitionIds: request.definitionIds,
    });
    return response.data;
  }
  async publishMany(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.post(`/bulk-actions/publish/workflow-definitions/by-definition-ids`, {
      definitionIds: request.definitionIds,
    });
    return response.data;
  }
  async unpublishMany(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.post(`/bulk-actions/retract/workflow-definitions/by-definition-ids`, {
      definitionIds: request.definitionIds,
    });
    return response.data;
  }
  async updateWorkflowReferences(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.post(`workflow-definitions/${request.definitionId}/update-references`, request);
    return response.data;
  }
};
WorkflowDefinitionsApi = __decorate([
  Service(),
  __metadata("design:paramtypes", [ElsaClientProvider])
], WorkflowDefinitionsApi);
export { WorkflowDefinitionsApi };
export var WorkflowDefinitionsOrderBy;
(function (WorkflowDefinitionsOrderBy) {
  WorkflowDefinitionsOrderBy["Name"] = "Name";
  WorkflowDefinitionsOrderBy["Created"] = "Created";
})(WorkflowDefinitionsOrderBy || (WorkflowDefinitionsOrderBy = {}));
//# sourceMappingURL=api.js.map
