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
import { serializeQueryString } from "../../../utils";
import { Service } from "typedi";
import { ElsaClientProvider } from "../../../services";
let JournalApi = class JournalApi {
  constructor(provider) {
    this.getHttpClient = async () => await this.provider.getHttpClient();
    this.provider = provider;
  }
  async list(request) {
    let queryString = {
      page: request.page,
      pageSize: request.pageSize
    };
    const queryStringText = serializeQueryString(queryString);
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`workflow-instances/${request.workflowInstanceId}/journal${queryStringText}`);
    return response.data;
  }
  async getLastEntry(request) {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`workflow-instances/${request.workflowInstanceId}/journal/${request.activityId}`);
    return response.data;
  }
};
JournalApi = __decorate([
  Service(),
  __metadata("design:paramtypes", [ElsaClientProvider])
], JournalApi);
export { JournalApi };
//# sourceMappingURL=journal-api.js.map
