'use strict';

// Значания для создания массива данных случайных магов
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

// Функция нахождения случайного числа в массиве
var getRandom = function (arr) {
  var rand = Math.random() * arr.length;
  return Math.floor(rand);
};

// Функция генерирующая случаных похожих магов
var createMockDataWizards = function () {
  var NUMBER_SIMILAR = 4; // Количество сгенерированных объектов
  var arr = [];
  for (var i = 0; i < NUMBER_SIMILAR; i++) {
    var wizard = {
      name: WIZARD_NAMES[getRandom(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandom(WIZARD_SURNAMES)],
      coatColor: COAT_COLOR[getRandom(COAT_COLOR)],
      eyesColor: EYES_COLOR[getRandom(EYES_COLOR)]
    };
    arr.push(wizard);
  }
  return arr;
};

// Функция отрисовки волшебника по данным в шаблон #similar-wizard-template
var renderWizard = function (wizard) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // Имя персонажа name = текст в блок .setup-similar-label
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // Цвет мантии coatColor = цвет заливки fill в стилях элемента .wizard-coat
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // Цвет глаз eyesColor = цвет заливки fill в стилях элемента .wizard-eyes
  return wizardElement;
};

// Алгоритм:
// 1. Создание mock данных
var wizards = createMockDataWizards();

// 2. Cоздание DOM-элементов в отдельном фрагменте
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}

// 3. Вставка фрагмента в блок .setup-similar-list
var similarListElement = document.querySelector('.setup-similar-list');
similarListElement.appendChild(fragment);

// 4. Отображение блоков с классом 'setup', 'setup-similar', убирает класс 'hidden'.
document.querySelector('.setup-similar').classList.remove('hidden');


// --- З А Д А Н И Е     О Б Р А Б О Т К А      С О Б Ы Т И Й ------


// Обозначение перемееных открытия закрытия окна setup
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
// Обозначение перемееных для смены цветов
var setupPlayer = setup.querySelector('.setup-player');
var setupWizardCoat = setupPlayer.querySelector('.setup-wizard .wizard-coat');
var inputCoatColor = setupPlayer.querySelector('input[name=coat-color]');
var setupWizardEyes = setupPlayer.querySelector('.setup-wizard .wizard-eyes');
var inputEyesColor = setupPlayer.querySelector('input[name=eyes-color]');
var setupWizardfireball = setupPlayer.querySelector('.setup-fireball-wrap');
var inputFireballColor = setupPlayer.querySelector('input[name=fireball-color]');
// Обозначение поля ввода имени, если активно, то окно закрываться настройки не должны
var inputUserName = setup.querySelector('input[name=username]');


// Счетчик для смены значений по порядку из массивов
var makeCounter = function (arr) {
  var count = 0;
  return function () {
    if (count > (arr.length - 2)) {
      count = 0;
      return count;
    }
    return ++count;
  };
};

// Переменные-счетчики
var counterCoatColor = makeCounter(COAT_COLOR);
var counterEyesColor = makeCounter(EYES_COLOR);
var counterFireballColor = makeCounter(FIREBALL_COLOR);

// Функция, которая меняет цвет плаща
var changeCoatColor = function () {
  var newCoatColor = COAT_COLOR[counterCoatColor()];
  inputCoatColor.value = newCoatColor;
  setupWizardCoat.style.fill = newCoatColor;
};

// Функция, которая меняет цвет глаз
var changeEyesColor = function () {
  var newEyesColor = EYES_COLOR[counterEyesColor()];
  inputEyesColor.value = newEyesColor;
  setupWizardEyes.style.fill = newEyesColor;
};

// Функция, которая меняет цвет фаербола
var changeFireballColor = function () {
  var newFireballColor = FIREBALL_COLOR[counterFireballColor()];
  inputFireballColor.value = newFireballColor;
  setupWizardfireball.style.cssText = 'background: ' + newFireballColor;
};

// Функция, которая при нажатии Esc - закрывает setup
var onSetupEscPress = function (evt) {
  if (evt.key === ESC_KEY) {
    closeSetup();
  }
};

// Функция, которая при нажатии Enter на кпопке закрытия - закрывает setup
var onSetupCloseEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    closeSetup();
  }
};

// Функция, которая ОТКРЫВАЕТ окно настройки персонажа .setup. При отрытом окне слушаем включаются обработчки:
// 1. события нажатия кнопки Esc
// 2. события клика на клик по мантии волшебника
// 3. события клика на клик по глазам волшебника
// 4. события клика на клик по фаерболу
// 5. события клика на кнопку закрытия
// 6. события Enter на кнопку закрытия
var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
  setupWizardCoat.addEventListener('click', changeCoatColor);
  setupWizardEyes.addEventListener('click', changeEyesColor);
  setupWizardfireball.addEventListener('click', changeFireballColor);
  setupClose.addEventListener('click', closeSetup);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);
};

// Функция, которая ЗАКРЫВАЕТ окно настройки персонажа .setup. Функция, в том числе, отключает обработчики настроек
var closeSetup = function () {
  if (inputUserName === document.activeElement) { // Проверка, чтобы актиным не было поле ввода имени
    return;
  }
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
  setupWizardCoat.removeEventListener('click', changeCoatColor);
  setupWizardEyes.removeEventListener('click', changeEyesColor);
  setupWizardfireball.removeEventListener('click', changeFireballColor);
  setupClose.removeEventListener('click', closeSetup);
  setupClose.removeEventListener('keydown', onSetupCloseEnterPress);
};

// Добавялем обработчики на открытие setup
setupOpen.addEventListener('click', function () {
  openSetup();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openSetup();
  }
});


