"use strict";
fetch('./data/products.json')
    .then(function (response) {
    return response.json();
})
    .then(function (data) {
    appendData(data);
})
    .catch(function (error) {
    console.log(error);
});
function appendData(data) {
    var _a;
    var productContainer = document.getElementById("prouctContainer");
    for (var i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.setAttribute("class", "row col-4");
        var form = document.createElement("form");
        form.setAttribute("action", "/details");
        form.setAttribute("method", "POST");
        var input = document.createElement("input");
        input.setAttribute("type", "submit");
        input.setAttribute("name", "ProductDetails");
        input.setAttribute("value", data[i].productName);
        var input2 = document.createElement("input");
        input2.setAttribute("type", "hidden");
        input2.setAttribute("name", "ProductFoto");
        input2.setAttribute("value", data[i].imageName);
        var input3 = document.createElement("input");
        input3.setAttribute("type", "hidden");
        input3.setAttribute("name", "ProductDescription");
        input3.setAttribute("value", data[i].description);
        var input4 = document.createElement("input");
        input4.setAttribute("type", "text");
        input4.setAttribute("name", "ProductSpecialOffer");
        input4.setAttribute("value", data[i].specialOffer);
        var input5 = document.createElement("input");
        input5.setAttribute("type", "text");
        input5.setAttribute("name", "ProductNormalPrice");
        input5.setAttribute("value", data[i].normalPrice);
        var img = document.createElement("img");
        img.setAttribute("src", "/images/" + data[i].imageName);
        input.appendChild(input3);
        input.appendChild(input2);
        form.appendChild(img);
        form.appendChild(input);
        form.appendChild(input4);
        form.appendChild(input5);
        div.appendChild(form);
        (_a = productContainer) === null || _a === void 0 ? void 0 : _a.appendChild(div);
    }
}
