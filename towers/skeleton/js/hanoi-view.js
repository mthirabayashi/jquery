class HanoiView {
  constructor(game, $el){
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.render();
    this.clickTower();
    this.firstClick = null;
  }

  setupTowers() {
    const $pile1 = $("<ul>").addClass("pile1").attr("pile-num", 0);
    const $pile2 = $("<ul>").addClass("pile2").attr("pile-num", 1);
    const $pile3 = $("<ul>").addClass("pile3").attr("pile-num", 2);
    let $numDisks = this.game.towers[0].length;
    for (let i=0; i<$numDisks; i++){
      let $disk = $("<li>").addClass("disk").attr("data-pos", [0,i]).css("background-color", this.randomColorString());
      $pile1.append($disk);
    }
    this.$el.append($pile1).append($pile2).append($pile3);
  }

  render(){
    for (let i=1; i<=3; i++){
      const $pile = $(`.pile${i}`);
      $pile.children().remove();
      for (let j=this.game.towers[i-1].length-1; j>=0; j--){
        let $disk = $("<li>").addClass(`disk${this.game.towers[i-1][j]}`).attr("data-pos", [i-1,j]).css("background-color", this.randomColorString());
        $pile.append($disk);
      }
      this.$el.append($pile);
    }
  }

  clickTower(){
    $('ul').on("click", e => {
      if (this.firstClick === null){
        this.firstClick = $(e.currentTarget);
        this.firstClick.toggleClass("clicked");
      }
      else {
        let pos1 = this.firstClick.attr("pile-num");
        let startPos = parseInt(pos1);
        this.firstClick.toggleClass("clicked");
        let pos2 = $(e.currentTarget).attr("pile-num");
        let endPos = parseInt(pos2);
        if (this.game.move(startPos, endPos)) {
          this.render();
          if (this.game.isWon()){
            alert("You won!");
          }
        } else {
          alert("Invalid move.");
        }
        this.firstClick = null;
      }

    })
  }

  randomColorString(){
    return '#' + Math.random().toString(16).substr(-6);
  }
}




module.exports = HanoiView;
