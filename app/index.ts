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
app.use("/getTotalPreis.js", express.static(path.join(__dirname, "./getTotalPreis.js")));
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

app.get("/checkout", (req,res) => {
    sendTemplate("master.html", "checkout.html", {})
        .then(rendered => res.send(rendered));
});



app.post("/warenkorb", (req, res) => {
    if(req.body.specialOffer){
        res.send(`
        <head>
        <link rel="stylesheet" href="/css/warenkorb-stylesheet.css">
        </head>
        <body>
            <div>
                <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Preis pro Product</th>
                        <th>Anzahl Producte</th>
                        <th>Total Preis</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr id="tableSpecialPreis">
                        <td><input type="text" value="${req.body.cart}" readonly="readonly"></td>
                        <td><input id="specialPrice" type="number" value="${req.body.specialOffer}" readonly="readonly"></td>
                        <td><input id="countSpecial" type="number" min="0" max="10000" value="0"></td>
                        <td id="resultat"></td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div id="controls">
            <button onClick="TotalPreis()">Total Preis berechnen</button>
            <button onClick="Delete()">Löschen</button>
            <a href="/checkout">Link to Checkout</a>
            </div>
            <script>
                    function TotalPreis(){
                        var specialPrice = document.getElementById("specialPrice").value;
                        var countSpecial = document.getElementById("countSpecial").value;
                        var specialPriceFloat = parseFloat(specialPrice);
                        var totalprice = specialPriceFloat * countSpecial;
                        var resultat = document.getElementById("resultat").innerHTML = totalprice;
                    }
                </script>
                <script>
                function Delete(){
                    var resultat = document.getElementById("resultat").innerHTML = " ";
                    var countSpecial = document.getElementById("countSpecial").value = 0;
                }
                </script>
        <body>
        `);

    } else if(req.body.normalPrice){
        res.send(`
            <head>
                <link rel="stylesheet" href="/css/warenkorb-stylesheet.css">
            </head>
            <body>
                <div>
                    <table>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Preis pro Product</th>
                            <th>Anzahl Producte</th>
                            <th>Total Preis</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr id="tableNormalPreis">
                        <td><input id="description" type="text" value="${req.body.cart}" readonly="readonly"></td>
                        <td><input id="normalprice" type="number" value="${req.body.normalPrice}" readonly="readonly"></td>
                        <td><input id="countNormal" type="number" min="0" max="10000" value="0"></td>
                        <td id="resultat"></td>
                        </tr>
                    </tbody>
                    </table>
                    <div id="controls">
                    <button onClick="TotalPreis()">Total Preis berechnen</button>
                    <button onClick="Delete()">Löschen</button>
                    <a href="/checkout">Link to Checkout</a>
                    </div>
                    <script>
                            function TotalPreis(){
                                var normalPrice = document.getElementById("normalprice").value;
                                var countNormal = document.getElementById("countNormal").value;
                                var normalPriceFloat = parseFloat(normalPrice);
                                var totalprice = normalPriceFloat * countNormal;
                                var resultat = document.getElementById("resultat").innerHTML = totalprice;
                            }
                        </script>
                        <script>
                        function Delete(){
                            var resultat = document.getElementById("resultat").innerHTML = " ";
                            var countSpecial = document.getElementById("countNormal").value = 0;
                        }
               </script>
            <body>
        `);
    }
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
            <h4>Specielle Offerte zum Korb hinzufügen: <input name ="specialOffer" type="submit" value=${req.body.ProductSpecialOffer}>
            <input type="hidden" name="clicks" onClick="onClick()">
            </input></h4>
            <h4>Normaler Preis zum Korb hinzufügen: <input name="normalPrice" type="submit" value=${req.body.ProductNormalPrice}></input></h4>      
        </form>
    </div>
    <body>
    `
    )
});

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
  ], (req: { body: { userFirstName: any; userLastName: any; userEmail: any; }; }, res: any) => {
    const userFirstName  = req.body.userFirstName
    const userLastName   = req.body.userLastName
    const userEmail = req.body.userEmail
  });

app.listen(8080, () => {console.log("listening");});

