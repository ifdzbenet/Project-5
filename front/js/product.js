

// get the URL id from current page to discern the product id
const baseUrl = (window.location).href;
const productId = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
window.onload = productsData;

// fetch the server to get the api information
fetch('http://localhost:3000/api/products/').then((response) => response.json()).then((data) => productsData(data));


// create a function to get all the elements inside the api
function productsData(arrayObject) {
  const length = arrayObject.length;
  const title = document.getElementById('title');
  const price = document.getElementById('price');
  const description = document.getElementById('description');
  const colors = document.getElementById('colors');
  const image = document.createElement('img');
  const imageContainer = document.createElement('div');
  const imageHolder = document.getElementsByClassName('item__img');
  

  for (let i = 0; i < length; i++) {
    if (productId == arrayObject[i]["_id"]) {

      title.innerText = arrayObject[i]["name"];
      price.innerText = arrayObject[i]["price"];
      description.innerText = arrayObject[i]["description"];

      image.setAttribute('src', arrayObject[i]['imageUrl']);
      image.setAttribute('alt', arrayObject[i]['altTxt']);
      imageContainer.appendChild(image);
      imageHolder[0].appendChild(imageContainer);
        
      const colorOptions = arrayObject[i]["colors"];   
      const colorOptionsLength = colorOptions.length;
      for (let j = 0; j < colorOptionsLength; j++) {
        const opt = document.createElement('option');
        opt.innerText = colorOptions[j];
        opt.value = colorOptions[j];
        colors.appendChild(opt);
      }
    }
  }
};

// add listener to options dropdown

let selectedOption = 'blank';
colors.addEventListener('change', ($event) => {
  selectedOption = $event.target.value;
});
    

// add listener to quantity selector

const quantity = document.getElementById('quantity');
let selectedQuantity = 0;
quantity.addEventListener('change', ($event) => {
  selectedQuantity = $event.target.value;
});


// add to cart button to send the information to the local storage

const addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', () => {
  request();
});  

// Save information for the cart
const saveId = productId;

function request() {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      if (selectedOption !== '' && selectedOption !== 'blank' && selectedQuantity > 0){
        if (localStorage.getItem(productId + 'ID') == null) {
          localStorage.setItem(productId + 'ID', saveId);
          localStorage.setItem(productId + 'OP', selectedOption);
          localStorage.setItem(productId + 'QU', selectedQuantity);
          alert('The product has been added to the cart')
        } else {
          alert('The product is already in the cart')
        }
        
      } else if (selectedOption == 'blank' && selectedQuantity == 0) {
        alert('Please choose a color option and a quantity');
    
      } else if (selectedOption == 'blank') {
        alert('Please choose a color option');
    
      } else if (selectedQuantity == 0) {
        alert('Please choose a quantity');
    
      }  else {
        alert('An error has ocurred. Try again later.');
    
      }
    }
  }
    xhttp.open("GET", 'http://localhost:3000/api/products/', true);
    xhttp.send();
};


  








