var compression             = require('compression'),
    express                 = require("express"),
    app                     = express();

app.use(compression(9));

// to not use .ejs ending
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public", { maxAge: 8640000000 }));

//General Routes
app.get("/", function(req, res){
    res.render("index");
});

app.get("/projects", function(req, res){
    res.render("projects");
});

app.get("/contact", function(req, res){
    res.render("contact");
});

app.get("*", function(req, res){
    res.render("404");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("=========================");
    console.log("Server has started!");
    console.log("=========================");
});