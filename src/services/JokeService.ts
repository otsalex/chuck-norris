import Axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { type IJoke } from "../domain/IJoke";

export class JokeService {
  protected axios: AxiosInstance;

  constructor() {
    const config: AxiosRequestConfig = {
      baseURL: "https://api.chucknorris.io/jokes/",
    };

    this.axios = Axios.create(config);
  }

  async getJoke(): Promise<IJoke | Error> {
    try {
      const response = await this.axios.get<IJoke>("random");
      return response.data;
    } catch (e) {
      return e as Error;
    }
  }

  async getCategories(): Promise<string[] | Error> {
    try {
      const response = await this.axios.get<string[]>("categories");
      return response.data;
    } catch (e) {
      return e as Error;
    }
  }

  async getJokeByCategory(category: string): Promise<IJoke | Error> {
    try {
      const response = await this.axios.get<IJoke>("random", {
        params: { category },
      });
      return response.data;
    } catch (e) {
      return e as Error;
    }
  }
}
