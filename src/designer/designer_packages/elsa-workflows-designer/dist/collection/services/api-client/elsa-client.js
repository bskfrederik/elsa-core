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
import axios from "axios";
import { Container, Service } from 'typedi';
import { EventBus } from '../event-bus';
import 'reflect-metadata';
import { ServerSettings } from '../server-settings';
import { DescriptorsApi } from "./descriptors-api";
import { DesignerApi } from "./designer-api";
import { EventTypes } from "../../models";
import { ScriptingApi } from "./scripting-api";
export class ElsaClient {
  constructor(httpClient) {
    this.descriptors = new DescriptorsApi(httpClient);
    this.designer = new DesignerApi(httpClient);
    this.scripting = new ScriptingApi(httpClient);
  }
}
let ElsaClientProvider = class ElsaClientProvider {
  constructor(serverSettings) {
    this.serverSettings = serverSettings;
  }
  async getHttpClient() {
    if (!!this.httpClient)
      return this.httpClient;
    return this.httpClient = await createHttpClient(this.serverSettings.baseAddress);
  }
  async getElsaClient() {
    if (!!this.elsaClient)
      return this.elsaClient;
    const httpClient = await this.getHttpClient();
    return this.elsaClient = new ElsaClient(httpClient);
  }
};
ElsaClientProvider = __decorate([
  Service(),
  __metadata("design:paramtypes", [ServerSettings])
], ElsaClientProvider);
export { ElsaClientProvider };
async function createHttpClient(baseAddress) {
  const config = {
    baseURL: baseAddress
  };
  const eventBus = Container.get(EventBus);
  await eventBus.emit(EventTypes.HttpClient.ConfigCreated, this, { config });
  const httpClient = axios.create(config);
  await eventBus.emit(EventTypes.HttpClient.ClientCreated, this, { httpClient });
  return httpClient;
}
//# sourceMappingURL=elsa-client.js.map
