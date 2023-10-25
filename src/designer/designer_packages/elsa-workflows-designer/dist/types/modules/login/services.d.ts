import 'reflect-metadata';
import { ElsaClientProvider, ServerSettings } from "../../services";
import { LoginResponse } from "./models";
export declare class LoginApi {
  private provider;
  private serverSettings;
  constructor(provider: ElsaClientProvider, serverSettings: ServerSettings);
  login(username: string, password: string): Promise<LoginResponse>;
  refreshAccessToken(refreshToken: string): Promise<LoginResponse>;
}
