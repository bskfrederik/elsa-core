export class StorageDriversApi {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }
  async list() {
    const response = await this.httpClient.get('descriptors/storage-drivers');
    return response.data.items;
  }
}
//# sourceMappingURL=storage-drivers-api.js.map
