export class ActivityDescriptorsApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  async list() {
    const response = await this.httpClient.get('descriptors/activities');
    return response.data.items;
  }
}
//# sourceMappingURL=activity-descriptors-api.js.map
