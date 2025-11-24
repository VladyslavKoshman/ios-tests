// screens/ProfileScreen.js
import BaseScreen from './BaseScreen.js';

export default class ProfileScreen extends BaseScreen {
  // Навигация на "Profile"
  get profileTab() {
    return this.driver.$('//XCUIElementTypeStaticText[@name="Profile"]');
  }

  // Кнопка "Add New Plane" в профиле
  get addNewPlane() {
    return this.driver.$('~Add New Plane'); // name("Add New Plane")
  }

  // 🔽 кнопка Delete в алерте при удалении самолёта
  get deleteAlertButton() {
    // из XML: name="Delete"
    return this.driver.$('~Delete');
  }

  // Поля добавления самолёта
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
    return this.driver.$(
      '//XCUIElementTypeCollectionView/XCUIElementTypeCell[2]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther'
    );
  }

  get addAircraftBtn() {
    return this.driver.$('~Add Aircraft');
  }

  // второй кейс (смена иконки)
  get iconCell5() {
    return this.driver.$(
      '//XCUIElementTypeCollectionView/XCUIElementTypeCell[5]/XCUIElementTypeOther[2]/XCUIElementTypeOther/XCUIElementTypeOther'
    );
  }

  get twinIcon() {
    return this.driver.$('~Twin');
  }

  // Кнопка удаления самолёта на экране редактирования (иконка "корзина")
  get deleteTrashButton() {
    // из XML: <XCUIElementTypeButton name="trash" ... />
    return this.driver.$('~trash');
  }

  // 🔽 кнопка OK в алертах (и при удалении, и при дубликате)
  get okButton() {
    return this.driver.$('~OK');
  }

  async openProfile() {
    await this.click(this.profileTab);
  }

  // ==== СКРОЛЛЫ / ПОИСК ЭЛЕМЕНТОВ ====

  // Скролл до "Add New Plane"
  async scrollDownToAddNewPlane(maxSwipes = 5) {
    for (let i = 0; i < maxSwipes; i++) {
      try {
        if (await this.addNewPlane.isDisplayed()) {
          console.log(
            'scrollDownToAddNewPlane: кнопка "Add New Plane" уже видна'
          );
          return;
        }
      } catch (e) {
        // элемент ещё не в DOM / временная ошибка
      }

      console.log(`scrollDownToAddNewPlane: swipe ${i + 1}/${maxSwipes}`);
      await this.driver.execute('mobile: swipe', { direction: 'up' });
      await this.driver.pause(500);
    }

    throw new Error(
      'scrollDownToAddNewPlane: не смогли найти кнопку "Add New Plane" после скролла'
    );
  }

  // Общий скролл по списку самолётов в поисках хвоста
  async scrollToTail(upperTail, maxSwipes = 7) {
    const target = upperTail.toUpperCase();

    for (let i = 0; i < maxSwipes; i++) {
      const elems = await this.driver.$$(`~${target}`);
      if (elems.length > 0) {
        try {
          if (await elems[0].isDisplayed()) {
            console.log(`scrollToTail: нашли ${target} на swipe ${i + 1}`);
            return elems[0];
          }
        } catch (e) {
          // элемент появился/исчез — просто пробуем дальше
        }
      }

      console.log(`scrollToTail: swipe ${i + 1}/${maxSwipes}`);
      await this.driver.execute('mobile: swipe', { direction: 'up' });
      await this.driver.pause(500);
    }

    console.log(`scrollToTail: ${target} не найден после скролла`);
    return null;
  }

  // Поиск кнопки удаления на экране редактирования
  async findDeleteButton() {
    console.log('findDeleteButton: ищем кнопку удаления самолёта');

    const locators = [
      '~trash',
      '//XCUIElementTypeButton[@name="trash"]',
    ];

    for (const locator of locators) {
      try {
        const elements = await this.driver.$$(locator);
        if (elements.length === 0) {
          continue;
        }

        const el = elements[0];
        const displayed = await el.isDisplayed().catch(() => false);
        if (displayed) {
          console.log(
            `findDeleteButton: нашли кнопку по локатору "${locator}"`
          );
          return el;
        }
      } catch (e) {
        // Игнорируем и пробуем дальше
      }
    }

    console.log('findDeleteButton: кнопку удаления не нашли');
    return null;
  }

  // ==== ОПЕРАЦИИ С САМОЛЁТАМИ ====

  // Удаляем самолёт, если он уже есть в списке
  async deleteAircraftIfExists(tail) {
    const upperTail = tail.toUpperCase();
    console.log(`deleteAircraftIfExists: пробуем удалить ${upperTail}`);

    // 1. Открываем профиль
    await this.openProfile();

    // 2. Ищем самолёт по хвосту
    const tailElement = await this.scrollToTail(upperTail);
    if (!tailElement) {
      console.log(
        `deleteAircraftIfExists: самолёт ${upperTail} не найден — нечего удалять`
      );
      return;
    }

    // 3. Открываем экран редактирования самолёта
    await this.click(tailElement);
    await this.driver.pause(1000); // даём экрану загрузиться

    // 4. Жмём на иконку "trash"
    const trash = await this.deleteTrashButton;
    try {
      await trash.waitForDisplayed({ timeout: 5000 });
    } catch (e) {
      console.log(
        'deleteAircraftIfExists: кнопка trash не появилась на экране редактирования'
      );
      return;
    }
    await this.click(trash);

    // 5. Ждём алерт и жмём кнопку "Delete"
    try {
      const deleteBtn = await this.deleteAlertButton;
      await deleteBtn.waitForDisplayed({ timeout: 5000 });
      await this.click(deleteBtn);
      console.log('deleteAircraftIfExists: нажали кнопку "Delete" в алерте');
    } catch (e) {
      console.log(
        'deleteAircraftIfExists: не смогли нажать кнопку "Delete" в алерте'
      );
      return;
    }

    await this.driver.pause(1000);
    console.log(`deleteAircraftIfExists: ${upperTail} удалён (или попытались)`);
  }

  async addAircraft(tail) {
    // Сначала пытаемся удалить самолёт с таким хвостом, если он уже есть
    await this.deleteAircraftIfExists(tail);

    // Снова заходим в профиль и идём на создание
    await this.openProfile();
    await this.scrollDownToAddNewPlane();

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
    // Сначала удаляем, если уже существует
    await this.deleteAircraftIfExists(tail);

    await this.openProfile();
    await this.scrollDownToAddNewPlane();

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

  // Второй кейс: ожидаем ошибку "самолёт уже существует" и жмём OK
  async changeIconAndAddAircraftExpectingDuplicate(tail) {
    await this.openProfile();
    await this.scrollDownToAddNewPlane();

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

    // ждём алерт про дубликат и жмём OK
    console.log(
      `changeIconAndAddAircraftExpectingDuplicate: ожидаем алерт о дубликате для ${tail}`
    );
    const ok = await this.okButton;
    await ok.waitForDisplayed({ timeout: 5000 });
    await this.click(ok);
    await this.driver.pause(500);
  }

  async isAircraftVisibleByTail(upperTail) {
    const target = upperTail.toUpperCase();

    // используем тот же скролл, что и для поиска
    const el = await this.scrollToTail(target, 3);
    if (!el) {
      return false;
    }

    try {
      return await el.isDisplayed();
    } catch (e) {
      return false;
    }
  }
}
