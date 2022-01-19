import { OfficeMockObject } from "office-addin-mock";
import { JSDOM } from "jsdom";
import { jest } from "@jest/globals";

const officeMockData = {};
// Instantiate global mock object
const officeMockObject = new OfficeMockObject(officeMockData);
// @ts-ignore
global.Office = officeMockObject;

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

export function mockFetch(
  routes: {
    url: string;
    method: string;
    response: unknown;
    responseStatus?: number;
    acceptIf?: (jsonData: unknown) => boolean;
  }[]
): void {
  // @ts-ignore
  global.fetch = jest.fn((passedUrl: string, config: RequestInit) => {
    for (const route of routes) {
      const { url, method, response, responseStatus, acceptIf } = route;
      // Do not reject if acceptIf is undefined
      try {
        if (acceptIf && !acceptIf(JSON.parse(<string>config.body))) {
          continue;
        }
      } catch (e) {
        // JSON parse failed
        continue;
      }

      if (passedUrl.toLowerCase() === url.toLowerCase() && config.method === method) {
        return Promise.resolve({
          json: () => Promise.resolve(response),
          status: responseStatus ?? 200,
          statusText: "",
        });
      }
    }
    // only accepts DTO objects
    return Promise.reject("Unexpected fetch parameters");
  });
}
