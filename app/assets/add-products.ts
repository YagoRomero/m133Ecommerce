
const loadProducts = () =>{
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "./products/products.json", false);
    xhttp.send();

    const products = JSON.parse(xhttp.responseText);

    for(let productItem in products){
        const x = `
            <img src="${products.imageName}" class="card-img-top">
             <div class="card-body">
                <h5 class="card-title">${products.productName}</h5>
                <p class="card-text">${products.description}</p>
             </div>
        `
        document.getElementById('product-list').innerHTML = document.getElementById('product-list').innerHTML + x;
    }
}
loadProducts();