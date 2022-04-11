import * as supertest from "supertest";
import {Response} from "supertest";
import {app} from "../../index";
import DoneCallback = jest.DoneCallback;

describe("User controller test", () => {
  describe("getById", () => {
    test("should be return user", (done: DoneCallback) => {
      supertest(app).get('/user/1').then((response: Response) => {
        expect(response.statusCode).toBe(404);
        done();
      });
    });
  });
});