'use strict';

// Значания для создания массива данных случайных магов
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

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
      coatColor: COAT_COLOR[[getRandom(COAT_COLOR)]],
      eyesColor: EYES_COLOR[[getRandom(EYES_COLOR)]]
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
document.querySelector('.setup').classList.remove('hidden');
document.querySelector('.setup-similar').classList.remove('hidden');
