import { remote } from 'webdriverio';
import { serverConfig } from '../config/appium.conf.js';
import { iosSimCaps } from '../config/capabilities.sim.js';
import { iosRealCaps } from '../config/capabilities.real.js';

let driver;

export async function getDriver() {
  if (!driver) {
    const env = process.env.TEST_ENV || 'sim';
    const caps = env === 'real' ? iosRealCaps : iosSimCaps;

    driver = await remote({
      ...serverConfig,
      capabilities: caps,
    });
  }
  return driver;
}

export async function quitDriver() {
  if (driver) {
    await driver.deleteSession();
    driver = null;
  }
}
