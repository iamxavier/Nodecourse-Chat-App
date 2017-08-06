const path = require('path')
const publichPath = path.join(__dirname, "../public")
const express = require('express')
const port = process.env.PORT || 3000;

// console.log(__dirname + "/../public");
// console.log(publichPath)

var app = express();
app.use(express.static(publichPath));

app.listen(port, ()=>{
    console.log(`App listening on port ${port}`)
})