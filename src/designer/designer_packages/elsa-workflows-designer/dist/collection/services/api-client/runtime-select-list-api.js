export class RuntimeSelectListApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  async get(providerTypeName, context) {
    const response = await this.httpClient.post('designer/runtime-select-list', {
      providerTypeName: providerTypeName,
      context: context
    });
    return response.data;
  }
}
//# sourceMappingURL=runtime-select-list-api.js.map
