

// fetch the server to get the api information
fetch('http://localhost:3000/api/products/').then((response) => response.json()).then((data) => productsData(data));


// create a function to get all the elements inside the api
function productsData(arrayObject) {
    const items = document.getElementById('items');
    const length = arrayObject.length;

    for (let i = 0; i < length; i++) {
        const productCard = createProductCard(arrayObject[i]);
        items.appendChild(productCard);
    }
}

// interaction of fetched objects inside the api in an array
function createProductCard(obj) {
    const productCard = document.createElement('a');
    const product = document.createElement('article');

    const name = document.createElement('h3');
    const description = document.createElement('p');
    const image = document.createElement('img');



    name.innerText = obj.name;
    description.innerText = obj.description;

    const link = './product.html?id=';
    productCard.setAttribute('href', `${link}${obj._id}`);
    image.setAttribute('src', obj.imageUrl);
    image.setAttribute('alt', obj.altTxt);

    name.classList.add('productName');
    description.classList.add('productDescription');

    product.appendChild(image);
    product.appendChild(name);
    product.appendChild(description);

    productCard.appendChild(product);

    return productCard
}

