import AuthentificationRepository from "../repository/OnlineAuthenticationRepository";
import ServerError from "./ServerError";

/**
 * Important HTTP methods
 */
export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

/**
 * Service for HTTP requests to the SchoolExam API endpoint.
 */
export default class ApiService {
  private static readonly BASE_URL = "https://cocomonkeys-schoolexam.herokuapp.com";

  /**
   * Send a request to the backend.
   * @param method The HTTP method to use.
   * @param path The path (URL suffix) to use.
   * @param data The (optional) data to supply in JSON format in the request body.
   * @returns The HTTP response wrapped in a Promise.
   */
  static request(method: HttpMethod, path: string, data?: unknown): Promise<Response> {
    const config: RequestInit = {
      method: method.toString(),
      // includes JWT for authentication
      headers: AuthentificationRepository.authHeader(),
    };
    if (data) {
      config.body = JSON.stringify(data);
      // default to JSON
      config.headers = { ...config.headers, "Content-Type": "application/json" };
    }
    return fetch(this.BASE_URL + path, config)
      .catch((reason) => {
        return Promise.reject(`${method} ${path} failed\nreason: ${reason}\nrequest body: ${JSON.stringify(data)}`);
      })
      .then(async (response) => {
        switch (response.status) {
          case 200:
          case 201:
          case 204: {
            // Accepted
            console.debug(`${method} ${path} returned code ${response.status}-${response.statusText}`);
            return response;
          }
          default: {
            // Indicates error / unexpected behaviour
            // Check for error message in JSON
            const errorMessage = await response
              .json()
              .then((json) => {
                return JSON.stringify(json);
              })
              .catch(() => "");
            return Promise.reject(new ServerError(response.status, response.statusText, errorMessage));
          }
        }
      });
  }
}
