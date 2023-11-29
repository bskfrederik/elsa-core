export class VariableDescriptorsApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  async list() {
    const response = await this.httpClient.get('descriptors/variables');
    return response.data.items;
  }
}
//# sourceMappingURL=variable-descriptors-api.js.map
