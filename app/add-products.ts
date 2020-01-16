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
            div.setAttribute("class","row col-4")

            var form = document.createElement("form");
            form.setAttribute("action","/details");
            form.setAttribute("method","POST");

            var input = document.createElement("input");
            input.setAttribute("type","submit");
            input.setAttribute("value","Product" + " " + data[i].productName);

            var img = document.createElement("img");
            img.setAttribute("src","/images/"+data[i].imageName);
            
            form.appendChild(img)
            form.appendChild(input);
            div.appendChild(form)
            productContainer?.appendChild(div);
        
        }
    }