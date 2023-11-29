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
import { ElsaClientProvider } from "../../services";
import { Service } from "typedi";
let LabelsApi = class LabelsApi {
  constructor(provider) {
    this.provider = provider;
  }
  async list() {
    const httpClient = await this.provider.getHttpClient();
    const response = await httpClient.get('labels');
    return response.data.items;
  }
  async create(name, description, color) {
    const httpClient = await this.provider.getHttpClient();
    const response = await httpClient.post('labels', { name, description, color });
    return response.data;
  }
  async update(id, name, description, color) {
    const httpClient = await this.provider.getHttpClient();
    const response = await httpClient.post(`labels/${id}`, { name, description, color });
    return response.data;
  }
  async delete(id) {
    const httpClient = await this.provider.getHttpClient();
    const response = await httpClient.delete(`labels/${id}`);
    return response.status === 204;
  }
};
LabelsApi = __decorate([
  Service(),
  __metadata("design:paramtypes", [ElsaClientProvider])
], LabelsApi);
export { LabelsApi };
let WorkflowDefinitionLabelsApi = class WorkflowDefinitionLabelsApi {
  constructor(provider) {
    this.provider = provider;
  }
  async get(definitionVersionId) {
    const httpClient = await this.provider.getHttpClient();
    const response = await httpClient.get(`workflow-definitions/${definitionVersionId}/labels`);
    return response.data.items;
  }
  async update(definitionVersionId, labelIds) {
    const httpClient = await this.provider.getHttpClient();
    const response = await httpClient.post(`workflow-definitions/${definitionVersionId}/labels`, { labelIds: labelIds });
    return response.data.items;
  }
};
WorkflowDefinitionLabelsApi = __decorate([
  Service(),
  __metadata("design:paramtypes", [ElsaClientProvider])
], WorkflowDefinitionLabelsApi);
export { WorkflowDefinitionLabelsApi };
//# sourceMappingURL=labels-api.js.map
