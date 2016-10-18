/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	console.log('here');
	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);