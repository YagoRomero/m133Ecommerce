"use strict";
/*fetch('./data/products.json')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        appendDetails(data);
    })
    .catch(function(error){
        console.log(error)
    });

function appendDetails (data:any){
    var detailsContainer = document.getElementById("detailsPage");
        
    for(var i = 0; i < data.length; i++){
           
            var div = document.createElement("div");
            div.setAttribute("class","row col")

            var form = document.createElement("form");
            form.setAttribute("action","/details");
            form.setAttribute("method","POST");

            var input = document.createElement("input");
            input.setAttribute("type","text");
            input.setAttribute("name","addToBascket")
            input.setAttribute("value","Product" + " " + data[i].productName);
            input.setAttribute("readonly","readonly")

            var input2 =document.createElement("input");
            input2.setAttribute("type","submit");
            input2.setAttribute("value","add to cart");
            input2.setAttribute("readonly","readonly")

            var img = document.createElement("img");
            img.setAttribute("src","/images/"+data[i].imageName);
            
            div.appendChild(img)
            detailsContainer?.appendChild(div);
        
    }
}
*/ 
