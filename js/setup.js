'use strict';

// Находит в разметке блок с классом 'setup', и убрает у него у него класс 'hidden'.
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Значания для создания массива данных случайных магов
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLOR = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];

// Находит случайное число в массиве
var getRandom = function (arr) {
  var rand = Math.random() * arr.length;
  return Math.floor(rand);
};

// Функция генерирующая случаных похожих магов
var numberSimilar = 4; // Количество сгенерированных объектов
var wizards = []; // Массив для mock данных
var createMockDataWizards = function (amountData) {
  for (var i = 0; i < amountData; i++) {
    var wizard = {
      name: WIZARD_NAMES[getRandom(WIZARD_NAMES)] + ' ' + WIZARD_SURNAMES[getRandom(WIZARD_SURNAMES)],
      coatColor: COAT_COLOR[[getRandom(COAT_COLOR)]],
      eyesColor: EYES_COLOR[[getRandom(EYES_COLOR)]]
    };
    wizards.push(wizard);
  }
  return wizards;
};
createMockDataWizards(numberSimilar);

// Функция отрисовки волшебника по данным в шаблон #similar-wizard-template
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
  .content
  .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // Имя персонажа name = текст в блок .setup-similar-label
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // Цвет мантии coatColor = цвет заливки fill в стилях элемента .wizard-coat
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor; // Цвет глаз eyesColor = цвет заливки fill в стилях элемента .wizard-eyes
  return wizardElement;
};

// Создание DOM-элементов в отдельном фрагменте. Вставка фрагмента в блок .setup-similar-list
var fragment = document.createDocumentFragment();
for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

// Показ блока .setup-similar, удалив у него CSS-класс hidden
userDialog.querySelector('.setup-similar').classList.remove('hidden');
