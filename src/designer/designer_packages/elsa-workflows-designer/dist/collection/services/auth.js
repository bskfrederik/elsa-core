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
import cookies from 'js-cookie';
import authStore from "../data/auth-store";
import { EventBus } from "./event-bus";
import { EventTypes } from "../models";
import jwt_decode from "jwt-decode";
export const AuthEventTypes = {
  Unauthorized: 'auth:unauthorized'
};
let AuthContext = class AuthContext {
  constructor(eventBus) {
    this.eventBus = eventBus;
    const sessionData = sessionStorage.getItem('dashboard-session');
    const data = sessionData || cookies.get('dashboard-session');
    if (data && data.length > 0) {
      const authData = JSON.parse(data);
      authStore.name = authData.name;
      authStore.permissions = authData.permissions;
      authStore.signedIn = authData.signedIn;
      authStore.accessToken = authData.accessToken;
      authStore.refreshToken = authData.refreshToken;
    }
  }
  async signin(accessToken, refreshToken, createPersistentCookie) {
    await this.updateTokens(accessToken, refreshToken, createPersistentCookie);
    await this.eventBus.emit(EventTypes.Auth.SignedIn);
  }
  async updateTokens(accessToken, refreshToken, createPersistentCookie) {
    const claims = jwt_decode(accessToken);
    const permissions = claims.permissions || [];
    const name = claims.name || '';
    await this.updateSession(name, permissions, accessToken, refreshToken, createPersistentCookie);
  }
  updateSession(name, permissions, accessToken, refreshToken, createPersistentCookie) {
    authStore.name = name;
    authStore.permissions = permissions;
    authStore.signedIn = true;
    authStore.accessToken = accessToken;
    authStore.refreshToken = refreshToken;
    const data = JSON.stringify(authStore);
    sessionStorage.setItem('dashboard-session', data);
    if (createPersistentCookie) {
      cookies.set("dashboard-session", data);
    }
  }
  async signOut() {
    authStore.name = null;
    authStore.permissions = [];
    authStore.signedIn = false;
    authStore.accessToken = null;
    authStore.refreshToken = null;
    sessionStorage.clear();
    cookies.remove('dashboard-session');
    await this.eventBus.emit(EventTypes.Auth.SignedOut);
  }
  getIsSignedIn() {
    return authStore.signedIn;
  }
  getAccessToken() {
    return authStore.accessToken;
  }
  getRefreshToken() {
    return authStore.refreshToken;
  }
};
AuthContext = __decorate([
  Service(),
  __metadata("design:paramtypes", [EventBus])
], AuthContext);
export { AuthContext };
//# sourceMappingURL=auth.js.map
