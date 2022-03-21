
//fetch the POST request from the form in the cart section

const params = new URLSearchParams(location.search);
const firstName = params.get('firstName');
const lastName = params.get('lastName');
const address = params.get('address');
const city = params.get('city');
const email = params.get('email');
let userInfo = [];
userInfo.push(firstName, lastName, address, city, email);

let time = localStorage.getItem('timeOfOrder');

let orderNumber = '';
function createOrderNumber() {
    for(info in userInfo) {
    let firstLetter = userInfo[info].charAt(0);
    orderNumber += firstLetter;
    }
    orderNumber += time;
    console.log(orderNumber);
}
createOrderNumber();

document.getElementById('orderId').innerText = orderNumber;
//localStorage.clear();