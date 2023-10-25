import { ElsaClientProvider } from "./elsa-client";
import { PackageVersion } from "../../models";
export declare class PackagesApi {
  private provider;
  constructor(provider: ElsaClientProvider);
  getVersion(): Promise<PackageVersion>;
  private getHttpClient;
}
