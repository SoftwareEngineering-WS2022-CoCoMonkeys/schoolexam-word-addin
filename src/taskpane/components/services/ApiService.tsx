import AuthentificationRepository from "./OnlineAuthenticationRepository";

export enum HttpMethod {
  POST = "POST",
  GET = "GET",
  PUT = "PUT",
  DELETE = "DELETE",
}

export default class ApiService {
  private static readonly BASE_URL = "https://cocomonkeys-schoolexam.herokuapp.com";
  static;

  static request(method: HttpMethod, url: string, data?: unknown): Promise<Response> {
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
    return fetch(this.BASE_URL + url, config)
      .catch((reason) => {
        return Promise.reject(`${method} ${url} failed\nreason: ${reason}\nrequest body: ${JSON.stringify(data)}`);
      })
      .then((response) => {
        switch (response.status) {
          case 200:
          case 201:
          case 204: {
            console.debug(`${method} ${url} returned code ${response.status}-${response.statusText}`);
            return response;
          }
          default:
            response
              .json()
              .then((json) => {
                console.error(
                  `${method} ${url} returned code ${response.status}-${response.statusText}, body:`,
                  json,
                  "\nrequest body: ",
                  data
                );
              })
              .catch();
            return Promise.reject(
              `${method} ${url} returned code ${response.status}-${response.statusText}\nrequest body: ${JSON.stringify(
                data
              )}`
            );
        }
      });
  }
}
