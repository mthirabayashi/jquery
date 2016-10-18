class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $( 'li' ).on("click", e => {
      const $sq = $(e.currentTarget);
      let pos = $sq.attr("data-pos").split(",");
      pos = [parseInt(pos[0]), parseInt(pos[1])];
      this.game.playMove(pos);
      this.makeMove($sq);
    });
  }

  makeMove($square) {
    // let pos = $sq.attr("data-pos").split(",");
    // pos = [parseInt(pos[0]), parseInt(pos[1])];
    $square.append(`<p>${this.game.currentPlayer}</p>`);
    $square.addClass('player');
    if (this.game.isOver()) {
      alert(`${this.game.currentPlayer} has won!`);
    }
  }

  setupBoard() {

    const $ttt = $("<ul>").addClass("ttt");
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        const $square = $('<li>').addClass("square").attr("data-pos", [i,j]);
        $ttt.append($square);
      }
    }
    this.$el.append($ttt);
  }

}


module.exports = View;
