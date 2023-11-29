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
import { AuthContext, EventBus, StudioService } from "../../services";
let HomePagePlugin = class HomePagePlugin {
  constructor(studioService, authContext) {
    this.studioService = studioService;
    this.authContext = authContext;
    this.showHomePage = () => {
      this.studioService.show(() => h("elsa-home-page", null));
    };
    this.onSignedIn = () => this.showHomePage();
    const eventBus = Container.get(EventBus);
    eventBus.on(EventTypes.Auth.SignedIn, this.onSignedIn);
  }
  async initialize() {
    if (this.authContext.getIsSignedIn())
      this.showHomePage();
  }
};
HomePagePlugin = __decorate([
  Service(),
  __metadata("design:paramtypes", [StudioService, AuthContext])
], HomePagePlugin);
export { HomePagePlugin };
//# sourceMappingURL=plugin.js.map
