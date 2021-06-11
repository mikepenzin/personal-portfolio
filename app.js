var express                 = require("express"),
    bodyParser              = require("body-parser"),
    compression             = require('compression'),
    nodemailer              = require('nodemailer'),
    app                     = express();

app.use(compression(9));

var smtpTransport = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
          user: process.env.SENDGRID_USERNAME || 'apikey',
          pass: process.env.SENDGRID_PASSWORD || '3JSDbSoXQASSMbfUtmz8sw',
          port: 25
      }
});


// to not use .ejs ending
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public", { maxAge: 8640000000 }));

//tell express to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

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

app.post("/contact", function(req,res){

   var contact = {
       name:req.body.name,
       email:req.body.email,
       message:req.body.message
   };
   var mailOptions = {
            to: 'mike.penzin@gmail.com',
            from: contact.email,
            subject: 'Personal Portfolio',
            text: 'Hello,\n\n' +
              'This is email from ' + contact.name + ' (' + contact.email + ')' + '.\n\n' +
              contact.message
          };
    smtpTransport.sendMail(mailOptions, function(err) {
        console.log("Message sent successfully!");
        res.render("contact");
    });
        
});

app.get("*", function(req, res){
    res.render("404");
});


app.listen(process.env.PORT || 3000, process.env.IP || '127.0.0.1', function(){
    console.log("=========================");
    console.log("Server has started! ");
    console.log("=========================");
});