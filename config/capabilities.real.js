export const iosRealCaps = {
  platformName: 'iOS',
  deviceName: 'accountant', // имя устройства из Xcode (или `idevice_id -l`)
  udid: '00008110-000E28522206401E', // UDID твоего телефона (узнать командой выше)
  platformVersion: '17.0.1', // версия iOS на телефоне
  automationName: 'XCUITest',
  bundleId: 'aero.sofloworks.masterpilot', // твой app bundle id
  xcodeOrgId: '6CGNHJD5VX', // Apple Team ID
  xcodeSigningId: 'Apple Development',
  //updatedWDABundleId: 'com.facebookvlad.WebDriverAgentRunner.xctrunner', // уникальный bundle для WDA
  updatedWDABundleId: 'com.vlad.WebDriverAgentRunner', // уникальный bundle для WDA
  noReset: true,
};
