import apiClient from "./api-client";

export interface Entity {
  id: number;
}

export default class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const requestPromise = apiClient.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });
    return { request: requestPromise, cancel: () => controller.abort() };
  }

  delete(id: number) {
    return apiClient.delete(`${this.endpoint}/${id}`);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.patch(`${this.endpoint}/${entity.id}`, entity);
  }
}

// const create = (endpoint: string) => new HttpService(endpoint);
// export default create;
