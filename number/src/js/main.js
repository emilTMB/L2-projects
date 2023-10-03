let input = document.querySelector(".field__form__input");
let btn = document.querySelector(".field__form__btn");
let check = document.querySelector(".result__check__out");
let help = document.querySelector(".result__help__out");
let count = document.querySelector(".result__count__out");
let helpBonus = document.querySelector(".result__help-bonus");
let startButton = document.getElementById("startGame");
let minNumInput = document.getElementById("minNum");
let maxNumInput = document.getElementById("maxNum");
let minNumSpan = document.getElementById("minNumSpan");
let maxNumSpan = document.getElementById("maxNumSpan");

minNumInput.value = 1;
maxNumInput.value = 100;

let item = 0;
let randNum = 1 + Math.floor(Math.random() * 100);
let userNum;
let unsuccessfulAttempts = 0;
let hints = ["Это число четное.", "Это число нечетное."];

btn.onclick = function (evt) {
  evt.preventDefault();
  userNum = parseInt(input.value);

  // Проверка на ввод числа в пределах диапазона
  let minNum = parseInt(minNumInput.value);
  let maxNum = parseInt(maxNumInput.value);

  if (isNaN(userNum) || userNum < minNum || userNum > maxNum) {
    alert(`Пожалуйста, введите число в диапазоне от ${minNum} до ${maxNum}.`);
    return;
  }

  console.log(userNum, randNum);

  if (userNum > randNum) {
    check.textContent = "Пока что не угадали";
    help.textContent = "Загаданное число меньше";
    item++;
    count.textContent = item;
  } else if (userNum < randNum) {
    check.textContent = "Пока что не угадали";
    help.textContent = "Загаданное число больше";
    item++;
    count.textContent = item;
  } else {
    check.textContent = "Поздравляю! Вы угадали число";
    help.textContent = "В точку!";
    item++;
    count.textContent = item;
  }

  // Увеличиваем счетчик неудачных попыток и выводим подсказку, если нужно
  unsuccessfulAttempts++;
  if (unsuccessfulAttempts % 3 === 0) {
    if (randNum % 2 === 0) {
      helpBonus.textContent = "Это число четное.";
    } else {
      helpBonus.textContent = "Это число нечетное.";
    }
  }
};

minNumInput.addEventListener("input", function () {
  minNumSpan.textContent = this.value;
});

maxNumInput.addEventListener("input", function () {
  maxNumSpan.textContent = this.value;
});

startButton.onclick = function () {
  let minNum = parseInt(minNumInput.value);
  let maxNum = parseInt(maxNumInput.value);

  // Генерируем новое случайное число в указанном пользователем диапазоне
  randNum = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  item = 0;
  unsuccessfulAttempts = 0;

  // Очищаем поля вывода и бонусную подсказку
  check.textContent = "";
  help.textContent = "";
  helpBonus.textContent = "";
  count.textContent = "";
  input.value = "";
};
