import BaseScreen from './BaseScreen.js';

export default class ProfileScreen extends BaseScreen {
  // Навигация на "Profile"
  get profileTab() {
    return this.driver.$('//XCUIElementTypeStaticText[@name="Profile"]');
  }
  get addNewPlane() {
    return this.driver.$('~Add New Plane'); // name("Add New Plane")
  }
  get manufacturerAdd() {
    return this.driver.$('~Manufacturer, Add');
  }
  get americanChampion() {
    return this.driver.$('~American Champion');
  }
  get typeAdd() {
    return this.driver.$('~Type, Add');
  }
  get citabriaCH7A() {
    return this.driver.$('~Citabria (CH7A)');
  }
  // tail number поле (xpath из Java)
  get tailNumberField() {
    return this.driver.$('//XCUIElementTypeCollectionView/XCUIElementTypeCell[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther');
  }
  get addAircraftBtn() {
    return this.driver.$('~Add Aircraft');
  }

  // второй кейс (смена иконки)
  get iconCell5() {
    return this.driver.$('//XCUIElementTypeCollectionView/XCUIElementTypeCell[5]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther');
  }
  get twinIcon() {
    return this.driver.$('~Twin');
  }

  async openProfile() {
    await this.click(this.profileTab);
  }

  async addAircraft(tail) {
    await this.openProfile();
    await this.click(this.addNewPlane);
    await this.click(this.manufacturerAdd);
    await this.click(this.americanChampion);
    await this.click(this.typeAdd);
    await this.click(this.citabriaCH7A);
    await this.click(this.tailNumberField);
    await this.tailNumberField.setValue(tail);
    await this.click(this.addAircraftBtn);
  }

  async changeIconAndAddAircraft(tail) {
    await this.openProfile();
    await this.click(this.addNewPlane);
    await this.click(this.manufacturerAdd);
    await this.click(this.americanChampion);
    await this.click(this.typeAdd);
    await this.click(this.citabriaCH7A);
    await this.click(this.iconCell5);
    await this.click(this.twinIcon);
    await this.click(this.tailNumberField);
    await this.tailNumberField.setValue(tail);
    await this.click(this.addAircraftBtn);
  }

  async isAircraftVisibleByTail(upperTail) {
    const el = await this.driver.$(`~${upperTail}`);
    return el.isDisplayed();
  }
}
