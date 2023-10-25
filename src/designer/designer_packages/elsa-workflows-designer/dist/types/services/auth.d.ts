import 'reflect-metadata';
import { EventBus } from "./event-bus";
export declare const AuthEventTypes: {
  Unauthorized: string;
};
export declare class AuthContext {
  private eventBus;
  constructor(eventBus: EventBus);
  signin(accessToken: string, refreshToken: string, createPersistentCookie: boolean): Promise<void>;
  updateTokens(accessToken: string, refreshToken: string, createPersistentCookie: boolean): Promise<void>;
  updateSession(name: string, permissions: Array<string>, accessToken: string, refreshToken: string, createPersistentCookie: boolean): void;
  signOut(): Promise<void>;
  getIsSignedIn(): boolean;
  getAccessToken(): string;
  getRefreshToken(): string;
}
