'use strict';

var CLOUD_WIDTH = 420; // Размеры облака
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100; // Координты облака
var CLOUD_Y = 10;
var SHADOW_GAP = 10; // Смещение тени по одинаковое по X и Y
var GIST_HEIGHT = 150; // Высота гистограммы
var GIST_LEFT_GAP = 50; // Позиционирование гистограммы внутри облака
var GIST_TOP_GAP = 85;
var BAR_GAP = 50; // Отступ между барами внутри гистограммы
var BAR_WIDTH = 40; // Ширина бара гистограммы
var CLOUD_COLOR = 'rgba(256, 256, 256, 1.0)'; // Цвет облака
var SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)'; // Цвет тени
var YOU_COLOR = 'rgba(255, 0, 0, 1)'; // Цвет бара 'Вы' - красный
var FONT_SIZE = 16; // Размер шрифта

var lineHeight = 1.3 * FONT_SIZE; // Расчет высоты строки
var fontStyle = FONT_SIZE + 'px PT Mono';


// Находит самое большое значение
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

// Находит случайное число в диапазоне
var getRandom = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

// Выбор цвета 'Вы' - красный, остальные синие. Синий случайной насыщенности цвета
var getPlayerColor = function (name) {
  var color = YOU_COLOR;
  if (name !== 'Вы') {
    // Синий это hsl(240, 100%, 50%). Случайная saturate (насыщенность) - 2 параметр цвета hsl. Насыщенность возьму от 5% до 100%
    var randPlayerColor = 'hsl(240, ' + getRandom(5, 100) + '%, 50%)';
    color = randPlayerColor;
  }
  return color;
};

window.renderStatistics = function (ctx, names, times) {
  // Функция отрисовки облака: сначала тень, потом облако
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);

  // Определение начальных координат гистограммы внутри облака
  var gistX = CLOUD_X + GIST_LEFT_GAP;
  var gistY = CLOUD_Y + GIST_HEIGHT + GIST_TOP_GAP;

  // Отрисовка сообщения о Победе. Позиционирование сверху над гистограммой.
  ctx.fillStyle = '#000';
  ctx.font = fontStyle;
  ctx.fillText('Ура вы победили!', gistX, gistY - GIST_HEIGHT - (3 * lineHeight));
  ctx.fillText('Список результатов: ', gistX, gistY - GIST_HEIGHT - (2 * lineHeight));

  // Определение самого большого времени - это будет бар высотой 150. Остальные должды быть меньше него пропорционально
  var maxTime = getMaxElement(times);

  // Отрисовка гистограммы
  for (var i = 0; i < names.length; i++) {
    // Рачсет высоты бара пропорционально самого большой, который равен высоте гистограммы
    var barHeigth = times[i] / maxTime * GIST_HEIGHT;
    // Отрисовка текста
    ctx.fillStyle = '#000';
    ctx.font = fontStyle;
    ctx.fillText(names[i], gistX + i * (BAR_WIDTH + BAR_GAP), gistY + lineHeight);
    ctx.fillText(Math.ceil(times[i]), gistX + i * (BAR_WIDTH + BAR_GAP), gistY - barHeigth - FONT_SIZE);
    // Отрисовка бара
    ctx.fillStyle = getPlayerColor(names[i]);
    ctx.fillRect(gistX + i * (BAR_WIDTH + BAR_GAP), gistY - barHeigth, BAR_WIDTH, barHeigth);
  }
};
