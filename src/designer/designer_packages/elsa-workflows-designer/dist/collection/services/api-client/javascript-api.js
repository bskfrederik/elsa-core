export class JavaScriptApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  async getTypeDefinitions(request) {
    const response = await this.httpClient.post(`scripting/javascript/type-definitions/${request.workflowDefinitionId}`, request);
    return response.data;
  }
}
//# sourceMappingURL=javascript-api.js.map
