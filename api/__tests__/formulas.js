import axios from 'axios';
import { start } from '../server-setup';

const endpointPath = "/formulas";

const getAxiosConfig = serverPort => ({
  baseURL: `http://localhost:${serverPort}`,
  responseType: "json",
});

describe(endpointPath, () => {
  let appInstance;

  beforeAll(() => start().then(app => {
    appInstance = app;
    return app;
  }));

  afterAll(() => appInstance.destroy());

  it("should return 4 formulas", () => {
    axios.get(endpointPath, getAxiosConfig(appInstance.port))
      .then(({formulas}) => expect(formulas.length).toBe(4))
      .catch(err => console.error(err))
  });
});