import { RuntimeSelectListApi } from "./runtime-select-list-api";
export class DesignerApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
    this.runtimeSelectListApi = new RuntimeSelectListApi(httpClient);
  }
}
//# sourceMappingURL=designer-api.js.map
