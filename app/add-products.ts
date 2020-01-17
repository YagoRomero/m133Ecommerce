fetch('./data/products.json')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        appendData(data);
    })
    .catch(function(error){
        console.log(error)
    });

    function appendData (data:any){
        var productContainer = document.getElementById("prouctContainer");
        
        for(var i = 0; i < data.length; i++){
           
            var div = document.createElement("div");
            div.setAttribute("class","col-4")

            var form = document.createElement("form");
            form.setAttribute("action","/details");
            form.setAttribute("method","POST");

            var input = document.createElement("input");
            input.setAttribute("type","submit");
            input.setAttribute("name","ProductDetails")
            input.setAttribute("value",data[i].productName);
            input.setAttribute("class","form-control")

            var input2 = document.createElement("input");
            input2.setAttribute("type","hidden");
            input2.setAttribute("name","ProductFoto")
            input2.setAttribute("value",data[i].imageName);

            var input3 = document.createElement("input");
            input3.setAttribute("type","hidden");
            input3.setAttribute("name","ProductDescription")
            input3.setAttribute("value",data[i].description);
            
            var input4 = document.createElement("input");
            input.setAttribute("class","form-control")
            input4.setAttribute("type","text");
            input4.setAttribute("name","ProductSpecialOffer")
            input4.setAttribute("value", data[i].specialOffer);
            input4.setAttribute("readonly","readonly");

            var input5 = document.createElement("input");
            input.setAttribute("class","form-control")
            input5.setAttribute("type","text");
            input5.setAttribute("name","ProductNormalPrice")
            input5.setAttribute("value", data[i].normalPrice);
            input5.setAttribute("readonly","readonly");
            
            var img = document.createElement("img");
            img.setAttribute("src","/images/"+data[i].imageName);

            var p  = document.createElement("p");
            p.innerHTML = "Special Pries" + " ";

            var p2 = document.createElement("p");
            p2.innerHTML = "Normal Preis" + " ";

            p2.appendChild(input5);
            p.appendChild(input4);
            input.appendChild(input3);
            input.appendChild(input2);
            form.appendChild(img)
            form.appendChild(input);
            form.appendChild(p);
            form.appendChild(p2);
            div.appendChild(form);
            productContainer?.appendChild(div);
        }
    }