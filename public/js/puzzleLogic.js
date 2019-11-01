create_puzzle_game = (difficulty) =>{
    gb.correct_sound = new sound("../sfx/correct.mp3")
    gb.wrong_sound = new sound("../sfx/wrong.mp3")
    if(difficulty < 1){
        difficulty = 1
    }
    if(gb.best_level < difficulty){
        gb.best_level = difficulty
    }
    gb.current_difficulty = difficulty
    gb.correct_tile_number = 0
    gb.current_tile_correct = 0
    gb.has_spinned = false;
    if(gb.dimensionX < maxDimension || gb.dimensionY < maxDimension){
        gb.dimensionX = start_dimension + Math.floor(difficulty / 2)
        gb.dimensionY = gb.dimensionX - (difficulty % 2 == 0 ? 1 : 0)
    }else{
        gb.tile_number = original_tile_number + difficulty - 7
    }
    gb.click_count = gb.tile_number
    gb.arr = new Array(gb.dimensionX)
    gb.tile_arr = new Array(gb.dimensionX)
    for(let i = 0; i < gb.arr.length; i++){
        gb.arr[i] = new Array(gb.dimensionY)
        for(let j = 0; j < gb.arr[i].length; j++){
            gb.arr[i][j] = 0;
        }
    }
    let puzzle = document.querySelector("#game_body").appendChild(create_puzzle_grid());
    puzzle.className = "puzzle"
    puzzle.addEventListener("click",()=>start_puzzle(puzzle))
    document.querySelector("#levelTxt").innerHTML = "LEVEL " + gb.difficulty 
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
    while(ctCount < gb.tile_number){
        let x = Math.floor(Math.random()*gb.dimensionX)
        let y = Math.floor(Math.random()*gb.dimensionY)
        if(gb.arr[x][y]==0){
            gb.arr[x][y] = 1
            ctCount++
        }
    }
    gb.correct_tile_number = ctCount
    let table = document.createElement("table")
    for(let i = 0; i<gb.dimensionX;i++){
        let tr = document.createElement("tr")
        gb.tile_arr[i] = []
        for(let j = 0; j<gb.dimensionY; j++){
            let td = document.createElement("td")
            tr.appendChild(td)
            let tile = create_tile(gb.arr[i][j])
            td.appendChild(tile)
            tile.addEventListener('click',()=>on_click_tile(tile,i,j))
            gb.tile_arr[i].push(tile)
        }
        table.appendChild(tr)
    }
    return table;
}

on_click_tile = (tile,i,j)=>{
    if(gb.game_start){
        if(gb.click_count > 0){
            if(gb.arr[i][j] == 1 ){
                gb.arr[i][j] = 2
                tile.classList.add("correct_tile")
                gb.score++
                gb.current_tile_correct++
                gb.correct_sound.stop()
                gb.correct_sound.play()
                gb.click_count--;
            }else if(gb.arr[i][j]==0){
                gb.arr[i][j] = 2
                tile.classList.add("wrong_tile")
                tile.innerHTML = "&#10060;"
                gb.score--
                gb.click_count--;
                gb.wrong_sound.stop()
                gb.wrong_sound.play()
            }
            if(gb.score < 0){
                show_result()
                setTimeout(() => {
                    terminate_game()
                }, 1500); 
                
            }
        }
        if(gb.click_count==0)
        {
            show_result()
            setTimeout(() => {
                reset_puzzle(gb.current_tile_correct==gb.tile_number? gb.current_difficulty+1: gb.current_difficulty-1)
            }, 1500); 
            gb.game_start = false
        }
        document.querySelector("#scoreTxt").innerHTML = "SCORE: " + gb.score
        
    }
}

show_result = () =>{
    for(let i = 0; i < gb.arr.length; i++){
        for(let j = 0; j < gb.arr[i].length; j++){
            if(gb.arr[i][j]==1){
                gb.tile_arr[i][j].classList.add("answer_tile")
            }
        }
    }
}

start_puzzle = (puzzle) => {
    if(!gb.game_start && !gb.has_spinned){
        gb.has_spinned = true;
        let spin_array = ["start_rotate1","start_rotate2","start_rotate3"]
        let rotate_array = ["rotate_tile1","rotate_tile2","rotate_tile3"]
        let i_rand = Math.floor(Math.random()*3)
        let random_spin = spin_array[i_rand]
        setTimeout(()=>{
            puzzle.className=`puzzle ${random_spin}`;
        },1000)
        let tiles = document.getElementsByClassName("tile")
        for(let i = 0; i < tiles.length; i++){
            tiles[i].classList.remove("correct_tile")
            tiles[i].classList.add(rotate_array[i_rand])
        }
        setTimeout(()=>{gb.game_start = true;},(3000 + 1000 * i_rand))
    }
}



