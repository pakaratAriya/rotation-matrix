let terminate_game = async ()=>{
    fetch('/saveScore',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({score:score})
    })
}