const HanoiGame = require("./game");
const HanoiView = require("./hanoi-view");

console.log('here');
$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  new HanoiView(game, rootEl);
});
