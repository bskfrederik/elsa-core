import { AxiosInstance } from "axios";
import 'reflect-metadata';
import { ServerSettings } from '../server-settings';
import { DescriptorsApi } from "./descriptors-api";
import { DesignerApi } from "./designer-api";
import { ScriptingApi } from "./scripting-api";
export declare class ElsaClient {
  descriptors: DescriptorsApi;
  designer: DesignerApi;
  scripting: ScriptingApi;
  constructor(httpClient: AxiosInstance);
}
export declare class ElsaClientProvider {
  private serverSettings;
  private httpClient;
  private elsaClient;
  constructor(serverSettings: ServerSettings);
  getHttpClient(): Promise<AxiosInstance>;
  getElsaClient(): Promise<ElsaClient>;
}
