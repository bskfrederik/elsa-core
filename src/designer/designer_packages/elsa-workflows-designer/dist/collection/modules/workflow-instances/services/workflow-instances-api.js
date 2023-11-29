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
import { getVersionOptionsString, serializeQueryString } from "../../../utils";
import { Service } from "typedi";
import { ElsaClientProvider } from "../../../services";
let WorkflowInstancesApi = class WorkflowInstancesApi {
  constructor(provider) {
    this.getHttpClient = async () => await this.provider.getHttpClient();
    this.provider = provider;
  }
  async list(request) {
    let queryString = {
      searchTerm: request.searchTerm,
      definitionId: request.definitionId,
      correlationId: request.correlationId,
      status: request.status,
      subStatus: request.subStatus,
      orderBy: request.orderBy,
      orderDirection: request.orderDirection,
      page: request.page,
      pageSize: request.pageSize
    };
    if (!!request.versionOptions)
      queryString['versionOptions'] = getVersionOptionsString(request.versionOptions);
    if (!!request.definitionIds)
      queryString['definitionIds'] = request.definitionIds.join(',');
    const queryStringText = serializeQueryString(queryString);
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`workflow-instances${queryStringText}`);
    return response.data;
  }
  async get(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`workflow-instances/${request.id}`);
    return response.data;
  }
  async delete(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.delete(`workflow-instances/${request.id}`);
    return response.data;
  }
  async deleteMany(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.post(`bulk-actions/delete/workflow-instances/by-id`, {
      Ids: request.workflowInstanceIds,
    });
    return response.data;
  }
  async cancelMany(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.post(`bulk-actions/cancel/workflow-instances/by-id`, {
      Ids: request.workflowInstanceIds,
    });
    return response.data;
  }
  async getJournal(request) {
    let queryString = {
      page: request.page,
      pageSize: request.pageSize
    };
    const queryStringText = serializeQueryString(queryString);
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`workflow-instances/${request.workflowInstanceId}/journal${queryStringText}`);
    return response.data;
  }
};
WorkflowInstancesApi = __decorate([
  Service(),
  __metadata("design:paramtypes", [ElsaClientProvider])
], WorkflowInstancesApi);
export { WorkflowInstancesApi };
//# sourceMappingURL=workflow-instances-api.js.map
