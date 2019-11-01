// ====================== function to terminate the game ===============
let terminate_game = ()=>{
    fetch('/saveScore',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({score:gb.score,level:gb.best_level}),
    }).then(res=>{
        if(res.status==200)
            window.location.href="/summaryPage"
    })
    
}