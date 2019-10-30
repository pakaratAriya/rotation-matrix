const start_dimension = 5;
const original_tile_number = 5;
const maxDimension = 8

let dimensionX = 5
let dimensionY = 5
let arr =  new Array(dimensionX);
let tile_arr = new Array(dimensionX);
let game_start = false;
let has_spinned = false;
let tile_number = 5;
let current_difficulty = 0;
let correct_tile_number = 0
let current_tile_correct = 0

create_puzzle_game = (difficulty) =>{
    if(difficulty < 1){
        difficulty = 1
    }
    console.log("difficulty = " + difficulty)
    current_difficulty = difficulty
    correct_tile_number = 0
    current_tile_correct = 0
    has_spinned = false;
    if(dimensionX < maxDimension || dimensionY < maxDimension){
        dimensionX = start_dimension + Math.floor(difficulty / 2)
        dimensionY = dimensionX - (difficulty % 2 == 0 ? 1 : 0)
    }else{
        tile_number = original_tile_number + difficulty - 7
    }
    
    arr = new Array(dimensionX)
    for(let i = 0; i < arr.length; i++){
        arr[i] = new Array(dimensionY)
        for(let j = 0; j < arr[i].length; j++){
            arr[i][j] = 0;
        }
    }
    let puzzle = document.querySelector("#game_body").appendChild(create_puzzle_grid());
    puzzle.className = "puzzle"
    puzzle.addEventListener("click",()=>start_puzzle(puzzle))
}

reset_puzzle = (difficulty)=>{
    document.querySelector("#game_body").remove()
    let puzzle = document.createElement("div")
    document.body.append(puzzle)
    puzzle.id = "game_body"
    create_puzzle_game(difficulty)
}

create_tile = (isCorrect)=>{
    let tile = document.createElement("div")
    tile.className="tile"
    if(isCorrect==1){
        tile.classList.add("correct_tile")
    }
    return tile
}

create_puzzle_grid = ()=>{
    let ctCount = 0
    while(ctCount < tile_number){
        let x = Math.floor(Math.random()*dimensionX)
        let y = Math.floor(Math.random()*dimensionY)
        if(arr[x][y]==0){
            arr[x][y] = 1
            ctCount++
        }
    }
    console.log("ctCount = " + ctCount)
    correct_tile_number = ctCount
    let table = document.createElement("table")
    for(let i = 0; i<dimensionX;i++){
        let tr = document.createElement("tr")
        for(let j = 0; j<dimensionY; j++){
            let td = document.createElement("td")
            tr.appendChild(td)
            let tile = create_tile(arr[i][j])
            // if(arr[i][j])
            //     console.log("correct = " + i + ", " + j)
            td.appendChild(tile)
            tile.addEventListener('click',()=>on_click_tile(tile,i,j))
        }
        table.appendChild(tr)
    }
    return table;
}

on_click_tile = (tile,i,j)=>{
    //console.log("j = " + j + ", i = ", + i)
    if(game_start){
        if(arr[i][j] == 1 ){
            arr[i][j] = 2
            tile.classList.add("correct_tile")
            score++
            current_tile_correct++
            if(current_tile_correct==correct_tile_number){
                setTimeout(() => {
                    reset_puzzle(current_difficulty+1)
                }, 1500); 
                game_start = false
            }
        }else if(arr[i][j]==0){
            tile.classList.add("wrong_tile")
            tile.innerHTML = "&#10060;"
            score--
            setTimeout(() => {
                reset_puzzle(current_difficulty-1)
            }, 1500); 
            game_start = false
        }
        document.querySelector("#scoreTxt").innerHTML = "SCORE: " + score
    }
}

show_result = () =>{
    for(let i = 0; i < arr.length; i++){
        for(let j = 0; j < arr[i].length; j++){
            if(tile[i][j]==1){
                
            }
        }
    }
}

start_puzzle = (puzzle) => {
    if(!game_start && !has_spinned){
        has_spinned = true;
        let spin_array = ["start_rotate1","start_rotate2","start_rotate3"]
        let rotate_array = ["rotate_tile1","rotate_tile2","rotate_tile3"]
        let i_rand = Math.floor(Math.random()*3)
        //let i_rand = 1
        let random_spin = spin_array[i_rand]
        setTimeout(()=>{
            puzzle.className=`puzzle ${random_spin}`;
        },1000)
        let tiles = document.getElementsByClassName("tile")
        for(let i = 0; i < tiles.length; i++){
            tiles[i].classList.remove("correct_tile")
            tiles[i].classList.add(rotate_array[i_rand])
        }
        setTimeout(()=>{game_start = true;console.log("start");},(3000 + 1000 * i_rand))
    }
    
}


