const View = require('./ttt-view');// require appropriate file
const Game = require('../../solution/game');// require appropriate file

$( () => {
  // Your code here
  let game = new Game();
  let tttView = $('.ttt');
  new View(game, tttView);
});
