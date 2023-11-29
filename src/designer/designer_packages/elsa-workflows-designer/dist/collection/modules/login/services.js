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
import 'reflect-metadata';
import { Service } from "typedi";
import { ElsaClientProvider, ServerSettings } from "../../services";
import axios from "axios";
let LoginApi = class LoginApi {
  constructor(provider, serverSettings) {
    this.provider = provider;
    this.serverSettings = serverSettings;
    this.provider = provider;
  }
  async login(username, password) {
    const httpClient = await this.provider.getHttpClient();
    const response = await httpClient.post(`identity/login`, { username, password });
    return response.data;
  }
  async refreshAccessToken(refreshToken) {
    const config = {
      baseURL: this.serverSettings.baseAddress,
      headers: {
        Authorization: `Bearer ${refreshToken}`
      }
    };
    const httpClient = axios.create(config);
    return await httpClient.post(`identity/refresh-token`)
      .then(response => response.data)
      .catch(error => error.response);
  }
};
LoginApi = __decorate([
  Service(),
  __metadata("design:paramtypes", [ElsaClientProvider, ServerSettings])
], LoginApi);
export { LoginApi };
//# sourceMappingURL=services.js.map
