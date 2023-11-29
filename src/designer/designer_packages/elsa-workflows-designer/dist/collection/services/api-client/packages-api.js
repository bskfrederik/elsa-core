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
import { Service } from "typedi";
import { ElsaClientProvider } from "./elsa-client";
let PackagesApi = class PackagesApi {
  constructor(provider) {
    this.getHttpClient = async () => await this.provider.getHttpClient();
    this.provider = provider;
  }
  async getVersion() {
    const httpClient = await this.getHttpClient();
    const response = await httpClient.get(`package/version`);
    return response.data;
  }
};
PackagesApi = __decorate([
  Service(),
  __metadata("design:paramtypes", [ElsaClientProvider])
], PackagesApi);
export { PackagesApi };
//# sourceMappingURL=packages-api.js.map
