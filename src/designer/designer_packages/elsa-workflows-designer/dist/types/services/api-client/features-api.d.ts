import { AxiosInstance } from "axios";
export declare class FeaturesApi {
  private httpClient;
  constructor(httpClient: AxiosInstance);
  getInstalledFeatures(): Promise<Array<FeatureDescriptor>>;
}
export interface FeatureDescriptor {
  name: string;
  displayName: string;
  description: string;
}
