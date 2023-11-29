export class WorkflowActivationStrategiesApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  async list() {
    const response = await this.httpClient.get('descriptors/workflow-activation-strategies');
    return response.data.items;
  }
}
//# sourceMappingURL=workflow-activation-strategies-api.js.map
