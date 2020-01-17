"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var expressSession = require("express-session");
var express_validator_1 = require("express-validator");
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var bodyParser = __importStar(require("body-parser"));
var Mustache = __importStar(require("mustache"));
var app = express();
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
    secret: "super-safe-secret",
    resave: false,
    saveUninitialized: true // forces an uninitialized session to be stored
}));
/* frontend*/
app.get("/", function (req, res) {
    sendTemplate("master.html", "home.html", {})
        .then(function (rendered) { return res.send(rendered); });
    req.session;
    console.log(req.sessionID);
});
app.get("/home", function (req, res) {
    res.redirect('/');
});
app.get("/checkout", function (req, res) {
    sendTemplate("master.html", "checkout.html", {})
        .then(function (rendered) { return res.send(rendered); });
});
app.post("/warenkorb", function (req, res) {
    if (req.body.specialOffer) {
        res.send("\n        <head>\n        <link rel=\"stylesheet\" href=\"/css/warenkorb-stylesheet.css\">\n        </head>\n        <body>\n            <div>\n                <table>\n                <thead>\n                    <tr>\n                        <th>Product Name</th>\n                        <th>Preis pro Product</th>\n                        <th>Anzahl Producte</th>\n                        <th>Total Preis</th>\n                    </tr>\n                    </thead>\n                    <tbody>\n                    <tr id=\"tableSpecialPreis\">\n                        <td><input type=\"text\" value=\"" + req.body.cart + "\" readonly=\"readonly\"></td>\n                        <td><input id=\"specialPrice\" type=\"number\" value=\"" + req.body.specialOffer + "\" readonly=\"readonly\"></td>\n                        <td><input id=\"countSpecial\" type=\"number\" min=\"0\" max=\"10000\" value=\"0\"></td>\n                        <td id=\"resultat\"></td>\n                    </tr>\n                    </tbody>\n                </table>\n            </div>\n            <div id=\"controls\">\n            <button onClick=\"TotalPreis()\">Total Preis berechnen</button>\n            <button onClick=\"Delete()\">L\u00F6schen</button>\n            <a href=\"/checkout\">Link to Checkout</a>\n            </div>\n            <script>\n                    function TotalPreis(){\n                        var specialPrice = document.getElementById(\"specialPrice\").value;\n                        var countSpecial = document.getElementById(\"countSpecial\").value;\n                        var specialPriceFloat = parseFloat(specialPrice);\n                        var totalprice = specialPriceFloat * countSpecial;\n                        var resultat = document.getElementById(\"resultat\").innerHTML = totalprice;\n                    }\n                </script>\n                <script>\n                function Delete(){\n                    var resultat = document.getElementById(\"resultat\").innerHTML = \" \";\n                    var countSpecial = document.getElementById(\"countSpecial\").value = 0;\n                }\n                </script>\n        <body>\n        ");
    }
    else if (req.body.normalPrice) {
        res.send("\n            <head>\n                <link rel=\"stylesheet\" href=\"/css/warenkorb-stylesheet.css\">\n            </head>\n            <body>\n                <div>\n                    <table>\n                    <thead>\n                        <tr>\n                            <th>Product Name</th>\n                            <th>Preis pro Product</th>\n                            <th>Anzahl Producte</th>\n                            <th>Total Preis</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr id=\"tableNormalPreis\">\n                        <td><input id=\"description\" type=\"text\" value=\"" + req.body.cart + "\" readonly=\"readonly\"></td>\n                        <td><input id=\"normalprice\" type=\"number\" value=\"" + req.body.normalPrice + "\" readonly=\"readonly\"></td>\n                        <td><input id=\"countNormal\" type=\"number\" min=\"0\" max=\"10000\" value=\"0\"></td>\n                        <td id=\"resultat\"></td>\n                        </tr>\n                    </tbody>\n                    </table>\n                    <div id=\"controls\">\n                    <button onClick=\"TotalPreis()\">Total Preis berechnen</button>\n                    <button onClick=\"Delete()\">L\u00F6schen</button>\n                    <a href=\"/checkout\">Link to Checkout</a>\n                    </div>\n                    <script>\n                            function TotalPreis(){\n                                var normalPrice = document.getElementById(\"normalprice\").value;\n                                var countNormal = document.getElementById(\"countNormal\").value;\n                                var normalPriceFloat = parseFloat(normalPrice);\n                                var totalprice = normalPriceFloat * countNormal;\n                                var resultat = document.getElementById(\"resultat\").innerHTML = totalprice;\n                            }\n                        </script>\n                        <script>\n                        function Delete(){\n                            var resultat = document.getElementById(\"resultat\").innerHTML = \" \";\n                            var countSpecial = document.getElementById(\"countNormal\").value = 0;\n                        }\n                        </script>\n            <body>\n        ");
    }
});
app.post('/details', function (req, res) {
    res.send("\n    <head>\n    <link rel=\"stylesheet\" href=\"/css/details-stylesheet.css\">\n    </head>\n    <body>\n    <div>\n        <form action=\"/warenkorb\" method=\"POST\">\n            <input type name=\"cart\" value=\"" + req.body.ProductDetails + "\" readonly=\"readonly\">\n            <img src=/images/" + req.body.ProductFoto + ">\n            <h4>Description: " + req.body.ProductDescription + "</h4>\n            <h4>Specielle Offerte zum Korb hinzuf\u00FCgen: <input name =\"specialOffer\" type=\"submit\" value=" + req.body.ProductSpecialOffer + ">\n            <input type=\"hidden\" name=\"clicks\" onClick=\"onClick()\">\n            </input></h4>\n            <h4>Normaler Preis zum Korb hinzuf\u00FCgen: <input name=\"normalPrice\" type=\"submit\" value=" + req.body.ProductNormalPrice + "></input></h4>      \n        </form>\n    </div>\n    <body>\n    ");
});
var sendTemplate = function (masterPage, contentPage, obj) {
    return new Promise(function (resolve) {
        fs.readFile(path.join(__dirname, "views", masterPage), "utf8", function (err, master) {
            fs.readFile(path.join(__dirname, "views", contentPage), "utf8", function (err, content) {
                resolve(Mustache.render(master, {}, { pageConent: content }));
            });
        });
    });
};
//form validierung
app.post("/checkout", [
    express_validator_1.check('userFirstName').not().isEmpty(),
    express_validator_1.check('userLastName').not().isEmpty(),
    express_validator_1.check('email').isEmail()
], function (req, res) {
    var userFirstName = req.body.userFirstName;
    var userLastName = req.body.userLastName;
    var userEmail = req.body.userEmail;
});
app.listen(8080, function () { console.log("listening"); });
