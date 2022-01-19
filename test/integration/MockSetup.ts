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

export function mockFetch(routes: { url: string; method: string; response: unknown; responseStatus?: number }[]): void {
  // @ts-ignore
  global.fetch = jest.fn((passedUrl: string, config: RequestInit) => {
    for (const route of routes) {
      const url = route.url;
      const method = route.method;
      const response = route.response;
      const responseStatus = route.responseStatus;
      if (passedUrl.toLowerCase() === url.toLowerCase() && config.method === method) {
        return Promise.resolve({
          json: () => Promise.resolve(response),
          status: responseStatus ?? 200,
          statusText: "OK",
        });
      }
    }
    return Promise.reject("Unexpected fetch parameters");
  });
}
