const start_dimension= 5
const original_tile_number=5
const maxDimension = 8

let gb = {
    correct_sound:null,
    wrong_sound: null,
    dimensionX:5,
    dimensionY:5,
    arr: new Array(5),
    tile_arr: new Array(5),
    game_start: false,
    has_spinned: false,
    tile_number: 5,
    current_difficulty: 0,
    correct_tile_number: 0,
    current_tile_correct: 0,
    click_count: 0,
    best_level: 1,
    level: 1,
    score: 0
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }

create_puzzle_game(gb.level)

