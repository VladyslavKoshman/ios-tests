import { remote } from 'webdriverio';
import { serverConfig } from '../config/appium.conf.js';
import { iosCaps } from '../config/capabilities.js';

let driver;

export async function getDriver() {
  if (!driver) {
    driver = await remote({
      ...serverConfig,
      capabilities: iosCaps,
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
