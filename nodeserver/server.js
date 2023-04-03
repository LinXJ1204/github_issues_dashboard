var express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const { response } = require('express');
const fetch = (...args) =>
    import('node-fetch').then(({default: fetch}) => fetch(...args));


const client_id = "ff036409fb179ec54d04";
const client_secret = "";

var app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/gettoken', async function(req, res){
    console.log('connect');
    const param = "?client_id="+client_id+"&client_secret="+client_secret+"&code="+req.query.code;
    console.log(req.query.code);
    await fetch('https://github.com/login/oauth/access_token'+param, {
        method: "POST",
        headers: {
            "Accept": "application/json"},
        
        }
        ).then((response)=>{
            console.log(response);
            return response.json();
        }).then((data)=>{
            res.json(data);
        })
})

app.listen(4000, ()=>{console.log("server start")})