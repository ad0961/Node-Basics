const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
    const num = _.random(2,34);
    console.log(num);

    res.setHeader('Content-Type', "text/html");
    let path = "./views/";

    const fun = _.once(() => {
        console.log("executed once");
    })

    fun();
    fun();

    switch(req.url){
        case "/" :
            path+="index.html";
            res.statusCode=200;
            break;
        case "/about" :
            path+="About.html";
            res.statusCode=200;
            break;
        case "/about-us" :
            res.statusCode=301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path+="404.html";
            res.statusCode=404;
            break;
    }

    if(fs.existsSync(path)){
        fs.readFile(path, (err, data) => {
            if(err){
                console.log(err);
                res.end();
            }
            else{
                // res.write(data);
                res.end(data);
            }
        })
    }
});

server.listen(3000,'localhost', () => {
    console.log("started listening");
})