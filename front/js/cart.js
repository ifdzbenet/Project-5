
// fetch the server to get the api information
fetch('http://localhost:3000/api/products/').then((response) => response.json()).then((data) => productsData(data));

//fetch the local storage information
function productsData(arrayObject) {
    const length = arrayObject.length;
    const quantityArray = [0];
    const priceArray = [0];
    //const priceArray = [0];
    for (let i = 0; i < length; i++) {
        const productId = arrayObject[i]["_id"];
        const itemId = localStorage.getItem(productId + 'ID');
        const itemColor = localStorage.getItem(productId + 'OP');
        let itemQuantity = localStorage.getItem(productId + 'QU');

        
        // create the product cards from localStorage
        if (itemId !== null) {
            const item = document.getElementById('cart__items');
            const itemCard = document.createElement('article');

                const itemImgContainer = document.createElement('div');
                    const itemImg = document.createElement('img');

                const itemContent = document.createElement('div');

                    const itemContentDescription = document.createElement('div');
                        const itemContentDescriptionName = document.createElement('h2');
                        const itemContentDescriptionColor = document.createElement('p');
                        const itemContentDescriptionPrice = document.createElement('p');

                    const itemContentSettings = document.createElement('div');

                        const itemContentSettingsOption = document.createElement('div');
                            const itemContentQuantity = document.createElement('p');
                            const itemContentSetQuantity = document.createElement('input');
                        const itemDelete = document.createElement('div');
                            const deleteItemText = document.createElement('p');

            itemImg.setAttribute('src', arrayObject[i]['imageUrl']);
            itemImg.setAttribute('alt', arrayObject[i]['altTxt']);
           
            itemImgContainer.classList.add('cart__item__img');

            itemContentDescriptionName.innerText = arrayObject[i]["name"];
            itemContentDescriptionColor.innerText = itemColor;
            itemContentDescriptionPrice.innerText = '€' + arrayObject[i]["price"];
            itemContentDescription.classList.add("cart__item__content__description");

            itemContentQuantity.innerText = 'Qté : ' + itemQuantity;
            itemContentSettingsOption.classList.add("cart__item__content__settings__quantity");
            itemContentSetQuantity.setAttribute('class', 'itemQuantity');
            itemContentSetQuantity.setAttribute('type', 'number');
            itemContentSetQuantity.setAttribute('name', 'itemQuantity');
            itemContentSetQuantity.setAttribute('min', '1');
            itemContentSetQuantity.setAttribute('max', '100');
            itemContentSetQuantity.setAttribute('value', itemQuantity);
                itemContentSetQuantity.addEventListener('change', ($event) => {
                    localStorage.setItem(productId + 'QU', $event.target.value);
                    itemQuantity = $event.target.value;
                    itemContentQuantity.innerText = 'Qté : ' + $event.target.value;
                });
            // if else statement for 0 quantity

            deleteItemText.innerText = 'Delete';
            deleteItemText.classList.add('deleteItem');
            itemDelete.classList.add("cart__item__content__settings__delete")
                deleteItemText.addEventListener('click', () => {
                    item.removeChild(itemCard);
                    localStorage.removeItem(productId + 'ID');
                    localStorage.removeItem(productId + 'OP');
                    localStorage.removeItem(productId + 'QU');
                });

            itemContentSettings.classList.add('cart__item__content__settings')

            itemCard.classList.add('cart__item');
            itemCard.setAttribute('data-id', itemId);
            itemCard.setAttribute('data-color', itemColor);


            itemImgContainer.appendChild(itemImg);
            
            itemContentDescription.appendChild(itemContentDescriptionName);
            itemContentDescription.appendChild(itemContentDescriptionColor);
            itemContentDescription.appendChild(itemContentDescriptionPrice);

            itemContentSettingsOption.appendChild(itemContentQuantity);
            itemContentSettingsOption.appendChild(itemContentSetQuantity);

            itemDelete.appendChild(deleteItemText);

            itemContentSettings.appendChild(itemContentSettingsOption);
            itemContentSettings.appendChild(itemDelete);

            itemContent.appendChild(itemContentDescription);
            itemContent.appendChild(itemContentSettings);

            itemCard.appendChild(itemImgContainer);
            itemCard.appendChild(itemContent);

            item.appendChild(itemCard);

            //create the quantity and price arrays

            let itemQuantityN = parseInt(itemQuantity);
            quantityArray.push(itemQuantityN);

            let itemPriceN = arrayObject[i]["price"];
            priceArray.push(itemPriceN * itemQuantityN);
            
        } else {
            quantityArray.push(0);
            priceArray.push(0);
        }
        
    }
    // quantity of products and final price
    let totalQ = 0;
    for (i = 0; i < quantityArray.length; i++) {
        totalQ = totalQ + quantityArray[i];      
    };
    const totalQuantity = document.getElementById('totalQuantity');
    totalQuantity.innerText = totalQ;

    let totalP = 0;
    for (i = 0; i < priceArray.length; i++) {
        totalP = totalP + priceArray[i];      
    };
    const totalPrice = document.getElementById('totalPrice');
    totalPrice.innerText = totalP;

    
}



// set error messages for the form
const submitButton = document.getElementById('order');
const formInputs = document.querySelectorAll('input');
const formQuestionContainer = document.getElementsByClassName('cart__order__form__question');
let errorMsg = document.getElementsByClassName('errorMsg');

function errorMessages(questions, errors) {
    for (i = 0; i < questions.length; i++){
    const j = i;
        if (questions[i].validity.valueMissing){
            questions[i].setCustomValidity('Please, fill the required field');
            errors[j].innerText = 'Please, fill the required field';
            
        } else if (questions[i].willValidate) {
            if (errors[j] != null) {
                errors[j].innerText = '';
                questions[i].setCustomValidity('');
            }
        }
    };
    
};

// time of order confirmation

function getTimeOfConfirmation() {
    const today = new Date();
    let time = today.getFullYear() + '' + today.getMonth() + ''+ today.getDate() + '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds();
    localStorage.setItem('timeOfOrder', time)
}


submitButton.addEventListener('click',  () => {
    getTimeOfConfirmation();
    errorMessages(formInputs, errorMsg);
});
const form = document.querySelector('form');
form.action = './confirmation.html';

