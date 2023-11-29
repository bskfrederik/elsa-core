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
import { h } from "@stencil/core";
import { EventTypes } from "../../models";
import { Container, Service } from "typedi";
import { StudioService, AuthContext, EventBus } from "../../services";
import { LoginApi } from "./services";
let LoginPlugin = class LoginPlugin {
  constructor() {
    this.onHttpClientCreated = async (e) => {
      const axios = e.httpClient;
      const loginApi = Container.get(LoginApi);
      axios.interceptors.request.use(async (config) => {
        const authContext = Container.get(AuthContext);
        const token = authContext.getAccessToken();
        if (!!token)
          config.headers = Object.assign(Object.assign({}, config.headers), { Authorization: `Bearer ${token}` });
        return config;
      });
      axios.interceptors.response.use(async (response) => {
        return response;
      }, async (error) => {
        if (error.response.status !== 401 || error.response.config.hasRetriedRequest)
          return;
        const authContext = Container.get(AuthContext);
        const loginResponse = await loginApi.refreshAccessToken(authContext.getRefreshToken());
        if (loginResponse.isAuthenticated) {
          await authContext.updateTokens(loginResponse.accessToken, loginResponse.refreshToken, true);
          return await axios.request(Object.assign(Object.assign({}, error.config), { hasRetriedRequest: true, headers: Object.assign(Object.assign({}, error.config.headers), { Authorization: `Bearer ${loginResponse.accessToken}` }) }));
        }
        else {
          await authContext.signOut();
        }
      });
    };
    this.eventBus = Container.get(EventBus);
    this.studioService = Container.get(StudioService);
    this.eventBus.on(EventTypes.HttpClient.ClientCreated, this.onHttpClientCreated);
  }
  async initialize() {
    const authContext = Container.get(AuthContext);
    if (authContext.getIsSignedIn())
      return;
    this.studioService.show(() => h("elsa-login-page", null));
  }
};
LoginPlugin = __decorate([
  Service(),
  __metadata("design:paramtypes", [])
], LoginPlugin);
export { LoginPlugin };
//# sourceMappingURL=plugin.js.map
