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
           
            //Creating Cards in HTML
            var divCol = document.createElement("div");
            divCol.setAttribute("class", "col-6");

            var divCard = document.createElement("div");
            divCard.setAttribute("class", "card");

            var img = document.createElement("img");
            img.setAttribute('src', '/images/' + data[i].imageName);
            img.setAttribute("class","card-img-top")

            var divCardBody = document.createElement("div");
            divCardBody.setAttribute("class","card-body")

            var cardButton = document.createElement("button");
            cardButton.setAttribute("type","button");
            cardButton.setAttribute("class","btn btn-primary");
            cardButton.setAttribute("data-toggle", "modal");
            cardButton.setAttribute("data-target",'');
            cardButton.innerText = "Details";
            
            var pCardBody = document.createElement("p");
            pCardBody.innerText = data[i].productName;
            
            divCardBody.appendChild(pCardBody);
            divCardBody.appendChild(cardButton);
            divCard.appendChild(img);
            divCard.appendChild(divCardBody);
            divCol.appendChild(divCard);
            productContainer?.appendChild(divCol);
        
            /*//creating Modals
            var divModal = document.createElement("div");
            divModal.setAttribute("class","modal-face");
            divModal.setAttribute("id","#modal"+ [i]);
            divModal.setAttribute("tabindex","-1");
            divModal.setAttribute("role","dialog");
            divModal.setAttribute("arialabelledby","modalLabel");
            divModal.setAttribute("aria-hidden","true");

            //Modal Dialog
            var divModalDialog = document.createElement("div");
            divModalDialog.setAttribute("class","modal-dialog");
            divModalDialog.setAttribute("role","document");

            //Modal Content
            var divModalContent = document.createElement("div");
            divModalContent.setAttribute("class","modal-content");

            //Modal Header
            var divModalHeader = document.createElement("div");
            divModalHeader.setAttribute("class","modal-header");

            var h5ModalTitle = document.createElement("h5");
            h5ModalTitle.setAttribute("class","modal-title");
            h5ModalTitle.setAttribute("id","modalLabel");
            h5ModalTitle.innerText = data[i].productName;

            var modalCloseButton = document.createElement("button");
            modalCloseButton.setAttribute("type","button");
            modalCloseButton.setAttribute("class","close");
            modalCloseButton.setAttribute("data-dismiss","modal");
            modalCloseButton.setAttribute("aria-label","Close");

            var modalCloseSpan = document.createElement("span");
            modalCloseSpan.setAttribute("aria-hidden","true");
            modalCloseSpan.innerText = "x";

            //Modal Body
            var divModalBody = document.createElement("div");
            divModalBody.setAttribute("class","modal-body");

            var pModalBody = document.createElement("p");
            pModalBody.innerText = data[i].productName;
            pModalBody.innerText = data[i].description;
            pModalBody.innerText =  "Spezielle Offerte" + data[i].specialOffer;
            pModalBody.innerText = "Normaler Preis" + data[i].normalPrice;

            //Modal Footer
            var divModalFooter = document.createElement("div");
            divModalFooter.setAttribute("class","modal-footer");

            var buttonFooterCancel = document.createElement("button");
            buttonFooterCancel.setAttribute("type","button");
            buttonFooterCancel.setAttribute("class","btn btn-secondary");
            buttonFooterCancel.setAttribute("data-dismiss","modal");
            buttonFooterCancel.innerText = "Cancel";

            var buttonFooterKaufen = document.createElement("button");
            buttonFooterKaufen.setAttribute("type","button");
            buttonFooterKaufen.setAttribute("class","btn btn-primary");
            buttonFooterKaufen.innerText = "Kaufen";

            divModalFooter.appendChild(buttonFooterKaufen);
            divModalFooter.appendChild(buttonFooterCancel);
            divModalContent.appendChild(divModalFooter);
            divModalBody.appendChild(img);
            divModalBody.appendChild(pModalBody);
            divModalContent.appendChild(divModalBody);
            modalCloseButton.appendChild(modalCloseSpan);
            divModalHeader.appendChild(modalCloseButton);
            divModalHeader.appendChild(h5ModalTitle);
            divModalContent.appendChild(divModalHeader);
            divModalDialog.appendChild(divModalContent);
            divModal.appendChild(divModalDialog);
            modals?.appendChild(divModal);
            */
        }
    }