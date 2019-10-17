let arr =  new Array(5);
for(let i = 0; i < arr.length; i++){
    arr[i] = new Array(5)
    for(let j = 0; j < arr[i].length; j++){
        arr[i][j] = 0;
    }
}
let game_start = false;
let has_spinned = false;

create_tile = (isCorrect)=>{
    let tile = document.createElement("div")
    tile.className="tile"
    if(isCorrect==1){
        tile.classList.add("correct_tile")
    }
    return tile
}

create_puzzle = ()=>{
    
    for(let i = 0; i < 5; i++){
        let x = Math.floor(Math.random()*5)
        let y = Math.floor(Math.random()*5)
        arr[x][y] = 1;
    }
    let table = document.createElement("table")
    for(let i = 0; i<arr.length;i++){
        let tr = document.createElement("tr")
        for(let j = 0; j<arr.length; j++){
            let td = document.createElement("td")
            tr.appendChild(td)
            let tile = create_tile(arr[i][j])
            if(arr[i][j])
                console.log("correct = " + i + ", " + j)
            td.appendChild(tile)
            tile.addEventListener('click',()=>on_click_tile(tile,i,j))
        }
        table.appendChild(tr)
    }
    return table;
}

on_click_tile = (tile,i,j)=>{
    console.log("j = " + j + ", i = ", + i)
    if(game_start){
        if(arr[i][j]==1){
            tile.classList.add("correct_tile")
            tile.innerHTML = "<span>correct</span>"
        }else{
            tile.classList.add("wrong_tile")
            tile.innerHTML = "&#10060;"
        }
    }
}

start_puzzle = (puzzle) => {
    if(!game_start && !has_spinned){
        has_spinned = true;
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
        setTimeout(()=>{game_start = true;console.log("start");},(3000 + 1000 * i_rand))
    }
    
}

let puzzle = document.body.appendChild(create_puzzle());
puzzle.className = "puzzle"
puzzle.addEventListener("click",()=>start_puzzle(puzzle))
