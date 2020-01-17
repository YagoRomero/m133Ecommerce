"use strict";
import express = require("express");
const expressSession = require("express-session")
import {check, validationResult} from "express-validator";
import * as path from "path";
import * as fs from "fs";
import * as bodyParser from "body-parser";
import * as Mustache from "mustache";
import * as data from './data/products.json';


const app = express();

//Paths
app.use(express.static(__dirname + '/assets'));
app.use("/add-products.js", express.static(path.join(__dirname, "./add-products.js")));
app.use("/add-details.js", express.static(path.join(__dirname, "./add-details.js")));
app.use("/data/products.json", express.static(path.join(__dirname, "./data/products.json")));
app.use("/images", express.static(path.join(__dirname, "./assets/images")));
app.use("/views", express.static(path.join(__dirname, "./views")));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Session
app.use(expressSession({
    secret: "super-safe-secret", // used to create session IDs
    resave: false, // do not save already saved values during each request
    saveUninitialized: true // forces an uninitialized session to be stored
}));

/* frontend*/
app.get("/", (req, res,) => {
    sendTemplate("master.html", "home.html", {})
        .then(rendered => res.send(rendered));
    req.session;
    console.log(req.sessionID);
});

app.get("/home", (req, res) => {
   res.redirect('/');
});

app.post("/warenkorb", (req, res) => {
    var productName = req.body.cart;
    var normalerPreis = req.body.normalPrice;
    var specialPreis = req.body.specialOffer;

    if(specialPreis){
        res.send( specialPreis);
    } else if(normalerPreis){
        res.send(normalerPreis);
    }
});


app.get("/checkout", (req,res) => {
    sendTemplate("master.html", "checkout.html", {})
        .then(rendered => res.send(rendered));
});

app.post('/details',(req,res) =>{
    res.send(`
    <head>
    <link rel="stylesheet" href="/css/details-stylesheet.css">
    </head>
    <body>
    <div>
        <form action="/warenkorb" method="POST">
            <input type name="cart" value="${req.body.ProductDetails}" readonly="readonly">
            <img src=/images/${req.body.ProductFoto}>
            <h4>Description: ${req.body.ProductDescription}</h4>
            <h4>Specielle Offerte zum Korb hinzufügen: <input name ="specialOffer" type="submit" value=${req.body.ProductSpecialOffer}></input></h4>
            <h4>Normaler Preis zum Korb hinzufügen: <input name="normalPrice" type="submit" value=${req.body.ProductNormalPrice}></input></h4>      
        </form>
    </div>
    <body>
    `
    )
});

app.get('/add-products.js', (req,res) =>{
    res.sendFile("./add-products.js");
})

app.get('/add-details.js', (req,res) =>{
    res.sendFile("./add-details.js");
})



const sendTemplate = (masterPage: string, contentPage: string, obj: any) => {
    return new Promise((resolve) => {
        fs.readFile(path.join(__dirname, "views", masterPage), "utf8", (err, master) => {
            fs.readFile(path.join(__dirname, "views", contentPage), "utf8", (err, content) => {
                resolve(Mustache.render(master, {}, { pageConent: content }));
            });
        });
    });    
}


//form validierung
app.post("/checkout", [
    check('userFirstName').not().isEmpty(),
    check('userLastName').not().isEmpty(),
    check('email').isEmail()
  ], (req: { body: { userFirstName: any; userLastName: any; userEmai: any; }; }, res: any) => {
    const userFirstName  = req.body.userFirstName
    const userLastName   = req.body.userLastName
    const userEmail = req.body.userEmai
  });

app.listen(8080, () => {console.log("listening");});

