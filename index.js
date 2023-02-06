const express = require('express');
const port = 8000;
const app = express();

app.listen(port, (err)=>{
    if(err){
        console.log(`Server unable to start : ${err}`);
        return;
    }
    console.log(`All Set ! Server will be serving on port ${port}`);
})