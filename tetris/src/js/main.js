import Game from "./game.js";
import View from "./view.js";
import Controller from "./controller.js";

const root = document.querySelector('#root')

const game = new Game();
const view = new View(root, 480, 640, 20, 10);
const controller = new Controller(game, view);

// window - глобальный объект. И поскольку мы используем модули - константа game не попадает в глобальное пространство имен
// в связи с этим мы добавляем объект game в глобальный объект window в ручную
window.game = game;
window.view = view;
window.controller = controller;