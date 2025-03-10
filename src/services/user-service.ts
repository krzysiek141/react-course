import HttpService from "./http-service";

export interface User {
  id: number;
  name: string;
  username: string;
}

export default new HttpService("/users");