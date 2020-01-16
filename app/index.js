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
;
//Paths
app.use(express.static(__dirname + '/assets'));
app.use("/add-products.js", express.static(path.join(__dirname, "./add-products.js")));
app.use("/data/products.json", express.static(path.join(__dirname, "./data/products.json")));
app.use("/images", express.static(path.join(__dirname, "./assets/images")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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
    req.session || [];
});
app.get("/home", function (req, res) {
    res.redirect('/');
});
app.get("/warenkorb", function (req, res) {
    sendTemplate("master.html", "warenkorb.html", {})
        .then(function (rendered) { return res.send(rendered); });
});
app.get("/checkout", function (req, res) {
    sendTemplate("master.html", "checkout.html", {})
        .then(function (rendered) { return res.send(rendered); });
});
app.get('/add-products.js', function (req, res) {
    res.sendFile("./add-products.js");
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
    var userEmail = req.body.userEmai;
});
app.listen(8080, function () { console.log("listening"); });
