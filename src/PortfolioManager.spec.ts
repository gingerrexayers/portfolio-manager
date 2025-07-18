import { expect } from "chai";
import { mockIProperty, mockMeter } from "./Mocks.js";
import { PortfolioManager } from "./PortfolioManager.js";
import { PortfolioManagerApi } from "./PortfolioManagerApi.js";
import { IAccount, IMeter, IProperty } from "./types/index.js";

const BASE_URL = "https://portfoliomanager.energystar.gov/wstest/";

describe("PortfolioManager", async () => {
  let api: PortfolioManagerApi;
  let apiSecondary: PortfolioManagerApi;
  let pm: PortfolioManager;
  let pmSecondary: PortfolioManager;
  let account: IAccount;
  let accountSecondary: IAccount;
  let testProperty: IProperty;
  let testMeter: IMeter;
  async function ensureTestFixtures(done: () => void) {
    const USERNAME = process.env.PM_USERNAME;
    const PASSWORD = process.env.PM_PASSWORD;

    const SECONDARY_USERNAME = process.env.PM_SECONDARY_USERNAME;
    const SECONDARY_PASSWORD = process.env.PM_SECONDARY_PASSWORD;

    if (!USERNAME || !PASSWORD) {
      throw new Error(
        "Please set PM_USERNAME and PM_PASSWORD environment variables"
      );
    }

    if (!SECONDARY_USERNAME || !SECONDARY_PASSWORD) {
      console.warn(
        "Set PM_SECONDARY_USERNAME and PM_SECONDARY_PASSWORD environment variables to run connection tests"
      );
    } else {
      console.warn(
        "ESPM API does not support programatically sending connection requests",
        "Connection/Share tests may fail if not manually set up by sending a connection request from secondary account to primary account through the UI"
      );
      apiSecondary = new PortfolioManagerApi(
        BASE_URL,
        SECONDARY_USERNAME,
        SECONDARY_PASSWORD
      );
      console.log("apiSecondary", apiSecondary);
      pmSecondary = new PortfolioManager(apiSecondary);
      console.log("pmSecondary", pmSecondary);
      accountSecondary = await pmSecondary.getAccount(false);
      console.log("accountSecondary", accountSecondary);
    }
    api = new PortfolioManagerApi(BASE_URL, USERNAME, PASSWORD);
    pm = new PortfolioManager(api);
    account = await pm.getAccount();
    testProperty = await pm.createProperty(mockIProperty());
    testMeter = await pm.createMeter(testProperty.id, mockMeter());
    if (SECONDARY_USERNAME && SECONDARY_PASSWORD) {
      console.log("accepting connection from secondary account");
      const pendingConnections = await pm.getPendingConnections();
      console.log(pendingConnections);
      // await pm.acceptConnection(accountSecondary.id);
    }
    done();
  }

  before(function (done) {
    // testing api can be slow, so we'll be liberal with the timeouts.
    this.timeout(60000);
    ensureTestFixtures(done).catch((e) => {
      throw e;
    });
  });

  it("can be constucted", () => {
    expect(api).to.be.an.instanceof(PortfolioManagerApi);
    expect(pm).to.be.an.instanceof(PortfolioManager);
  });

  it("can set a meter additionalIdentifier", async () => {
    if (!testMeter.id) throw new Error("testMeter.id is undefined");
    const identifiers = await pm.getMeterAdditionalIdentifiers(testMeter.id);
    expect(identifiers).to.be.an("array");
    expect(identifiers).to.have.lengthOf(0);
    await pm.upsertMeterAdditionalIdentifier(testMeter.id, "Test", "Test");
    const identifiersNew = await pm.getMeterAdditionalIdentifiers(testMeter.id);
    expect(identifiersNew).to.be.an("array");
    expect(identifiersNew).to.have.lengthOf(1);
    expect(identifiersNew[0].description).to.equal("Test");
    expect(identifiersNew[0].value).to.equal("Test");

    await pm.upsertMeterAdditionalIdentifier(testMeter.id, "Test", "Test2");
    const identifiersUpdated = await pm.getMeterAdditionalIdentifiers(
      testMeter.id
    );
    expect(identifiersUpdated).to.be.an("array");
    expect(identifiersUpdated).to.have.lengthOf(1);
    expect(identifiersUpdated[0].description).to.equal("Test");
    expect(identifiersUpdated[0].value).to.equal("Test2");

    await pm.upsertMeterAdditionalIdentifier(testMeter.id, "Test2", "Test");
    const identifiersNew2 = await pm.getMeterAdditionalIdentifiers(
      testMeter.id
    );
    expect(identifiersNew2).to.be.an("array");
    expect(identifiersNew2).to.have.lengthOf(2);
    expect(identifiersNew2[0].description).to.equal("Test");
    expect(identifiersNew2[0].value).to.equal("Test2");
    expect(identifiersNew2[1].description).to.equal("Test2");
    expect(identifiersNew2[1].value).to.equal("Test");
  }).timeout(60000); // testing api can be slow so we'll be liberal with the timeouts
});
