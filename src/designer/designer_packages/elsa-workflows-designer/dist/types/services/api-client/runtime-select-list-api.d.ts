import { SelectList } from "../../models";
import { AxiosInstance } from "axios";
export declare class RuntimeSelectListApi {
  private httpClient;
  constructor(httpClient: AxiosInstance);
  get(providerTypeName: string, context?: any): Promise<SelectList>;
}
