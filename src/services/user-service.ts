import apiClient from "./api-client";

export interface User {
  id: number;
  name: string;
  username: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const requestPromise = apiClient.get("/users", {
      signal: controller.signal,
    });
    return { request: requestPromise, cancel: () => controller.abort() };
  }

  deleteUser(userId: number) {
    return apiClient.delete(`/users/${userId}`);
  }

  createUser(user: User) {
    return apiClient.post(`/users`, user);
  }

  updateUser(user: User) {
    return apiClient.patch(`/users/${user.id}`, user);
  }
}

export default new UserService();
